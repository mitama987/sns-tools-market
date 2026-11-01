"""単機能ツールの簡易 LP（5 枚）を同じ型で書き出す。

実行（81_Market 直下）: uv run python scripts/build_tool_lps.py
出力: fb-like/ ameblo-like/ note-bot/ yay/ bluesky/ の index.html
中身の出典: 32_stripe-webhook/functions/billing/products/*.js（説明・手順・注意＝購入メールと同じ文）。
文言を直したら products/*.js の購入メールもそろえること。
"""
from __future__ import annotations

from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://market.youpapatools.com"
BUY = "https://stripe-webhook-r260221-01.web.app/api/buy/"
TOKUSHOHO = "https://xtools-docs-auth.web.app/tokushoho.html"
CONTACT = "https://forms.gle/sDG46hdxTo9E4p4CA"
GA = "G-ZKGY7RFRGX"

PAY = "クレジットカード（分割可）・Apple Pay・Google Pay・銀行振込・PayPay（決済は Stripe）"

COMMON_FAQ = [
    ("月額はかかりますか？", "かかりません。¥3,000（税込）を 1 回お支払いいただく買い切りです。"),
    ("アカウントが止まることはありませんか？",
     "件数や間隔は安全寄りの既定値にしていますが、各サービスによる制限・停止が起きないことは保証できません。少ない件数から、ご自身の判断の範囲でお使いください。"),
    ("使い方が分からないときは？", "購入後のメールにある手順書をご覧ください。解決しないときはお問い合わせフォームから。開発者本人が返信します。"),
]

