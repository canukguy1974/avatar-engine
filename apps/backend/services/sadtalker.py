import os, subprocess, uuid
from pathlib import Path

OUT = Path(os.getenv("OUTPUT_DIR", "/data/outputs")).resolve()
PIPE = os.getenv("SADTALKER_PIPELINE", "/workspace/bin/pipeline.sh")

def render_hq(src_img: str, audio: str) -> str:
    """Spawn HQ render; return job id (fire-and-forget)."""
    job = str(uuid.uuid4())[:8]
    log = f"/tmp/sadtalker_{job}.log"
    subprocess.Popen([PIPE, src_img, audio, str(OUT)],
                     stdout=open(log, "a"), stderr=open(log, "a"))
    return job
