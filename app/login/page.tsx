'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { demoLogin } from '@/lib/auth';

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    await new Promise(r => setTimeout(r, 300)); // Demo-Delay
    demoLogin(email); // setzt AUTH + ggf. USER
    setLoading(false);
    setMsg('Erfolgreich eingeloggt (Demo).');

    const next = params?.get('next');
    router.replace(next || '/profile');
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold">Anmelden</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm opacity-80">E-Mail</label>
          <input name="email" type="email" required
                 className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400" />
        </div>
        <div>
          <label className="mb-1 block text-sm opacity-80">Passwort</label>
          <input name="password" type="password" required
                 className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400" />
        </div>
        <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400 disabled:opacity-60">
          {loading ? 'Bitte warten…' : 'Einloggen'}
        </button>
      </form>

      <div className="mt-4 text-sm opacity-80">
        Noch kein Konto?{' '}
        <Link href="/register" className="text-orange-400 hover:underline">Jetzt registrieren</Link>
      </div>

      {msg && <p className="mt-6 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">{msg}</p>}
    </main>
  );
}
