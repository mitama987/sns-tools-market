#!/usr/bin/env python3
"""assets/js/ref.js（ver1.1）の E2E: 流入元を覚えて購入ボタン（/api/buy/）に付けるか。

手元のファイルをローカルサーバーで配り、Playwright（Chromium）で実際に開いて確かめる。
外には何も送らない（GA4・/api/buy への通信は止めて、URL だけ見る）。

使い方（Playwright が入っている Python で）:
    C:/Users/mitam/Desktop/work/20_XTP3/.venv/Scripts/python.exe .docs/tests/e2e_ref_attribution.py
    … --base https://market.youpapatools.com   # 本番のページで同じ確認（/api/buy と GA4 は止める）

確かめること:
  1. utm 付きで比較ページに着地 → XTP3 の LP の購入ボタン 10 個すべてに a_src・a_lp・a_first が付く
  2. 検索（google）から来た → google/organic／メール（mail.google.com）は検索扱いにしない
  3. 直接開いた → direct
  4. 再訪問: direct では上書きしない・別サイトから来たら流入元だけ上書き（最初のページ・初回訪問日はそのまま）
  5. 紹介コード（?ref=）も今までどおり付く
  6. React で後から描くボタン（XTP4 の LP）にも、押す直前に付く
  7. 押したとき実際に飛ぶ URL に付いている＋GA4 の begin_checkout が積まれる
  8. XTP3 の LP に GA4 のタグが入っている
"""
import argparse
import datetime
import functools
import http.server
import socket
import sys
import threading
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
BUY_SEL = 'a[href*="/api/buy/"]'
results = []


def check(name, ok, detail=""):
    results.append(ok)
    print(("PASS " if ok else "FAIL ") + name + (("  → " + str(detail)) if detail else ""))


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args, **kwargs):
        pass


def serve():
    port = free_port()
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{port}"


def new_context(browser, buy_urls):
    """まっさらなブラウザ（localStorage 空）。GA4 と /api/buy は外へ出さない。"""
    ctx = browser.new_context()
    ctx.route("**/*googletagmanager.com/**", lambda r: r.abort())
    ctx.route("**/*google-analytics.com/**", lambda r: r.abort())
    ctx.route("**/*clarity.ms/**", lambda r: r.abort())

    def on_buy(route):
        buy_urls.append(route.request.url)
        route.fulfill(status=200, content_type="text/plain", body="e2e: stopped before Stripe")

    ctx.route("**/api/buy/**", on_buy)
    return ctx


def q(href):
    return {k: v[0] for k, v in parse_qs(urlparse(href).query).items()}