TOOLS = [
    {
        "slug": "fb-like", "sku": "fb_like_base", "thumb": "fb",
        "name": "FacebookToolsPro", "sns": "Facebook",
        "title": "Facebook の交流づくりを、毎日ちょっとずつ時短。",
        "lead": "タイムラインやページの投稿へのいいねを、決めた間隔で自動にする Windows 用ソフトです。",
        "features": [
            ("投稿へのいいねを自動に", "タイムラインやページの投稿に、決めた間隔でいいね。交流のきっかけづくりを手放せます。"),
            ("複数アカウントを管理", "アカウントを登録して切り替えながら使えます。"),
            ("動いている様子が見える", "実行状況が画面に出るので、止まっていないかすぐ分かります。"),
        ],
        "steps": [
            "購入後のメールにあるフォルダから FacebookToolsPro の exe をダウンロードしてデスクトップに保存",
            "exe をダブルクリックして起動（Windows の警告が出たら「詳細情報」→「実行」）",
            "最初の画面で、ご登録のメールアドレスを入力してログイン",
            "手順書の「アカウント管理」で Facebook アカウントを追加し、「自動いいね」で間隔と回数を決めて開始",
        ],
        "manuals": [("手順書（PDF）", "https://drive.google.com/file/d/1uEA-KUd2L8ln2ywqGuNX4jiiYByZd4fV/view"),
                    ("手順動画", "https://drive.google.com/file/d/17-3wIQqRp2gruGvYZVk8AOg3ISHN5wOs/view")],
        "env": "Windows 10／11（64bit）の PC と Google Chrome",
        "notes": [
            "いいねの間隔は短くしすぎないでください（既定値のままのご利用をおすすめします）",
            "Facebook の仕様変更で動かなくなることがあります。その場合は Slack でお知らせし、順次アップデートします",
            "アカウントの制限・停止が起きないことは保証できません。ご自身の判断の範囲でご利用ください",
        ],
    },
    {
        "slug": "ameblo-like", "sku": "ameblo_like_base", "thumb": "ameblo",
        "name": "AmebloToolsPro", "sns": "アメブロ",
        "title": "アメブロの読者さんとの交流を、キーワードから時短。",
        "lead": "キーワードで見つけた記事に、件数と間隔を決めていいねする Windows 用ソフトです。",
        "features": [
            ("キーワードで記事を見つける", "登録したキーワードの検索結果から、記事を順番に開いていいねします。"),
            ("件数と間隔を自分で決める", "既定は 1 日 300 件・5〜15 秒の間隔。同じ記事への重複は防ぎます。"),
            ("予約実行もできる", "「今すぐ実行」のほか、時間を決めた定期実行も登録できます。"),
        ],
        "steps": [
            "購入後のメールにあるフォルダから AmebloToolsPro の exe をダウンロードしてデスクトップに保存",
            "exe をダブルクリックして起動（Windows の警告が出たら「詳細情報」→「実行」）。ブラウザで管理画面が開きます",
            "ご登録のメールアドレスでログイン（ライセンスは PC 1 台です）",
            "設定画面で Ameba にログイン（開いた画面の reCAPTCHA はご自身で解いてください）",
            "キーワードと 1 日の件数を決めて「今すぐ実行」。予約実行も設定できます",
        ],
        "manuals": [],
        "env": "Windows 10／11（64bit）の PC（ライセンスは PC 1 台）",
        "notes": [
            "アメーバの利用規約に触れる可能性がある操作です。ご利用は自己責任でお願いします",
            "1 日の件数と間隔は安全寄りの既定値（1 日 300 件・5〜15 秒間隔）から始めてください",
            "アカウントの制限・停止が起きないことは保証できません",
        ],
    },
    {
        "slug": "note-bot", "sku": "note_like_base", "thumb": "note",
        "name": "noteToolsPro", "sns": "note",
        "title": "note の「スキ」での交流を、時短する。",
        "lead": "キーワードやタグで見つけた note の記事に、決めた数だけスキを付ける Windows 用ソフトです。",
        "features": [
            ("キーワード・タグで探す", "検索ワードを 5 つまで登録。毎回その中からランダムに選んで記事を探します。"),
            ("1 回のスキの数を決める", "既定 10 件・上限 50 件。少ない数から始められます。"),
            ("エクセルに書くだけの設定", "note ID・パスワード・検索ワードをエクセルに入れて、exe を開くだけ。"),
        ],
        "steps": [
            "購入後のメールにあるフォルダの中身（exe・note_info_ver1.2.xlsx・手順書 2 つ）を、PC の同じフォルダにダウンロード",
            "note_info_ver1.2.xlsx の「info」シートに note ID とパスワード、「like」シートにスキの数と検索ワードを入れて保存",
            "note_auto_like_ver6.0.exe をダブルクリック（Windows の警告が出たら「詳細情報」→「実行」）。Chrome が開いて自動でスキを付けます",
            "くわしくは手順書「【最初にお読みください】初期設定（Like）」と「note_auto_like 手順書」をご覧ください",
        ],
        "manuals": [("初期設定の手順書", "https://drive.google.com/file/d/10rBnUTUlZuWdBVFlkVP-SNjTtghgmI4s/view")],
        "env": "Windows 10／11（64bit）の PC と Google Chrome",
        "notes": [
            "note の利用規約に触れる可能性がある操作です。ご利用は自己責任でお願いします",
            "1 回のスキの数は少なめ（既定 10 件・上限 50 件）から始めてください",
            "アカウントの制限・停止が起きないことは保証できません",
        ],
    },
    {
        "slug": "yay", "sku": "yay_tools_base", "thumb": "yay",
        "name": "YayToolsPro", "sns": "Yay!",
        "title": "Yay! のフォローを、リストからまとめて。",
        "lead": "リストにしたユーザーや、そのフォロワーをまとめてフォローする Chrome 拡張機能 2 本セットです。",
        "features": [
            ("リストのユーザーをフォロー", "エクセルにユーザーページの URL を並べて読み込むだけ。"),
            ("フォロワーもまとめてフォロー", "指定したユーザーのフォロワーを順番にフォロー。1 回ごとに 1〜3 秒待ちます。"),
            ("休みを入れながら動く", "「フォロワーをフォロー」は 60 件ごとに 1 時間休みます。"),
        ],
        "steps": [
            "購入後のメールにあるフォルダから zip 2 つと url_リスト.xlsx をダウンロードし、zip はそれぞれ展開（右クリック →「すべて展開」）",
            "Chrome で chrome://extensions を開き、右上の「デベロッパーモード」をオン →「パッケージ化されていない拡張機能を読み込む」で展開したフォルダを選ぶ（2 本とも）",
            "url_リスト.xlsx の A2 から下に、フォローしたいユーザーページの URL を 1 行に 1 つ入れて保存",
            "Yay! にログインした Chrome で拡張のアイコンを押し、url_リスト.xlsx を選んで「Upload」→「Start」",
        ],
        "manuals": [],
        "env": "PC の Google Chrome（Windows・Mac）",
        "notes": [
            "Yay! の利用規約に触れる可能性がある操作です。ご利用は自己責任でお願いします",
            "フォローは 1 日 60 件程度までをおすすめします（「フォロワーをフォロー」は 60 件ごとに 1 時間休みます）",
            "アカウントの制限・停止が起きないことは保証できません",
        ],
    },
    {
        "slug": "bluesky", "sku": "bsky_tools_base", "thumb": "bsky",
        "name": "BskyToolsPro2", "sns": "Bluesky",
        "title": "Bluesky の投稿を、スプレッドシートにおまかせ。",
        "lead": "Google スプレッドシートに書いた投稿を、決めた間隔で Bluesky へ自動投稿します。PC の電源は不要です。",
        "features": [
            ("書くだけで投稿予約", "「定期投稿」シートに投稿文を並べるだけ。"),
            ("1〜12 時間おきに自動投稿", "間隔は 1・2・4・6・8・12 時間から選べます。"),
            ("まんべんなく投稿", "投稿回数がいちばん少ない文から順に出すので、同じ文ばかりになりません。"),
        ],
        "steps": [
            "購入後のメールのリンクを開いて「コピーを作成」（ご自身の Google ドライブに保存されます。元のシートは使わないでください）",
            "Bluesky の 設定 → プライバシーとセキュリティ → アプリパスワード で App password を発行して控える",
            "コピーしたシートの「初期設定」に Bluesky のユーザー ID と App password、「定期投稿」の A 列に投稿文を入れる",
            "「定期設定」で間隔（1・2・4・6・8・12 時間）を選び、上のメニュー「⚡Bluesky投稿」→「定期実行を開始」",
        ],
        "manuals": [("手順書（スライド）", "https://docs.google.com/presentation/d/1SVkMktunBUGVcNsJ1Qis39NbsqTWByDLNeAXA8Z9d2E/view")],
        "env": "Google アカウント（Google スプレッドシートで動きます・PC やスマホの起動は不要）",
        "notes": [
            "App password は他の人に見せないでください",
            "Bluesky の仕様変更で動かなくなることがあります。その場合は順次アップデートします",
            "アカウントの制限・停止が起きないことは保証できません。ご自身の判断の範囲でご利用ください",
        ],
    },
]


