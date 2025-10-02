'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { demoLogin, USER_KEY } from '@/lib/auth';

export default function RegisterPage() {
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
    const confirm = String(form.get('confirm') || '');
    if (password !== confirm) {
      setLoading(false);
      setMsg('Passwörter stimmen nicht überein.');
      return;
    }

    const now = new Date().toISOString();
    try {
      localStorage.setItem(USER_KEY, JSON.stringify({
        displayName: email.split('@')[0] || 'Gamer',
        email,
        createdAt: now,
        updatedAt: now,
      }));
    } catch {}

    await new Promise(r => setTimeout(r, 350));
    demoLogin(email);
    setLoading(false);
    router.replace('/profile');
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold">Registrieren</h1>
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
        <div>
          <label className="mb-1 block text-sm opacity-80">Passwort bestätigen</label>
          <input name="confirm" type="password" required
                 className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400" />
        </div>
        <div className="flex items-center gap-2">
          <input id="tos" name="tos" type="checkbox" required className="h-4 w-4" />
          <label htmlFor="tos" className="text-sm opacity-80">
            Ich akzeptiere die <a href="/terms" className="text-orange-400 hover:underline">AGB</a> &amp; <a href="/privacy-policy" className="text-orange-400 hover:underline">Datenschutz</a>.
          </label>
        </div>
        <button type="submit" disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400 disabled:opacity-60">
          {loading ? 'Bitte warten…' : 'Konto erstellen'}
        </button>
      </form>

      <div className="mt-4 text-sm opacity-80">
        Schon registriert?{' '}
        <a href="/login" className="text-orange-400 hover:underline">Zum Login</a>
      </div>

      {msg && <p className="mt-6 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">{msg}</p>}
    </main>
  );
}
