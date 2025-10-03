import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

// Platzhalter ohne Persistenz, damit UI-Flow später leicht ergänzt werden kann.
export async function POST() {
  const secret = speakeasy.generateSecret({ length: 20, name: "FindYourGame" });
  const svg = await QRCode.toString(secret.otpauth_url!, { type: "svg" });
  return NextResponse.json({ ok: true, svg, base32: secret.base32 });
}
