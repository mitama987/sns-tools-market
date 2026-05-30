"""Generate the Market site favicon via OpenAI Images API (gpt-image-2).

Renders the existing brand mark as an app icon: a rounded-square persimmon
tile with a bold white "M" drawn as an upward market/stock zig-zag line plus a
small dot to the lower right (matches the SVG logo in components-amazon.jsx).

Saves the 1024x1024 master to favicon-src.png in the project root. Downscaling
to .ico / 32 / 16 / apple-touch is done separately with Pillow.

Reads OPENAI_API_KEY from C:/Users/mitam/Desktop/work/90_other/ClaudeCompany/.env
at runtime (same convention as gen_thumbs.py). Does not persist the key.

Usage (from project root):
    uv run python scripts/gen_favicon.py
"""
from __future__ import annotations

import base64
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

ENV_PATH = Path("C:/Users/mitam/Desktop/work/90_other/ClaudeCompany/.env")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "favicon-src.png"
MODEL = "gpt-image-2"
SIZE = "1024x1024"

PROMPT = (
    "A single premium app icon that fills the entire square (1:1) canvas, "
    "edge to edge. The icon is a rounded-square tile with a smooth gradient "
    "from warm persimmon (#C2533C) at the top-left to deep terracotta "
    "(#A8432F) at the bottom-right, a soft inner highlight along the top "
    "edge and a gentle glassy reflection. "
    "Inside the tile, perfectly centered with generous padding, a single bold "
    "pure-white (#FBEDD9) letter 'M' is drawn as a clean upward zig-zag "
    "market/stock line: down-up-down-up strokes forming an M with rounded "
    "stroke ends, medium-thick uniform line weight. To the lower right of the "
    "M sits one small solid white dot, like a period. "
    "Minimal, geometric, crisp, instantly legible even at tiny sizes. "
    "No other text, no captions, no extra letters, no watermark, no badges, "
    "no UI chrome. Flat modern fintech app-icon aesthetic, high contrast."
)


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


def main() -> int:
    api_key = load_api_key()
    payload = json.dumps({
        "model": MODEL,
        "prompt": PROMPT,
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
    print(f"requesting {MODEL} {SIZE} ...", file=sys.stderr)
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            body = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        msg = e.read().decode("utf-8", errors="replace")
        print(f"HTTP {e.code}: {msg[:800]}", file=sys.stderr)
        return 1

    data = body.get("data", [])
    if not data:
        print(f"empty data: {json.dumps(body)[:500]}", file=sys.stderr)
        return 1
    item = data[0]
    if "b64_json" in item:
        png = base64.b64decode(item["b64_json"])
    elif "url" in item:
        with urllib.request.urlopen(item["url"], timeout=120) as r:
            png = r.read()
    else:
        print(f"no b64_json/url: {json.dumps(item)[:500]}", file=sys.stderr)
        return 1

    OUT.write_bytes(png)
    print(f"saved {OUT} ({len(png)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
