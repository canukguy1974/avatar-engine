# simple in-memory session state
from typing import Dict

_SESS: Dict[str, dict] = {}

def get(sid: str) -> dict:
    st = _SESS.get(sid)
    if not st:
        st = {"armed": False}
        _SESS[sid] = st
    return st

def arm(sid: str) -> None:
    get(sid)["armed"] = True

def disarm(sid: str) -> None:
    get(sid)["armed"] = False

def is_armed(sid: str) -> bool:
    return bool(get(sid).get("armed"))