def hrefs(page):
    page.wait_for_selector(BUY_SEL, state="attached", timeout=30000)
    return page.eval_on_selector_all(BUY_SEL, "els => els.map(a => a.href)")


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")  # Windows のコンソール（cp932）で日本語が化けないように
    except Exception:
        pass
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="", help="本番など別の場所で確かめるときの URL（省略＝手元のファイル）")
    args = ap.parse_args()
    httpd = None
    base = args.base.rstrip("/")
    if not base:
        httpd, base = serve()
    today = datetime.date.today().isoformat()
    print(f"base = {base} / today = {today}")

    with sync_playwright() as p:
        browser = p.chromium.launch()

        # 1. utm 付きで比較ページ → XTP3 の LP
        buys = []
        ctx = new_context(browser, buys)
        page = ctx.new_page()
        page.goto(f"{base}/xtp-compare/?utm_source=e2e&utm_medium=test")
        page.goto(f"{base}/xtp3/")
        hs = hrefs(page)
        qs = [q(h) for h in hs]
        check("1. XTP3 の LP の購入ボタンは 10 個", len(hs) == 10, len(hs))
        check("1. 全部に a_src=e2e/test", all(x.get("a_src") == "e2e/test" for x in qs), qs[0])
        check("1. 全部に a_lp=/xtp-compare/", all(x.get("a_lp") == "/xtp-compare/" for x in qs))
        check("1. 全部に a_first=今日", all(x.get("a_first") == today for x in qs), qs[0].get("a_first"))
        check("1. 紹介コードが無ければ ref は付かない", all("ref" not in x for x in qs))
        # 8. GA4 タグ
        has_tag = page.evaluate("() => !!document.querySelector('script[src*=\"googletagmanager.com/gtag/js?id=G-ZKGY7RFRGX\"]') && typeof window.gtag === 'function'")
        check("8. XTP3 の LP に GA4 タグ（G-ZKGY7RFRGX）", has_tag)
        # 7. 実際に押す（target=_blank なので新しいタブが開く）
        with ctx.expect_page() as popup:
            page.click('a[href*="/api/buy/xtp3_full"] >> nth=0')
        popup.value.wait_for_load_state()
        sent = q(buys[-1]) if buys else {}
        check("7. 押して飛ぶ先は /api/buy/xtp3_full", bool(buys) and "/api/buy/xtp3_full" in buys[-1], buys[-1] if buys else "(通信なし)")
        check("7. 飛ぶ URL に a_src・a_lp・a_first", sent.get("a_src") == "e2e/test" and sent.get("a_lp") == "/xtp-compare/" and sent.get("a_first") == today, sent)
        ev = page.evaluate("() => (window.dataLayer || []).map(a => Array.from(a)).filter(a => a[0] === 'event' && a[1] === 'begin_checkout').map(a => a[2])")
        check("7. GA4 に begin_checkout（sku=xtp3_full）", len(ev) == 1 and ev[0].get("sku") == "xtp3_full" and ev[0].get("items") == [{"item_id": "xtp3_full"}], ev)
        ctx.close()

        # 2. 検索から／メールから
        ctx = new_context(browser, [])
        page = ctx.new_page()
        page.goto(f"{base}/xtp3/", referer="https://www.google.com/")
        x = q(hrefs(page)[0])
        check("2. google から → google/organic・最初のページ /xtp3/", x.get("a_src") == "google/organic" and x.get("a_lp") == "/xtp3/", x)
        ctx.close()
        ctx = new_context(browser, [])
        page = ctx.new_page()
        page.goto(f"{base}/xtp3/", referer="https://search.yahoo.co.jp/search?p=x")
        check("2. search.yahoo.co.jp → yahoo/organic", q(hrefs(page)[0]).get("a_src") == "yahoo/organic", q(hrefs(page)[0]).get("a_src"))
        ctx.close()
        ctx = new_context(browser, [])
        page = ctx.new_page()
        page.goto(f"{base}/xtp3/", referer="https://mail.google.com/")
        check("2. mail.google.com → mail.google.com/referral（検索にしない）", q(hrefs(page)[0]).get("a_src") == "mail.google.com/referral", q(hrefs(page)[0]).get("a_src"))
        ctx.close()

        # 3〜5. 直接 → 再訪問（direct では上書きしない）→ 別サイトから（流入元だけ上書き）＋紹介コード
        ctx = new_context(browser, [])
        page = ctx.new_page()
        page.goto(f"{base}/fb-like/")
        x = q(hrefs(page)[0])
        check("3. 直接開いた → direct・最初のページ /fb-like/", x.get("a_src") == "direct" and x.get("a_lp") == "/fb-like/", x)
        page.goto(f"{base}/xtp3/", referer="https://note.com/youpapa/n/abc")
        x = q(hrefs(page)[0])
        check("4. 再訪問で note から → 流入元だけ note.com/referral", x.get("a_src") == "note.com/referral" and x.get("a_lp") == "/fb-like/" and x.get("a_first") == today, x)
        page.goto(f"{base}/yay/")
        x = q(hrefs(page)[0])
        check("4. その後 direct で開いても note.com/referral のまま", x.get("a_src") == "note.com/referral", x)
        page.goto(f"{base}/xtp3/", referer="https://checkout.stripe.com/c/pay/cs_x")
        check("4. Stripe から戻っても流入元は変えない", q(hrefs(page)[0]).get("a_src") == "note.com/referral", q(hrefs(page)[0]).get("a_src"))
        page.goto(f"{base}/bluesky/?ref=tanaka-01")
        x = q(hrefs(page)[0])
        check("5. ?ref=tanaka-01 → ref も付く", x.get("ref") == "tanaka-01" and x.get("a_src") == "note.com/referral", x)
        page.goto(f"{base}/xtp3/")
        check("5. 紹介コードは別ページでも残る", q(hrefs(page)[0]).get("ref") == "tanaka-01")
        ctx.close()

        # 5'. 変な値は消毒される
        ctx = new_context(browser, [])
        page = ctx.new_page()
        page.goto(f"{base}/xtp3/?utm_source=%3Cscript%3E%E6%97%A5%E6%9C%AC&utm_medium=a%20b%26c")
        x = q(hrefs(page)[0])
        check("5'. utm の記号・日本語は落とす", x.get("a_src") == "script/abc", x.get("a_src"))
        ctx.close()

        # 6. React で後から描くボタン（XTP4 の LP）: 押す直前に付く
        buys = []
        ctx = new_context(browser, buys)
        page = ctx.new_page()
        page.goto(f"{base}/xtp4/?utm_source=youtube&utm_medium=description")
        page.wait_for_selector(BUY_SEL, state="attached", timeout=60000)
        before = page.eval_on_selector(BUY_SEL, "a => a.href")
        page.eval_on_selector(BUY_SEL, "a => a.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))")
        after = q(page.eval_on_selector(BUY_SEL, "a => a.href"))
        check("6. XTP4（React）のボタン: 押す直前に a_src=youtube/description", after.get("a_src") == "youtube/description" and after.get("a_lp") == "/xtp4/", {"before": before, "after": after})
        ctx.close()

        browser.close()
    if httpd:
        httpd.shutdown()
    print(f"\n{sum(results)}/{len(results)} passed")
    return 0 if all(results) else 1


if __name__ == "__main__":
    sys.exit(main())

# Version History
# ver1.0 - 2026-11-14 - 新規。ref.js ver1.1（流入元を購入ボタンに付ける）の E2E。手元のファイルでも本番（--base）でも同じ確認ができる。
