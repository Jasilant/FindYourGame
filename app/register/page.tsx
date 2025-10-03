'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function RegisterInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');
    const confirm = String(fd.get('confirm') || '');
    const accept = fd.get('accept') === 'on';
    const newsletter = fd.get('newsletter') === 'on';
    const captcha = fd.get('captcha') === 'on'; // Platzhalter – später echtes Captcha

    if (password !== confirm) {
      setLoading(false);
      setErr('Passwörter stimmen nicht überein.');
      return;
    }
    if (!accept) {
      setLoading(false);
      setErr('Bitte akzeptiere die AGB, um fortzufahren.');
      return;
    }
    if (!captcha) {
      setLoading(false);
      setErr('Bitte bestätige, dass du kein Roboter bist.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, newsletter }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Registrierung fehlgeschlagen.');
      }

      setOk('Registrierung erfolgreich. Bitte prüfe deine E-Mail (Willkommensmail).');
      setTimeout(() => router.push(`/login?redirect=${encodeURIComponent(redirect)}`), 900);
    } catch (e: any) {
      setErr(e.message || 'Registrierung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-orange-500">Registrieren</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input name="email" type="email" required placeholder="E-Mail"
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none placeholder-white/40" />
        <input name="password" type="password" required minLength={8} placeholder="Passwort (min. 8 Zeichen)"
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none placeholder-white/40" />
        <input name="confirm" type="password" required minLength={8} placeholder="Passwort bestätigen"
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none placeholder-white/40" />

        <label className="flex items-center gap-2 text-sm">
          <input name="accept" type="checkbox" className="accent-orange-500" />
          <span>
            Ich akzeptiere die <Link href="/terms" className="text-orange-400 hover:underline">AGB</Link> und habe die{' '}
            <Link href="/privacy-policy" className="text-orange-400 hover:underline">Datenschutzerklärung</Link> gelesen.
          </span>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input name="newsletter" type="checkbox" className="accent-orange-500" />
          <span>Newsletter abonnieren (optional)</span>
        </label>

        {/* Captcha Platzhalter */}
        <label className="mt-1 flex items-center gap-2 text-xs opacity-80">
          <input name="captcha" type="checkbox" className="accent-orange-500" />
          <span>Ich bin kein Roboter</span>
        </label>

        <button type="submit" disabled={loading}
          className="mt-1 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400 disabled:opacity-60">
          {loading ? 'Registriere…' : 'Registrieren'}
        </button>

        {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">{err}</div>}
        {ok && <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{ok}</div>}
      </form>

      <p className="mt-4 text-sm opacity-80">
        Schon ein Konto?{' '}
        <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-orange-400 hover:underline">
          Jetzt anmelden
        </Link>
      </p>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-6 opacity-80">Lade…</div>}>
      <RegisterInner />
    </Suspense>
  );
}
