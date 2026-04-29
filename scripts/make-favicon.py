"""
Generate favicon + apple-touch-icon from public/oriol.png.

Drops files into src/app/ so Next.js 14's file-convention picks them up
automatically (no <link> tags needed).

Run:
    python scripts/make-favicon.py
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "oriol.png"
APP_DIR = ROOT / "src" / "app"

# Largest size first; smaller sizes downsampled from the same crop.
TARGETS = {
    "icon.png": 512,
    "apple-icon.png": 180,
}


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")

    img = Image.open(SRC).convert("RGBA")
    w, h = img.size

    # Find the opaque bbox (head/shoulders). If the image is fully opaque,
    # fall back to the full frame.
    alpha = img.split()[3]
    bbox = alpha.getbbox() or (0, 0, w, h)
    bx0, by0, bx1, by1 = bbox

    # We want a tight square around the head (top of the subject).
    # Take a square the size of the subject's width, anchored to the top of
    # the bbox. Center it horizontally on the subject.
    sub_w = bx1 - bx0
    sub_cx = (bx0 + bx1) // 2
    side = sub_w  # head is roughly as wide as shoulders / a bit narrower
    crop_x0 = max(0, sub_cx - side // 2)
    crop_y0 = by0
    crop_x1 = min(w, crop_x0 + side)
    crop_y1 = min(h, crop_y0 + side)

    # If we hit a wall on the right, slide left.
    if crop_x1 - crop_x0 < side:
        crop_x0 = max(0, crop_x1 - side)

    head = img.crop((crop_x0, crop_y0, crop_x1, crop_y1))

    APP_DIR.mkdir(parents=True, exist_ok=True)
    for filename, size in TARGETS.items():
        out = APP_DIR / filename
        resized = head.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(out, format="PNG", optimize=True)
        kb = out.stat().st_size // 1024
        print(f"wrote {out.relative_to(ROOT)}  ({size}x{size}, {kb} KB)")


if __name__ == "__main__":
    main()
