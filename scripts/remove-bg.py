"""
Remove the background from public/oriol.png and write the result next to it.

One-time setup:
    pip install rembg[cpu] onnxruntime pillow

Run:
    python scripts/remove-bg.py
        # → reads  public/oriol.png
        # → writes public/oriol-clean.png

To overwrite the original (only after you've reviewed the output):
    copy /Y public\\oriol-clean.png public\\oriol.png   (Windows cmd)
    cp -f public/oriol-clean.png public/oriol.png       (bash)

Notes:
- First run downloads the ~170 MB U2Net model into ~/.u2net/ (cached after).
- If the alpha edge looks soft, try `--model birefnet-portrait` or
  `--model isnet-general-use` (see the rembg docs for the full list).
"""

from __future__ import annotations

import sys
from pathlib import Path

from rembg import new_session, remove
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_IN = ROOT / "public" / "oriol.png"
DEFAULT_OUT = ROOT / "public" / "oriol-clean.png"
MODEL_NAME = "u2net"  # general-purpose; swap to "birefnet-portrait" for sharper hair


def main(in_path: Path, out_path: Path, model: str) -> None:
    if not in_path.exists():
        sys.exit(f"input not found: {in_path}")

    session = new_session(model)

    with Image.open(in_path) as img:
        cutout = remove(img, session=session)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    cutout.save(out_path, format="PNG")

    in_kb = in_path.stat().st_size // 1024
    out_kb = out_path.stat().st_size // 1024
    print(f"wrote {out_path.relative_to(ROOT)}  ({in_kb} KB -> {out_kb} KB, model={model})")


if __name__ == "__main__":
    args = sys.argv[1:]
    in_path = Path(args[0]) if len(args) >= 1 else DEFAULT_IN
    out_path = Path(args[1]) if len(args) >= 2 else DEFAULT_OUT
    model = args[2] if len(args) >= 3 else MODEL_NAME
    main(in_path, out_path, model)
