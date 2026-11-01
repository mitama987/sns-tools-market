"""ダーク版モック（mock-dark/）を本番トップから生成する。

本番の index.html と components-amazon.jsx は読むだけ（書き換えない）。
骨格・中身・リンクはそのまま、配色と見出しの書体だけを置き換える。

使い方: uv run python scripts/build_mock_dark.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "mock-dark"

# ── 配色トークン（黒 × シャンパンゴールド × 罫線） ──
GOLD = "#C9A96E"
GOLD_HOVER = "#B8955A"
GOLD_SOFT = "#E3C68A"
LINK = "#D8C08A"
INK = "#14110E"  # 金地の上の文字
CREAM = "#F2EDE3"

# 1) 文脈つきの置換（全体置換より先に当てる）
SPECIFIC: list[tuple[str, str]] = [
    # 検索欄: 白地の入力 → 暗い入力＋金の細枠
    ('className="flex h-10 rounded overflow-hidden focus-within:ring-2 focus-within:ring-[#C2533C]"',
     f'className="flex h-10 rounded overflow-hidden ring-1 ring-[{GOLD}]/40 focus-within:ring-2 focus-within:ring-[{GOLD}]"'),
    ('className="flex-1 min-w-0 px-3 text-[14px] text-[#0F1111] focus:outline-none"',
     f'className="flex-1 min-w-0 px-3 text-[14px] bg-[#1A1612] text-[{CREAM}] placeholder:text-[#8F8473] focus:outline-none"'),
    # (i) ボタン
    ("bg-white text-[#2D2620] border-white", f"bg-[{GOLD}] text-[{INK}] border-[{GOLD}]"),
    ("bg-[#1B7670] border-[#1B7670] text-white", f"bg-[{GOLD}] border-[{GOLD}] text-[{INK}]"),
    ("hover:bg-[#E6F2F1]", "hover:bg-[#2A231B]"),
    # サムネのバッジ
    ("(i === 0 ? 'bg-[#A8392A]' : 'bg-[#7A4A20]') + ' text-white text-[12px]",
     f"(i === 0 ? 'bg-[{GOLD}] text-[{INK}]' : 'bg-[{INK}]/85 text-[{GOLD_SOFT}] ring-1 ring-[{GOLD}]/50') + ' text-[12px]"),
    # 比較表の見出しのタグ
    ('"text-white text-[11px] sm:text-[12px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? \'bg-[#A8392A]\' : \'bg-[#7A4A20]\')',
     f'"text-[11px] sm:text-[12px] font-bold px-1.5 py-0.5 rounded " + (c.recommended ? \'bg-[{GOLD}] text-[{INK}]\' : \'ring-1 ring-[{GOLD}]/50 text-[{GOLD_SOFT}]\')'),
    # 値札の札（暗地で読める濃さ）
    ("{ free: '#1B7670', buy: '#A8392A', monthly: '#2F6FD6' }", "{ free: '#2B7F72', buy: '#A8503A', monthly: '#3A6FC0' }"),
    # 比較表の ○△×
    ("'○': { color: '#1B7670'", "'○': { color: '#7FC8B8'"),
    ("'△': { color: '#B7791F'", "'△': { color: '#E0B860'"),
    ("'×': { color: '#C0392B'", "'×': { color: '#E08070'"),
    ("color: '#5A6578'", "color: '#8C97AA'"),
    # 2 つ目のボタン（有料版を購入する）: 金の細枠
    ("bg-[#FBEDD9] hover:bg-[#F1DDB8] border border-[#3A2F25] text-[#1F1B16]",
     f"bg-transparent hover:bg-[{GOLD}]/10 border border-[{GOLD}]/60 text-[{GOLD_SOFT}]"),
    # 影 → 罫線
    ("bg-white rounded-sm shadow-sm p-4 md:p-6", f"bg-[#17140F] rounded-sm border border-[{GOLD}]/20 p-4 md:p-6"),
    ("relative bg-white rounded-sm p-3 sm:p-4 hover:shadow-md transition-shadow",
     f"relative bg-[#17140F] rounded-sm p-3 sm:p-4 border border-[#2E271F] hover:border-[{GOLD}]/50 transition-colors"),
    ("rounded-sm overflow-hidden aspect-[4/3] bg-[#FAF7F2]",
     f"rounded-sm overflow-hidden aspect-[4/3] bg-[#1C1813] ring-1 ring-[{GOLD}]/25"),
    # ナビ: 下に金の罫
    ('<div className="bg-[#2D2620] text-white text-[13px]">',
     f'<div className="bg-[#14110E] text-white text-[13px] border-b border-[{GOLD}]/30">'),
    # ヒーロー: 金の細枠
    ("rounded-sm overflow-hidden bg-gradient-to-br from-[#1F1B16] via-[#3A2F25] to-[#1F1B16] text-white",
     f"rounded-sm overflow-hidden bg-gradient-to-br from-[#0B0907] via-[#1E1913] to-[#0B0907] text-white border border-[{GOLD}]/30"),
    # 棚の札・棚板
    ('className="flex items-center justify-between gap-3 bg-[#2D2620] text-white rounded-t-sm px-4 py-2.5"',
     f'className="flex items-center justify-between gap-3 bg-[#14110E] text-white rounded-t-sm px-4 py-2.5 border border-b-0 border-[{GOLD}]/30"'),
    ("bg-[#EFE6D6] px-3 pt-3 pb-3 border-b-[6px] border-[#7A4A20] rounded-b-sm",
     f"bg-[#100D0A] px-3 pt-3 pb-3 border border-t-0 border-[{GOLD}]/20 border-b-[3px] border-b-[{GOLD}]/70 rounded-b-sm"),
    ("bg-[#FFF6E6] text-[14px] text-[#5A3B1A] px-4 py-2 border-x border-[#E3DACB]",
     "bg-[#1F1A14] text-[14px] text-[#D8CDB8] px-4 py-2 border-x border-[#3A3128]"),
    # ページの先頭へ
    ("bg-[#3A3128] hover:bg-[#4A4035] text-white", f"bg-[#100D0A] hover:bg-[#1A1612] text-[{GOLD_SOFT}] border-t border-[{GOLD}]/30 tracking-[0.12em]"),
    # 英字の小見出し（eyebrow）を見出しの上に
    ('<h2 className="text-[18px] md:text-[22px] font-bold text-[#0F1111]">ツール一覧',
     '<h2 className="text-[18px] md:text-[22px] font-bold text-[#0F1111]"><span className="eyebrow">The Collection</span>ツール一覧'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111]">X の 3 ツールの違い</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111]"><span className="eyebrow">Compare</span>X の 3 ツールの違い</h2>'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111] mb-5">購入してからの流れ</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111] mb-5"><span className="eyebrow">How it works</span>購入してからの流れ</h2>'),
    ('<h2 className="text-[24px] font-bold text-[#0F1111]">よくある質問</h2>',
     '<h2 className="text-[24px] font-bold text-[#0F1111]"><span className="eyebrow">Need to know</span>よくある質問</h2>'),
    # ヒーローの小見出しも字間を広げる
    ("text-[#E8A87C] text-[11px] font-bold tracking-[0.12em] uppercase", f"text-[{GOLD_SOFT}] text-[11px] font-bold tracking-[0.24em] uppercase"),
    # モックの印（BASE）
    ("const BASE = '';", "const BASE = '../'; // mock-dark/ から本番の thumbs/・各 LP を参照"),
]

# 2) 全体置換（色トークン）
GLOBAL: list[tuple[str, str]] = [
    ("#C2533C", GOLD), ("#A8432F", GOLD_HOVER), ("#FBEDD9", INK),
    ("#E8A87C", GOLD_SOFT), ("#1B7670", LINK), ("#0F4B47", "#F2DCA6"),
    ("#0F1111", CREAM),
    ("#FAF7F2", "#1C1813"), ("#EFE9DD", "#2A231B"), ("#FFFBF3", "#120F0B"), ("#F3EDE3", "#1F1A14"),
    ("#F1DDB8", "#2A231B"), ("#E3DACB", "#3A3128"), ("#D9CFBF", "#3A3128"),
    ("#1F1B16", "#0B0907"), ("#2D2620", "#14110E"), ("#3A2F25", "#1E1913"),
    ("#7A4A20", "#6B5634"), ("#A8392A", "#A8503A"),
    ("text-gray-900", "text-[#EDE6D8]"), ("text-gray-800", "text-[#D6CCBB]"),
    ("text-gray-700", "text-[#BDB2A0]"), ("text-gray-600", "text-[#A89C8A]"),
    ("text-gray-500", "text-[#8F8473]"), ("text-gray-400", "text-[#6E6557]"),
    ("text-gray-300", "text-[#A89C8A]"), ("text-gray-200", "text-[#CFC6B6]"),
    ("bg-gray-100", "bg-[#1F1A14]"), ("bg-gray-200", "bg-[#2A231B]"), ("bg-gray-50", "bg-[#1F1A14]"),
    ("border-gray-300", "border-[#3A3128]"), ("border-gray-200", "border-[#2E271F]"),
    ("bg-white", "bg-[#17140F]"),
]

MOCK_BAR = (
    f'      <div className="bg-[#050403] text-[{GOLD}] text-[11px] tracking-[0.2em] text-center py-1 uppercase">'
    'Mock · ダーク版（本番には未反映）</div>\n'
)


def build_jsx(src: str) -> str:
    out = src
    for old, new in SPECIFIC:
        if old not in out:
            sys.exit(f"[build_mock_dark] 置換元が見つからない（本番の jsx が変わった？）: {old[:80]}")
        out = out.replace(old, new)
    for old, new in GLOBAL:
        out = out.replace(old, new)
    # モックの印をヘッダーの一番上に
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
    out = re.sub(r'src="components-amazon\.jsx\?v=[^"]*"', 'src="components-dark.jsx?v=dark1"', out)
    for d in ("xtp4/", "xtp3/", "bluesky/", "yay/", "fb-like/", "ameblo-like/", "note-bot/", "xtp-compare/"):
        out = out.replace(f'href="{d}"', f'href="../{d}"')
    # 書体: 見出しに明朝（Noto Serif JP）を足す
    out = out.replace("family=Noto+Sans+JP:wght@400;500;700&", "family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&").replace("Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500", "Fraunces:opsz,wght@9..144,300..700")
    # 配色（地・文字・選択・フォーカス）＋ 共通フッターを暗く
    css_old = "  html, body { background: #F2EDE3; }"
    if css_old not in out:
        sys.exit("[build_mock_dark] index.html の背景指定が見つからない")
    out = out.replace(css_old, f"""  html, body {{ background: #0E0C0A; }}
  h1, h2, h3 {{ font-family: "Fraunces", "Noto Serif JP", "Yu Mincho", serif; letter-spacing: 0.04em; }}
  .eyebrow {{ display: block; font-family: "Fraunces", Georgia, serif; font-size: 11px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: {GOLD}; margin-bottom: 4px; }}
  .mkf {{ background: #0B0907 !important; border-top: 1px solid rgba(201,169,110,.3); }}
  .mkf-copy {{ background: #050403 !important; }}
  .mkf-logo svg rect {{ fill: {GOLD}; }}
  .mkf-logo svg path, .mkf-logo svg circle {{ stroke: {INK}; }}
  .mkf-logo svg circle {{ fill: {INK}; }}
  h1 {{ text-wrap: balance; word-break: auto-phrase; }}""")
    out = out.replace("color: #0F1111;", f"color: {CREAM};")
    out = out.replace("::selection { background: #F1DDB8; color: #1F1B16; }", f"::selection {{ background: {GOLD}; color: {INK}; }}")
    out = out.replace(":focus-visible { outline: 2px solid #C2533C;", f":focus-visible {{ outline: 2px solid {GOLD};")
    out = out.replace("#fallback a { color: #1B7670; }", f"#fallback a {{ color: {LINK}; }}")
    out = re.sub(r"<!--\nVersion History.*?-->\n?", "", out, flags=re.S)
    out += "<!--\nVersion History\n- ver1.0 (2026-11-01): ダーク版モック（本番トップ ver3.10 から scripts/build_mock_dark.py で生成・noindex）\n-->\n"
    return out


def main() -> None:
    OUT.mkdir(exist_ok=True)
    jsx = build_jsx((ROOT / "components-amazon.jsx").read_text(encoding="utf-8"))
    jsx = re.sub(r"/\*\nVersion History.*?\*/\n?", "", jsx, flags=re.S)
    jsx += "/*\nVersion History\n- ver1.0 (2026-11-01): ダーク版モック（黒×シャンパンゴールド×罫線・見出しは明朝）。本番 ver3.10 から生成\n*/\n"
    (OUT / "components-dark.jsx").write_text(jsx, encoding="utf-8", newline="\n")
    html = build_html((ROOT / "index.html").read_text(encoding="utf-8"))
    (OUT / "index.html").write_text(html, encoding="utf-8", newline="\n")
    print("wrote", OUT / "index.html", OUT / "components-dark.jsx")


if __name__ == "__main__":
    main()