def e(s: str) -> str:
    return escape(s, quote=True)


def page(t: dict) -> str:
    url = f"{SITE}/{t['slug']}/"
    buy = BUY + t["sku"]
    desc = f"{t['name']}（{t['sns']}）— {t['lead']} ¥3,000（税込）の買い切り。"
    title = f"{t['name']}｜{t['sns']}の運用ツール（¥3,000 買い切り）｜Youパパツールマーケット"
    feats = "\n".join(f'        <li><b>{e(a)}</b><span>{e(b)}</span></li>' for a, b in t["features"])
    steps = "\n".join(f"        <li>{e(s)}</li>" for s in t["steps"])
    manuals = ""
    if t["manuals"]:
        manuals = '\n      <div class="links">' + "".join(
            f'<a href="{e(u)}" target="_blank" rel="noopener">{e(l)} ›</a>' for l, u in t["manuals"]) + "</div>"
    notes = "\n".join(f"          <li>{e(n)}</li>" for n in t["notes"])
    faqs = [(f"どのパソコンで使えますか？", f"{t['env']}で動きます。")] + COMMON_FAQ
    faq_html = "\n".join(
        f'      <details class="faq"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in faqs)
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:site_name" content="Youパパツールマーケット">
<meta property="og:title" content="{e(t['name'])}｜{e(t['title'])}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:type" content="product">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/thumbs/{t['thumb']}.webp">
<meta name="twitter:card" content="summary">
<link rel="icon" href="../favicon.ico" sizes="any">
<link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
<script async src="https://www.googletagmanager.com/gtag/js?id={GA}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','{GA}');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/lp.css?v=20261031">
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"SoftwareApplication","name":"{e(t['name'])}","url":"{url}","applicationCategory":"BusinessApplication","description":"{e(desc)}","offers":{{"@type":"Offer","price":"3000","priceCurrency":"JPY"}},"publisher":{{"@type":"Person","name":"Youパパ"}}}}
</script>
</head>
<body id="top">
<header class="top"><div class="wrap">
  <a class="brand" href="../">Youパパツールマーケット</a>
  <a class="back" href="../#tools">← ツール一覧</a>
