"""Generate Market product thumbnails via OpenAI Images API (gpt-image-2).

Unified design: dark navy background with faint dot grid, centered rounded-square
app icon with per-tool brand gradient and white glyph, tool name in white sans
beneath the icon. Matches the XTP4 LP hero treatment.

Reads OPENAI_API_KEY from C:/Users/mitam/Desktop/work/90_other/ClaudeCompany/.env
at runtime. Does not persist the key elsewhere.

Usage (from project root):
    uv run python scripts/gen_thumbs.py            # generate all
    uv run python scripts/gen_thumbs.py xtp4       # generate one
"""
from __future__ import annotations

import base64
import json
import sys
import urllib.request
from pathlib import Path

ENV_PATH = Path("C:/Users/mitam/Desktop/work/90_other/ClaudeCompany/.env")
OUT_DIR = Path(__file__).resolve().parent.parent / "thumbs"
MODEL = "gpt-image-2"
SIZE = "1024x1024"


def base_prompt(*, label: str, glyph: str, gradient: str, background: str, text_color: str) -> str:
    return (
        "A clean square (1:1) product thumbnail in a unified app-icon style. "
        f"Background: {background} "
        "A faint thin dot grid pattern is visible across the whole canvas. "
        "Centered composition: a single large rounded-square 'app icon' "
        f"(about 50% of the canvas) with a smooth {gradient} gradient, soft "
        "inner highlight on top edge, gentle outer glow matching the icon "
        "color, mild realistic glassy reflection. "
        f"Inside the icon: a bold pure-white stylized {glyph}, perfectly "
        "centered, generous padding. "
        f"Directly beneath the icon: the text '{label}' rendered in a clean "
        f"modern {text_color} sans-serif typeface (Inter / SF Pro style), "
        "medium weight, properly kerned, no decoration. The text MUST be "
        f"spelled exactly '{label}' with no typos, no extra characters, no "
        "alternate spellings. "
        "No other text, no captions, no logos other than the glyph inside the "
        "icon, no watermark, no badges, no UI chrome around. High contrast, "
        "premium app-store hero feel."
    )


DARK_BG = (
    "very dark near-black navy (#0A0B12) with a very subtle purple glow in "
    "the top-left and bottom-right corners."
)


VARIANTS: dict[str, dict[str, str]] = {
    "xtp3": {
        "label": "XToolsPro3",
        "glyph": "X logo (post-Twitter rebrand: two crossing diagonal strokes forming an X)",
        "gradient": "from indigo (#4F46E5) at the top-left to vivid violet (#7C3AED) at the bottom-right",
        "background": DARK_BG,
        "text_color": "pure white",
    },
    "xtp4": {
        "label": "XToolsPro4",
        "glyph": "X logo (post-Twitter rebrand: two crossing diagonal strokes forming an X)",
        "gradient": "from royal blue (#3B5BFF) at the top-left to vivid violet (#8B5CF6) at the bottom-right",
        "background": DARK_BG,
        "text_color": "pure white",
    },
    "ig": {
        "label": "InstagramToolsPro",
        "glyph": "Instagram-style camera glyph (rounded square outline with a circle lens inside and a small dot at top-right)",
        "gradient": "from sunset orange (#F58529) through pink (#DD2A7B) to purple (#8134AF) diagonally",
        "background": (
            "a soft warm peach to blush gradient (#FFE9D6 at top-left to "
            "#FBD3DF at bottom-right) with a faint magenta glow in the corners."
        ),
        "text_color": "deep plum (#3A1235)",
    },
    "fb": {
        "label": "FacebookToolsPro",
        "glyph": "Facebook-style lowercase f letterform glyph",
        "gradient": "from bright Facebook blue (#1877F2) at the top to deeper navy blue (#0A4FBF) at the bottom",
        "background": (
            "a soft icy blue gradient (#E6F0FF at top-left to #CDDDFB at "
            "bottom-right) with a faint cobalt glow in the corners."
        ),
        "text_color": "deep navy (#0A2540)",
    },
    "note": {
        "label": "noteToolsPro",
        "glyph": "stylized lowercase 'n' letterform reminiscent of the note.com mark, slightly geometric",
        "gradient": "from fresh leaf green (#41C9B4) at the top-left to teal (#2A9D8F) at the bottom-right",
        "background": (
            "a soft mint to cream gradient (#E6F7F2 at top-left to #FAF7EE at "
            "bottom-right) with a faint teal glow in the corners."
        ),
        "text_color": "deep forest green (#0F3B33)",
    },
    "bsky": {
        "label": "BlueskyToolsPro",
        "glyph": "Bluesky-style butterfly mark (two stylized rounded wings)",
        "gradient": "from sky blue (#1DA1F2) at the top to cyan (#0EA5E9) at the bottom",
        "background": (
            "a clear daylight sky gradient (#DCEEFF at top to #F4FAFF at "
            "bottom) with a faint cyan glow and a few extremely subtle cloud-"
            "like soft shapes."
        ),
        "text_color": "deep ocean blue (#0B3D66)",
    },
    "yay": {
        "label": "yayToolsPro",
        "glyph": "playful chat-bubble glyph with a small sparkle / star inside",
        "gradient": "from warm yellow (#FACC15) at the top-left to coral pink (#F472B6) at the bottom-right",
        "background": (
            "a cheerful pastel gradient (#FFF4D6 at top-left to #FFD9E6 at "
            "bottom-right) with a faint warm glow in the corners."
        ),
        "text_color": "warm dark brown (#3A2210)",
    },
}


