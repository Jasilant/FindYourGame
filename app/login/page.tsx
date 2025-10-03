'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');
    const res = await signIn('credentials', { email, password, redirect: false, callbackUrl: redirect });
    setLoading(false);
    if (!res) {
      setErr('Unbekannter Fehler.');
      return;
    }
    if (res.error) {
      setErr(res.error === 'CredentialsSignin' ? 'E-Mail oder Passwort falsch.' : res.error);
      return;
    }
    router.push(redirect);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-orange-500">Anmelden</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          type="email"
          required
          placeholder="E-Mail"
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none placeholder-white/40"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Passwort"
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 outline-none placeholder-white/40"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400 disabled:opacity-60"
        >
          {loading ? 'Anmelden…' : 'Anmelden'}
        </button>

        {err && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {err}
          </div>
        )}
      </form>

      <p className="mt-4 text-sm opacity-80">
        Noch kein Konto?{' '}
        <Link href={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-orange-400 hover:underline">
          Jetzt registrieren
        </Link>
      </p>
    </main>
  );
}