</div></header>

<div class="hero"><div class="wrap">
  <div>
    <div class="kicker">{e(t["sns"])}の運用ツール</div>
    <h1>{e(t['title'])}</h1>
    <p>{e(t['lead'])}</p>
    <div class="price-line"><span class="yen">¥3,000</span><span class="note">税込・買い切り（月額なし）</span></div>
    <div class="btns">
      <a class="btn" href="{buy}">購入する</a>
      <a class="btn sub" href="#howto">使い方を見る</a>
    </div>
    <div class="safe">作った本人が販売・サポート ／ {e(PAY)}</div>
  </div>
  <img class="thumb" src="../thumbs/{t['thumb']}.webp" alt="{e(t['name'])}" width="640" height="640">
</div></div>

<main>
  <section class="block"><div class="wrap">
    <div class="card">
      <h2><span class="num">01</span>できること</h2>
      <ul class="features">
{feats}
      </ul>
    </div>
  </div></section>

  <section class="block" id="howto"><div class="wrap">
    <div class="card">
      <h2><span class="num">02</span>使い方</h2>
      <ol class="steps">
{steps}
      </ol>{manuals}
      <p class="small">動作環境: {e(t['env'])}</p>
    </div>
  </div></section>

  <section class="block" id="price"><div class="wrap">
    <div class="card">
      <h2><span class="num">03</span>料金</h2>
      <div class="pricebox">
        <div class="pricetag"><div class="label">買い切り</div><div class="yen">¥3,000</div><div class="sub">税込・月額なし</div></div>
        <div>
          <ol class="steps">
            <li>「購入する」から決済（{e(PAY)}）</li>
            <li>ダウンロードと手順書の案内がメールで届きます（銀行振込は入金確認後）</li>
            <li>困ったらお問い合わせフォームへ。開発者本人が返信します</li>
          </ol>
        </div>
      </div>
    </div>
  </div></section>

  <section class="block"><div class="wrap">
    <div class="notes">
      <h2><span class="num">04</span>ご利用上の注意</h2>
      <ul>
{notes}
      </ul>
    </div>
  </div></section>

  <section class="block"><div class="wrap">
    <div class="card">
      <h2><span class="num">05</span>よくある質問</h2>
{faq_html}
    </div>
  </div></section>

  <section class="block"><div class="wrap">
    <div class="card final">
      <div class="small">{e(t['name'])}（{e(t['sns'])}）</div>
      <div class="yen">¥3,000 <span class="small">税込・買い切り</span></div>
      <p><a class="btn" href="{buy}">購入する</a></p>
      <p class="small"><a href="../#tools">ほかのツールも見る ›</a></p>
    </div>
  </div></section>
</main>

<div data-mk-footer></div>
<script src="../assets/js/market-footer.js?v=20261101b"></script>
<script src="../assets/js/ref.js?v=20261031"></script>
</body>
</html>
<!--
Version History
- ver1.1 (2026-11-01): フッターをマーケット共通フッター（assets/js/market-footer.js）に
- ver1.0 (2026-10-31): 新規。scripts/build_tool_lps.py で生成（{t['sku']}・¥3,000 買い切り・購入は /api/buy）
-->
"""


def main() -> None:
    for t in TOOLS:
        out = ROOT / t["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(t), encoding="utf-8", newline="\n")
        print(out.relative_to(ROOT))


if __name__ == "__main__":
    main()

# Version History
# ver1.0 (2026-10-31): 新規。FB・アメブロ・note・Yay!・Bluesky の簡易 LP を同じ型で生成
# ver1.1 (2026-11-01): フッターをマーケット共通フッター（market-footer.js）に