def tile_icon_prompt(*, gradient: str, glyph: str) -> str:
    return (
        "A clean square (1:1) icon-only thumbnail. Background: warm cream "
        "(#FAF7F2) flat, completely uniform, no grid, no gradient, no glow. "
        "Centered: a single large rounded-square app icon (about 70% of the "
        f"canvas) with a smooth {gradient} gradient, subtle inner highlight "
        "on the top edge, very gentle outer glow, mild glassy reflection. "
        f"Inside the icon: a bold pure-white stylized {glyph}, perfectly "
        "centered, generous padding. ABSOLUTELY NO TEXT anywhere on the "
        "canvas: no label, no caption, no watermark, no letters, no numbers, "
        "no logos other than the glyph inside the icon. Premium app-store "
        "icon shot, sharp edges, clean."
    )


def sticker_prompt(*, lines: list[str]) -> str:
    body_lines = "\n".join(f"      {idx+1}. '{ln}'" for idx, ln in enumerate(lines))
    return (
        "A clean square (1:1) promotional thumbnail in an Amazon-style "
        "retail look. Background: warm cream (#FAF7F2) flat, completely "
        "uniform, no grid, no gradient. Centered subject: a glossy circular "
        "sale sticker, about 70% of the canvas, with slightly wavy / "
        "starburst rounded edges, painted in a vivid Amazon-red (#A8392A) "
        "with a subtle darker red border and a soft drop shadow. On the "
        "sticker, large bold pure-white sans-serif text reads EXACTLY on "
        f"separate stacked lines (no other text):\n{body_lines}\n"
        "Top line should be smaller, bottom line should be largest and most "
        "prominent. Spell each line exactly with no typos and no extra "
        "characters. Subtle highlight reflection on the upper-left of the "
        "sticker. NO other text, no watermark, no captions, no logos, no UI "
        "chrome."
    )


def faq_line_prompt(*, subject: str) -> str:
    return (
        "A clean square (1:1) FAQ icon thumbnail in a minimal line-art "
        "style. Background: warm cream (#FAF7F2) flat, completely uniform, "
        "no grid, no gradient. Centered subject (about 60% of the canvas): "
        f"{subject}. Drawn as clean line art with a consistent medium stroke "
        "weight in a deep warm-charcoal color (#3A3128). Soft, very subtle "
        "drop shadow under the icon. ABSOLUTELY NO TEXT on the canvas: no "
        "caption, no label, no watermark, no letters, no numbers. "
        "Editorial, infographic-magazine feel."
    )


