import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const base = process.env.NEXT_PUBLIC_BACKEND_BASE!;
  const r = await fetch(`${base}/tts/word`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: await req.text(),
  });
  return new NextResponse(await r.text(), { status: r.status });
}
