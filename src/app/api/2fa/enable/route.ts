import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({}));
  if (!token) return NextResponse.json({ ok: false, error: "token required" }, { status: 400 });
  // Ohne gespeichertes Secret können wir hier nur simulieren:
  return NextResponse.json({ ok: true, simulated: true });
}
