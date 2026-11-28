"""本番の英語の事前登録ページ（/en/xtp3/）の E2E。窓なしの Chromium で開いて、登録 → 3 問 → Google フォームに 2 行入ったかまで確かめる。

コマンド（Playwright は page-kit の環境を借りる。`playwright install` はしない）:
    cd <page-kit> && uv run python <このファイルの絶対パス> [--base URL] [--shots <フォルダ>] [--no-form-check]

- 開く URL には必ず ?utm_source=e2e-test を付ける（フォームの回答は API で消せないので、テストの行と分かるように）
- GA4 は localStorage の mkt_notrack=1 で止めてから開く（テストを数に入れない）
- まちがったメール → 注意が出る／e2e-test-<時刻>@example.com で登録 → 3 問 → 完了の文
- ページが formResponse へ送った中身（2 回）を読み取り、そのあと gws でフォームの回答を読み、そのメールの行だけを出す
- --shots: 1440 幅と 390 幅で、一番上の画面と全体のスクショ（登録の前の状態）
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import parse_qs

from playwright.sync_api import sync_playwright

FORM_ID = "1LANlLCNQA1jMwdKTglWEBloqtI5lKg8ltunpl-oouQE"
ENTRIES = {"email": 121770746, "role": 674868252, "feature": 932237835, "os": 1396165593, "source": 889837204}
QID = {format(v, "08x"): k for k, v in ENTRIES.items()}  # Forms API の questionId は entry の番号の 16 進
ANSWERS = {"role": "Affiliate marketer", "feature": "Viral follow-up", "os": "Windows"}
TAG = "e2e-test"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, ok, detail))
    print(("PASS " if ok else "FAIL ") + name + (f" — {detail}" if detail else ""))


def shots(browser, url: str, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    for label, w, h, mobile in (("1440", 1440, 900, False), ("390", 390, 844, True)):
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2 if mobile else 1,
                                  is_mobile=mobile, has_touch=mobile, reduced_motion="reduce")
        ctx.add_init_script("try{localStorage.setItem('mkt_notrack','1')}catch(e){}")
        pg = ctx.new_page()
        pg.goto(url, wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(500)
        pg.screenshot(path=str(out / f"{label}_top.png"))
        # 遅延読み込みの画像を読ませてから全体を撮る
        pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager')")
        pg.wait_for_load_state("networkidle")
        pg.wait_for_timeout(500)
        pg.screenshot(path=str(out / f"{label}_full.png"), full_page=True)
        hs = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check(f"{label} 幅で横スクロールなし", hs <= 0, f"はみ出し {hs}px")
        ctx.close()


def read_form_rows(email: str) -> list[dict]:
    gws = shutil.which("gws") or shutil.which("gws.cmd")
    if not gws:
        raise RuntimeError("gws が見つからない")
    params = json.dumps({"formId": FORM_ID})
    cmd = ["powershell", "-NoProfile", "-Command", f"gws forms forms responses list --params '{params}'"] \
        if gws.lower().endswith(".ps1") else [gws, "forms", "forms", "responses", "list", "--params", params]
    raw = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8").stdout
    data = json.loads(raw[raw.index("{"):])
    rows = []
    for r in data.get("responses", []):
        vals = {QID.get(q, q): (a.get("textAnswers", {}).get("answers") or [{}])[0].get("value", "")
                for q, a in r.get("answers", {}).items()}
        if vals.get("email") == email:  # そのメールの行だけ（ほかの人の回答は出さない）
            rows.append({"createTime": r.get("createTime"), **vals})
    return sorted(rows, key=lambda x: x.get("createTime") or "")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="https://market.youpapatools.com/en/xtp3/")
    ap.add_argument("--shots", type=Path)
    ap.add_argument("--no-form-check", action="store_true")
    a = ap.parse_args()
    url = a.base + ("&" if "?" in a.base else "?") + f"utm_source={TAG}"
    email = f"{TAG}-{datetime.now().strftime('%Y%m%d%H%M%S')}@example.com"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        if a.shots:
            shots(browser, url, a.shots)

        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        ctx.add_init_script("try{localStorage.setItem('mkt_notrack','1')}catch(e){}")
        pg = ctx.new_page()
        sent: list[dict] = []
        pg.on("request", lambda r: sent.append({k: v[0] for k, v in parse_qs(r.post_data or "").items()})
              if "formResponse" in r.url and r.method == "POST" else None)
        resp = pg.goto(url, wait_until="networkidle")
        check("ページが 200", resp is not None and resp.status == 200, str(resp.status if resp else None))
        check("noindex が付いている", pg.locator('meta[name="robots"][content="noindex"]').count() == 1)

        form = pg.locator("form[data-join]").first
        form.locator('input[type="email"]').fill("not-an-email")
        form.locator('button[type="submit"]').click()
        err = form.locator(".err").inner_text()
        check("まちがったメールで注意が出る", err == "Enter a valid email address.", err)
        check("まちがったメールでは送らない", len(sent) == 0, f"{len(sent)} 回")

        form.locator('input[type="email"]').fill(email)
        form.locator('button[type="submit"]').click()
        box = pg.locator("[data-thanks]").first
        box.wait_for(state="visible")
        check("登録後に 3 問の画面が出る", box.locator("h3").inner_text() == "You’re on the list.")
        for q, v in ANSWERS.items():
            box.locator(f'fieldset[data-q="{q}"] button', has_text=v).click()
        done = box.locator(".done").inner_text()
        check("3 問のあとに完了の文", done == "Thanks. That’s everything.", done)
        pg.wait_for_timeout(2000)
        ctx.close()
        browser.close()

    print("ページが送った中身:")
    for s in sent:
        print("  ", {k: v for k, v in s.items()})
    em, src = f"entry.{ENTRIES['email']}", f"entry.{ENTRIES['source']}"
    check("formResponse へ 2 回送った", len(sent) == 2, f"{len(sent)} 回")
    if len(sent) == 2:
        check("1 回目＝メールと s1", sent[0].get(em) == email and sent[0].get(src) == f"s1;{TAG}")
        check("2 回目＝メール・3 問・s2", sent[1].get(em) == email and sent[1].get(src) == f"s2;{TAG}"
              and all(sent[1].get(f"entry.{ENTRIES[q]}") == v for q, v in ANSWERS.items()))

    if not a.no_form_check:
        rows = []
        for _ in range(6):  # 回答の反映を少し待つ
            rows = read_form_rows(email)
            if len(rows) >= 2:
                break
            time.sleep(5)
        print("フォームの回答（このメールの行だけ）:")
        for r in rows:
            print("  ", json.dumps(r, ensure_ascii=False))
        check("フォームにこのメールの行が 2 つ", len(rows) == 2, f"{len(rows)} 行")
        if len(rows) == 2:
            r1, r2 = rows
            check("1 行目 Source=s1;e2e-test・3 問は空", r1.get("source") == f"s1;{TAG}" and not any(r1.get(q) for q in ANSWERS))
            check("2 行目 Source=s2;e2e-test・3 問の答え", r2.get("source") == f"s2;{TAG}"
                  and all(r2.get(q) == v for q, v in ANSWERS.items()))

    bad = [n for n, ok, _ in results if not ok]
    print(f"\n{len(results) - len(bad)}/{len(results)} PASS")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())

# Version History
# - ver1.0 (2026-11-29): 新規。本番 /en/xtp3/ の登録 → 3 問 → フォームの回答 2 行（s1／s2）までと、1440・390 幅のスクショ
