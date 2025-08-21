import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from services import state
from services.swap import newest_enhanced, trim_at_ms
from services.sadtalker import render_hq

OUT = Path(os.getenv("OUTPUT_DIR", "/data/outputs")).resolve()

app = FastAPI(title="Realtime Avatar Backend")
app.add_middleware(CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"ok": True}

@app.get("/files/{rel_path:path}")
def serve_file(rel_path: str):
    p = (OUT / rel_path).resolve()
    if not str(p).startswith(str(OUT)): raise HTTPException(400, "bad path")
    if not p.exists(): raise HTTPException(404, "not found")
    return FileResponse(str(p))

@app.post("/hq/render")
def hq_render(payload: dict):
    src = payload.get("src"); audio = payload.get("audio")
    if not src or not audio: raise HTTPException(400, "src/audio required")
    job = render_hq(src, audio); return {"job": job}

@app.post("/notify/enhanced")
def notify_enhanced(payload: dict):
    sid = payload.get("session_id") or "default"
    state.arm(sid)
    return {"armed": True, "session_id": sid}

@app.post("/tts/word")
def tts_word(payload: dict):
    sid = payload.get("session_id") or "default"
    ms = payload.get("ms")
    if ms is None: raise HTTPException(400, "ms required")
    if not state.is_armed(sid): return {"swap_url": None}  # not time yet

    src = newest_enhanced()
    if not src:
        # HQ not ready—stay armed, try next word boundary
        return {"swap_url": None}

    urls = trim_at_ms(src, int(ms))
    state.disarm(sid)
    # prefer precise cut for a clean first frame
    return {"swap_url": urls["precise"]}
