"""ダーク版モック（mock-dark/）を本番トップから生成する。

本番の index.html と components-amazon.jsx は読むだけ（書き換えない）。
骨格・中身・リンクはそのまま、配色と見出しの書体を置き換え、棚のカード（ShelfCard）だけ
モック専用の部品 scripts/mock_dark/shelf_card.jsx に差し替える。

配色（ver1.1〜）: 紺〜黒の地＋淡い光（参考: chatgpt.site のモック）。金はバッジ・英字の小見出し・
ロゴ・比較表の推奨ボタンだけに残す。カードのボタン 2 つとリンク先は本番と同じ（ゆうさん 11/01）。

使い方: uv run python scripts/build_mock_dark.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "mock-dark"
CARD_SRC = Path(__file__).resolve().parent / "mock_dark" / "shelf_card.jsx"

# ── 配色トークン（紺〜黒 × 淡い光。金は差し色だけ） ──
NAVY_0 = "#070A12"  # いちばん暗い所（モックの帯・フッター下段）
NAVY_1 = "#0B0F1A"  # ページの地・ナビ・棚板
NAVY_2 = "#0F1626"  # パネル・カード
NAVY_3 = "#161F33"  # 入力欄・一覧のマス・ホバー
LINE = "#1F2A44"    # 罫線
TEXT = "#E6EAF2"
SUB1, SUB2, SUB3, SUB4 = "#C7CFDD", "#A9B3C6", "#8E99AF", "#7B869C"
LINK = "#7DD3FC"
LINK_HOVER = "#BAE6FD"
GOLD = "#C9A96E"
GOLD_HOVER = "#B8955A"
GOLD_SOFT = "#E3C68A"
INK = NAVY_1  # 金地・白地の上の文字

# 1) 文脈つきの置換（全体置換より先に当てる）
SPECIFIC: list[tuple[str, str]] = [
    # 検索欄: 白地の入力 → 暗い入力＋白の細枠、検索ボタンは白地
    ('className="flex h-10 rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#C2533C]"',
     f'className="flex h-10 rounded-full overflow-hidden ring-1 ring-white/15 focus-within:ring-2 focus-within:ring-[{LINK}]"'),
    ('className="flex-1 min-w-0 px-3 text-[14px] text-[#0F1111] focus:outline-none"',
     f'className="flex-1 min-w-0 px-4 text-[14px] bg-[{NAVY_3}] text-[{TEXT}] placeholder:text-[{SUB4}] focus:outline-none"'),
    ('className="bg-[#C2533C] hover:bg-[#A8432F] w-12 flex items-center justify-center flex-shrink-0"',
     f'className="bg-[{TEXT}] hover:bg-white w-12 flex items-center justify-center flex-shrink-0"'),
    # (i) ボタン（棚の札の上）
    ("bg-white text-[#2D2620] border-white", f"bg-[{TEXT}] text-[{INK}] border-[{TEXT}]"),
    ("bg-[#1B7670] border-[#1B7670] text-white", f"bg-[{LINK}] border-[{LINK}] text-[{INK}]"),
    ("hover:bg-[#E6F2F1]", "hover:bg-white/10"),
    # 比較表の見出しのタグ（金は推奨だけ）
    ('"text-white text-[11px] sm:text-[12px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? \'bg-[#A8392A]\' : \'bg-[#7A4A20]\')',
     f'"text-[11px] sm:text-[12px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? \'bg-[{GOLD}] text-[{INK}]\' : \'ring-1 ring-white/25 text-[{SUB1}]\')'),
    # 比較表の推奨ボタンは金のまま（全体置換で青にしない）
    ('(c.recommended ? "bg-[#C2533C] hover:bg-[#A8432F] border-[#A8432F] text-[#FBEDD9]"',
     f'(c.recommended ? "bg-[{GOLD}] hover:bg-[{GOLD_HOVER}] border-[{GOLD_HOVER}] text-[{INK}]"'),
    # 値札の札（新カードでは使わないが、色はカードの札とそろえる）
    ("{ free: '#1B7670', buy: '#A8392A', monthly: '#2F6FD6' }", "{ free: '#2B8F6E', buy: '#B7791F', monthly: '#5B8A1E' }"),
    # 比較表の ○△×（暗地で読める明るさ）
    ("'○': { color: '#1B7670'", "'○': { color: '#34D399'"),
    ("'△': { color: '#B7791F'", "'△': { color: '#F59E0B'"),
    ("'×': { color: '#C0392B'", "'×': { color: '#F87171'"),
    ("color: '#5A6578'", "color: '#94A3B8'"),
    # 影 → 罫線（ツール一覧のパネル）
    ("bg-white rounded-sm shadow-sm p-4 md:p-6", f"bg-[{NAVY_2}] rounded-[16px] border border-white/[0.08] p-4 md:p-6"),
    # ナビ 2 段目: 下に細い罫
    ('<div className="bg-[#2D2620] text-white text-[13px]">',
     f'<div className="bg-[{NAVY_1}] text-white text-[13px] border-b border-white/10">'),
    # ヒーロー: 紺のグラデ＋淡い光
    ("rounded-sm overflow-hidden bg-gradient-to-br from-[#1F1B16] via-[#3A2F25] to-[#1F1B16] text-white",
     f"relative rounded-[16px] overflow-hidden bg-gradient-to-br from-[{NAVY_1}] via-[#141C30] to-[{NAVY_1}] text-white border border-white/10 hero-glow"),
    # 棚の札・棚板（金の太い下線 → 白 15% の細線）
    ('className="flex items-center justify-between gap-3 bg-[#2D2620] text-white rounded-t-sm px-4 py-2.5"',
     f'className="flex items-center justify-between gap-3 bg-[{NAVY_2}] text-white rounded-t-[16px] px-4 py-3 border border-b-0 border-white/10"'),
    ("bg-[#EFE6D6] px-3 pt-3 pb-3 border-b-[6px] border-[#7A4A20] rounded-b-sm",
     f"bg-[{NAVY_1}] px-3 pt-3 pb-3 border border-t-0 border-white/10 border-b-2 border-b-white/15 rounded-b-[16px]"),
    ("bg-[#FFF6E6] text-[14px] text-[#5A3B1A] px-4 py-2 border-x border-[#E3DACB]",
     f"bg-[{NAVY_3}] text-[14px] text-[{SUB1}] px-4 py-2 border-x border-white/10"),
    # ページの先頭へ
    ("bg-[#3A3128] hover:bg-[#4A4035] text-white", f"bg-[{NAVY_2}] hover:bg-[{NAVY_3}] text-[{SUB1}] border-t border-white/10 tracking-[0.12em]"),
    # 英字の小見出し（eyebrow）を見出しの上に
    ('<h2 className="text-[18px] md:text-[22px] font-bold text-[#0F1111]">ツール一覧',
     '<h2 className="text-[18px] md:text-[22px] font-bold text-[#0F1111]"><span className="eyebrow">The Collection</span>ツール一覧'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111]">X の 3 ツールの違い</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111]"><span className="eyebrow">Compare</span>X の 3 ツールの違い</h2>'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111] mb-5">購入してからの流れ</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111] mb-5"><span className="eyebrow">How it works</span>購入してからの流れ</h2>'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111]">よくある質問</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111]"><span className="eyebrow">Need to know</span>よくある質問</h2>'),
    # ヒーローの小見出し
    ("text-[#E8A87C] text-[11px] font-bold tracking-[0.12em] uppercase", f"text-[{GOLD_SOFT}] text-[11px] font-bold tracking-[0.24em] uppercase"),
    # ヒーローの「仕組み」は水色
    ('<span className="text-[#E8A87C]">仕組み</span>', f'<span className="text-[{LINK}]">仕組み</span>'),
    # ツール一覧のマス: 淡いサムネ → 暗いマス＋アイコンだけ（IndexTile は shelf_card.jsx）
    ('<div className="w-11 h-11 sm:w-auto sm:h-auto sm:aspect-square flex-shrink-0 rounded-sm overflow-hidden sm:mb-1.5"><Thumb p={p} small /></div>',
     '<div className="w-11 h-11 sm:w-auto sm:h-auto sm:aspect-square flex-shrink-0 rounded-[10px] overflow-hidden sm:mb-1.5"><IndexTile p={p} /></div>'),
    # ロゴは金のまま
    ('<rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="#C2533C"/>', f'<rect x="1.5" y="1.5" width="19" height="19" rx="4" fill="{GOLD}"/>'),
    # モックの印（BASE）
    ("const BASE = '';", "const BASE = '../'; // mock-dark/ から本番の thumbs/・各 LP を参照"),
]

# 2) 全体置換（色トークン）
GLOBAL: list[tuple[str, str]] = [
    ("#C2533C", LINK), ("#A8432F", LINK_HOVER), ("#FBEDD9", INK),
    ("#E8A87C", GOLD_SOFT), ("#1B7670", LINK), ("#0F4B47", LINK_HOVER),
    ("#0F1111", TEXT),
    ("#FAF7F2", NAVY_3), ("#EFE9DD", "#1C2740"), ("#FFFBF3", NAVY_1), ("#F3EDE3", NAVY_3),
    ("#F1DDB8", "#1C2740"), ("#E3DACB", LINE), ("#D9CFBF", LINE),
    ("#1F1B16", NAVY_0), ("#2D2620", NAVY_1), ("#3A2F25", "#141C30"),
    ("#7A4A20", "#334155"), ("#A8392A", GOLD),
    ("text-gray-900", f"text-[{TEXT}]"), ("text-gray-800", f"text-[{SUB1}]"),
    ("text-gray-700", f"text-[{SUB2}]"), ("text-gray-600", f"text-[{SUB3}]"),
    ("text-gray-500", f"text-[{SUB4}]"), ("text-gray-400", "text-[#5C6780]"),
    ("text-gray-300", f"text-[{SUB3}]"), ("text-gray-200", f"text-[{SUB1}]"),
    ("bg-gray-100", f"bg-[{NAVY_3}]"), ("bg-gray-200", "bg-[#1C2740]"), ("bg-gray-50", f"bg-[{NAVY_3}]"),
    ("border-gray-300", f"border-[{LINE}]"), ("border-gray-200", f"border-[{LINE}]"),
    ("bg-white", f"bg-[{NAVY_2}]"),
]

MOCK_BAR = (
    f'      <div className="bg-[{NAVY_0}] text-[{SUB3}] text-[11px] tracking-[0.2em] text-center py-1 uppercase font-mono">'
    'Mock · ダーク版（本番には未反映）</div>\n'
)

SHELFCARD_RE = re.compile(r"^function ShelfCard\(\{ p \}\) \{\n.*?^\}\n", re.S | re.M)


def swap_shelf_card(out: str, prod_ids: list[str]) -> str:
    """本番の ShelfCard 関数をモック専用の部品に差し替える（ちょうど 1 か所のときだけ）。"""
    hits = SHELFCARD_RE.findall(out)
    if len(hits) != 1:
        sys.exit(f"[build_mock_dark] ShelfCard が {len(hits)} か所（1 か所のはず・本番の jsx が変わった？）")
    card = CARD_SRC.read_text(encoding="utf-8")
    meta_ids = re.findall(r"^\s{2}(\w+):\s+\{ label:", card, flags=re.M)
    if sorted(meta_ids) != sorted(prod_ids):
        sys.exit(f"[build_mock_dark] CARD_META と PRODUCTS の id がずれている: meta={sorted(meta_ids)} products={sorted(prod_ids)}")
    return SHELFCARD_RE.sub(lambda _m: card if card.endswith("\n") else card + "\n", out, count=1)


def build_jsx(src: str) -> str:
    prod_ids = re.findall(r"id: '(\w+)', shelf:", src)
    out = src
    for old, new in SPECIFIC:
        if old not in out:
            sys.exit(f"[build_mock_dark] 置換元が見つからない（本番の jsx が変わった？）: {old[:80]}")
        out = out.replace(old, new)
    for old, new in GLOBAL:
        out = out.replace(old, new)
    # 色トークンを通したあとで差し替える（カード部品の色は置換表の影響を受けない）
    out = swap_shelf_card(out, prod_ids)
    out = out.replace('    <header className="select-none">\n', '    <header className="select-none">\n' + MOCK_BAR, 1)
    out = re.sub(r"^// Market v3\.1.*$", "// Market ダーク版モック（mock-dark/・scripts/build_mock_dark.py で本番から生成）", out, count=1, flags=re.M)
    return out


def build_html(src: str) -> str:
    out = src
    # 検索に載せない・計測しない
    out = re.sub(r'<link rel="canonical"[^>]*/>\n', '<meta name="robots" content="noindex, nofollow" />\n', out)
    out = re.sub(r'<meta property="og:[^>]*/>\n', "", out)
    out = re.sub(r'<meta name="twitter:card"[^>]*/>\n', "", out)
    out = re.sub(r"<!-- Google tag \(gtag\.js\) -->.*?</script>\n<script>.*?</script>\n", "", out, flags=re.S)
    out = re.sub(r'<script type="application/ld\+json">.*?</script>\n', "", out, flags=re.S)
    out = re.sub(r"<title>.*?</title>", "<title>【モック】ダーク版｜Youパパツールマーケット</title>", out)
    # パス
    for f in ("favicon.ico", "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png"):
        out = out.replace(f'href="{f}"', f'href="../{f}"')
    out = out.replace('src="assets/js/market-footer.js', 'src="../assets/js/market-footer.js')
    out = re.sub(r'src="components-amazon\.jsx\?v=[^"]*"', 'src="components-dark.jsx?v=dark3"', out)
    for d in ("xtp4/", "xtp3/", "bluesky/", "yay/", "fb-like/", "ameblo-like/", "note-bot/", "xtp-compare/"):
        out = out.replace(f'href="{d}"', f'href="../{d}"')
    # 書体: 見出しに明朝（Noto Serif JP）・Fraunces は 300〜700
    out = out.replace("family=Noto+Sans+JP:wght@400;500;700&", "family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&").replace("Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500", "Fraunces:opsz,wght@9..144,300..700")
    css_old = "  html, body { background: #F2EDE3; }"
    if css_old not in out:
        sys.exit("[build_mock_dark] index.html の背景指定が見つからない")
    out = out.replace(css_old, f"""  html, body {{ background: {NAVY_1}; }}
  body {{ background-image: radial-gradient(1200px 500px at 15% -10%, rgba(56,189,248,.10), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(167,139,250,.10), transparent 60%); background-repeat: no-repeat; }}
  h1, h2, h3 {{ font-family: "Fraunces", "Noto Serif JP", "Yu Mincho", serif; letter-spacing: 0.02em; }}
  h1 {{ text-wrap: balance; word-break: auto-phrase; }}
  .jp-phrase {{ word-break: auto-phrase; text-wrap: pretty; }}
  .eyebrow {{ display: block; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: {GOLD}; margin-bottom: 6px; }}
  .hero-glow::before {{ content: ""; position: absolute; inset: -40% 40% auto -10%; height: 140%; background: radial-gradient(closest-side, rgba(45,212,191,.18), transparent); pointer-events: none; }}
  .hero-glow > * {{ position: relative; }}
  .mkf {{ background: #0A0E19 !important; border-top: 1px solid rgba(255,255,255,.08); }}
  .mkf-copy {{ background: {NAVY_0} !important; }}
  .mkf-logo svg rect {{ fill: {GOLD}; }}
  .mkf-logo svg path, .mkf-logo svg circle {{ stroke: {INK}; }}
  .mkf-logo svg circle {{ fill: {INK}; }}""")
    out = out.replace("color: #0F1111;", f"color: {TEXT};")
    out = out.replace("::selection { background: #F1DDB8; color: #1F1B16; }", f"::selection {{ background: {LINK}; color: {INK}; }}")
    out = out.replace(":focus-visible { outline: 2px solid #C2533C;", f":focus-visible {{ outline: 2px solid {LINK};")
    out = out.replace("#fallback a { color: #1B7670; }", f"#fallback a {{ color: {LINK}; }}")
    out = re.sub(r"<!--\nVersion History.*?-->\n?", "", out, flags=re.S)
    out += ("<!--\nVersion History\n"
            "- ver1.2 (2026-11-01): ツール一覧のマスを暗いマス＋アイコンだけに（components-dark.jsx?v=dark3）\n"
            "- ver1.1 (2026-11-01): 紺〜黒＋淡い光に・棚のカードを参考デザインに（components-dark.jsx?v=dark2）\n"
            "- ver1.0 (2026-11-01): ダーク版モック（本番トップ ver3.10 から scripts/build_mock_dark.py で生成・noindex）\n-->\n")
    return out


def main() -> None:
    OUT.mkdir(exist_ok=True)
    jsx = build_jsx((ROOT / "components-amazon.jsx").read_text(encoding="utf-8"))
    jsx = re.sub(r"/\*\nVersion History.*?\*/\n?", "", jsx, flags=re.S)
    jsx += ("/*\nVersion History\n"
            "- ver1.2 (2026-11-01): ツール一覧のマスを IndexTile（暗いマス＋サムネのアイコン部分だけ＋淡い色の光）に\n"
            "- ver1.1 (2026-11-01): 紺〜黒＋淡い光に。棚のカードを scripts/mock_dark/shelf_card.jsx（円弧と光・等幅ラベル・枠の札・セリフの名前・チップ・STARTING AT）に差し替え。ボタン 2 つとリンク先は本番と同じ\n"
            "- ver1.0 (2026-11-01): ダーク版モック（黒×シャンパンゴールド×罫線・見出しは明朝）。本番 ver3.10 から生成\n*/\n")
    (OUT / "components-dark.jsx").write_text(jsx, encoding="utf-8", newline="\n")
    html = build_html((ROOT / "index.html").read_text(encoding="utf-8"))
    (OUT / "index.html").write_text(html, encoding="utf-8", newline="\n")
    print("wrote", OUT / "index.html", OUT / "components-dark.jsx")


if __name__ == "__main__":
    main()

# Version History
# - ver1.2 (2026-11-01): ツール一覧のマスを IndexTile に差し替える置換を追加
# - ver1.1 (2026-11-01): 紺〜黒の配色トークン・ShelfCard のブロック差し替え（CARD_META と PRODUCTS の id 照合）
# - ver1.0 (2026-11-01): 初版（黒×金）
