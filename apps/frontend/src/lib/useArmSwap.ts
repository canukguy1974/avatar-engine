export function useArmSwap() {
  let armed = false;
  async function arm(sessionId: string) {
    armed = true;
    await fetch("/api/notify-enhanced", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
  }
  async function onWordBoundary(sessionId: string, ms: number) {
    if (!armed) return null;
    const r = await fetch("/api/tts-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, ms }),
    });
    if (!r.ok) return null;
    const { swap_url } = await r.json();
    if (swap_url) armed = false;
    return swap_url ? { url: swap_url } : null;
  }
  return { arm, onWordBoundary };
}
