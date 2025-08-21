import os, subprocess
from pathlib import Path

OUT = Path(os.getenv("OUTPUT_DIR", "/data/outputs")).resolve()

def newest_enhanced() -> Path | None:
    vids = list(OUT.rglob("*enhanced.mp4"))
    if not vids: return None
    return max(vids, key=lambda p: p.stat().st_mtime)

def trim_at_ms(src: Path, cut_ms: int) -> dict:
    t = f"{cut_ms/1000.0:.3f}"
    fast = OUT / f"{src.stem}_trim_fast.mp4"
    precise = OUT / f"{src.stem}_trim_precise.mp4"

    subprocess.run(
        ["ffmpeg","-y","-ss",t,"-i",str(src),"-c","copy",
         "-avoid_negative_ts","make_zero",str(fast)], check=True)
    subprocess.run(
        ["ffmpeg","-y","-ss",t,"-i",str(src),
         "-c:v","libx264","-preset","veryfast","-crf","18",
         "-c:a","copy","-movflags","+faststart",str(precise)], check=True)

    rel_fast = fast.relative_to(OUT).as_posix()
    rel_prec = precise.relative_to(OUT).as_posix()
    return {"fast": f"/files/{rel_fast}", "precise": f"/files/{rel_prec}"}
