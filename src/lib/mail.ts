import { Resend } from "resend";
import nodemailer from "nodemailer";

const FROM = process.env.MAIL_FROM || "FindYourGame <noreply@example.com>";
const RESEND_KEY = process.env.RESEND_API_KEY || "";

const transporter = nodemailer.createTransport({
  // Dev-Fallback: schreibt nur ins Log, kein echter Versand.
  jsonTransport: true,
});

export async function sendWelcomeEmail(to: string, displayName?: string) {
  const subject = "Herzlich willkommen bei FindYourGame 🎮";
  const html = `<p>Hallo ${displayName || ""}</p>
<p>Willkommen bei <b>FindYourGame</b>! Viel Spaß beim Entdecken neuer Games.</p>
<p>— Dein FYG Team</p>`;

  try {
    if (RESEND_KEY) {
      const resend = new Resend(RESEND_KEY);
      await resend.emails.send({ from: FROM, to, subject, html });
      return { ok: true, provider: "resend" as const };
    } else {
      // Fallback: loggen (Build/Dev bricht nicht)
      const info = await transporter.sendMail({ from: FROM, to, subject, html });
      console.log("[MAIL_SIMULATION]", info.message);
      return { ok: true, provider: "log" as const };
    }
  } catch (e) {
    console.error("[MAIL_ERROR]", e);
    return { ok: false };
  }
}