EXTRAS: dict[str, dict[str, str]] = {
    # ─── 今、人気のツール（テキスト無しアイコン版） ───
    "tile-xtp4-icon": {
        "out_subdir": "tiles",
        "prompt": tile_icon_prompt(
            gradient="from royal blue (#3B5BFF) at the top-left to vivid violet (#8B5CF6) at the bottom-right",
            glyph="X logo (post-Twitter rebrand: two crossing diagonal strokes forming an X)",
        ),
    },
    "tile-ig-icon": {
        "out_subdir": "tiles",
        "prompt": tile_icon_prompt(
            gradient="from sunset orange (#F58529) through pink (#DD2A7B) to purple (#8134AF) diagonally",
            glyph="Instagram-style camera glyph (rounded square outline with a circle lens inside and a small dot at top-right)",
        ),
    },
    "tile-note-icon": {
        "out_subdir": "tiles",
        "prompt": tile_icon_prompt(
            gradient="from fresh leaf green (#41C9B4) at the top-left to teal (#2A9D8F) at the bottom-right",
            glyph="stylized lowercase 'n' letterform reminiscent of the note.com mark, slightly geometric",
        ),
    },
    "tile-bsky-icon": {
        "out_subdir": "tiles",
        "prompt": tile_icon_prompt(
            gradient="from sky blue (#1DA1F2) at the top to cyan (#0EA5E9) at the bottom",
            glyph="Bluesky-style butterfly mark (two stylized rounded wings)",
        ),
    },
    # ─── タイムセール開催中（赤ステッカー） ───
    "sale-40off": {
        "out_subdir": "sale",
        "prompt": sticker_prompt(lines=["MAX", "40% OFF"]),
    },
    "sale-bundle20": {
        "out_subdir": "sale",
        "prompt": sticker_prompt(lines=["BUNDLE", "20% BACK"]),
    },
    "sale-upgrade": {
        "out_subdir": "sale",
        "prompt": sticker_prompt(lines=["UPGRADE", "Pro3 to Pro4"]),
    },
    "sale-new980": {
        "out_subdir": "sale",
        "prompt": sticker_prompt(lines=["FIRST MONTH", "980 YEN"]),
    },
    # ─── よくある質問（線画アイコン） ───
    "faq-pricing": {
        "out_subdir": "faq",
        "prompt": faq_line_prompt(
            subject=(
                "a simple two-pan balance scale icon, slightly tilted. On the "
                "left pan a single circular coin marked with a yen symbol "
                "(¥). On the right pan a tiny neat stack of three identical "
                "small coins to suggest recurring monthly payments. The only "
                "character on the canvas may be the single ¥ glyph on the "
                "left coin"
            ),
        ),
    },
    "faq-ban": {
        "out_subdir": "faq",
        "prompt": faq_line_prompt(
            subject=(
                "a simple heraldic shield outline standing upright, with a "
                "clean rounded check mark centered inside it; a small "
                "decorative sparkle or two dots beside the shield to suggest "
                "protection. No facial features, no extra props"
            ),
        ),
    },
    "faq-refund": {
        "out_subdir": "faq",
        "prompt": faq_line_prompt(
            subject=(
                "a circular coin marked with a yen symbol (¥) on its face, "
                "with a smooth U-shaped curved return arrow looping around "
                "and pointing back at the coin to suggest a refund. Clean "
                "and balanced composition. The only character on the canvas "
                "is the ¥ glyph on the coin"
            ),
        ),
    },
    "faq-link": {
        "out_subdir": "faq",
        "prompt": faq_line_prompt(
            subject=(
                "two interlocking chain links rendered as clean line art, "
                "tilted diagonally so the links form a connected pair; a "
                "small subtle sparkle near the joint to suggest secure "
                "linking. No other props"
            ),
        ),
    },
}


def load_api_key() -> str:
    if not ENV_PATH.exists():
        print(f"env file not found: {ENV_PATH}", file=sys.stderr)
        sys.exit(2)
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("OPENAI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    print("OPENAI_API_KEY not in env file", file=sys.stderr)
    sys.exit(2)


def generate(api_key: str, key: str, spec: dict[str, str]) -> Path:
    if "prompt" in spec:
        prompt = spec["prompt"]
    else:
        prompt = base_prompt(
            label=spec["label"],
            glyph=spec["glyph"],
            gradient=spec["gradient"],
            background=spec["background"],
            text_color=spec["text_color"],
        )
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "size": SIZE,
        "n": 1,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    print(f"[{key}] requesting {MODEL} {SIZE} ...", file=sys.stderr)
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            body = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")
        print(f"[{key}] HTTP {e.code}: {msg[:800]}", file=sys.stderr)
        raise

    data = body.get("data", [])
    if not data:
        raise RuntimeError(f"[{key}] empty data: {json.dumps(body)[:500]}")
    item = data[0]
    if "b64_json" in item:
        png = base64.b64decode(item["b64_json"])
    elif "url" in item:
        with urllib.request.urlopen(item["url"], timeout=120) as r:
            png = r.read()
    else:
        raise RuntimeError(f"[{key}] no b64_json/url: {json.dumps(item)[:500]}")

    out_dir = OUT_DIR / spec["out_subdir"] if spec.get("out_subdir") else OUT_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"{key}.png"
    out.write_bytes(png)
    print(f"[{key}] saved {out} ({len(png)} bytes)", file=sys.stderr)
    return out


def main(argv: list[str]) -> int:
    api_key = load_api_key()
    all_specs = {**VARIANTS, **EXTRAS}
    targets = argv[1:] if len(argv) > 1 else list(VARIANTS.keys())
    paths = []
    for key in targets:
        if key not in all_specs:
            print(f"unknown key: {key} (known: {list(all_specs)})", file=sys.stderr)
            return 2
        try:
            paths.append(generate(api_key, key, all_specs[key]))
        except Exception as ex:
            print(f"[{key}] FAILED: {ex}", file=sys.stderr)
            return 1
    print("OK")
    for p in paths:
        print(p)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
