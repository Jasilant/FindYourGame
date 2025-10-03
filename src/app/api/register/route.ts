import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, newsletter, acceptedTerms } = await req.json();

    if (!acceptedTerms) {
      return NextResponse.json({ error: "AGB müssen akzeptiert werden." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        newsletter: !!newsletter,
        acceptedTerms: true,
      },
    });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Fehler bei Registrierung" }, { status: 500 });
  }
}
