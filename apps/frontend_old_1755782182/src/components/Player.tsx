"use client";
import { useEffect } from "react";
import { useArmSwap } from "@/lib/useArmSwap";
import { swapVideo } from "@/lib/swapVideo";

export default function Player() {
  const { arm, onWordBoundary } = useArmSwap();
  const sessionId = "default";

  // Expose simple console hooks (dev)
  useEffect(() => {
    // @ts-ignore
    window.__swap = {
      onEnhancedReady: async () => arm(sessionId),
      handleWord: async (ms: number) => {
        const res = await onWordBoundary(sessionId, ms);
        if (res?.url) await swapVideo(res.url);
      },
    };
  }, [arm, onWordBoundary]);

  return (
    <main className="space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-black text-white"
          onClick={() => (window as any).__swap?.onEnhancedReady()}>
          Arm (simulate HQ ready)
        </button>
        <button className="px-3 py-1 rounded bg-gray-800 text-white"
          onClick={() => (window as any).__swap?.handleWord(1500)}>
          Cut @ 1500ms
        </button>
      </div>
      <audio id="audio" autoPlay />
      <div className="relative w-[640px] h-[360px] bg-black rounded overflow-hidden">
        <video id="did" className="absolute inset-0 w-full h-full object-cover" muted autoPlay playsInline />
        <video id="sad" className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline />
      </div>
    </main>
  );
}
