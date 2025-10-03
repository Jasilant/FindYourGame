import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/mail";
import { verifyCaptcha } from "@/lib/captcha";

export async function POST(req: Request) {
  try {
    const { email, password, newsletter, acceptedTerms, captchaToken, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-Mail/Passwort fehlen." }, { status: 400 });
    }
    if (!acceptedTerms) {
      return NextResponse.json({ error: "AGB müssen akzeptiert werden." }, { status: 400 });
    }

    const captchaOK = await verifyCaptcha(captchaToken);
    if (!captchaOK) {
      return NextResponse.json({ error: "Captcha fehlgeschlagen." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "E-Mail bereits registriert." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: name || null,
        newsletter: !!newsletter,
        acceptedTerms: true,
      },
      select: { id: true, email: true, name: true },
    });

    await sendWelcomeEmail(user.email, user.name || undefined);

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fehler bei Registrierung" }, { status: 500 });
  }
}
