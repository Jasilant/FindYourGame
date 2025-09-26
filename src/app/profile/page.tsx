'use client';

import React, { useEffect, useState } from 'react';
import RequireAuth from '@/components/RequireAuth';
import { USER_KEY } from '@/lib/auth';

type User = {
  displayName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const form = new FormData(e.currentTarget);
    const updated: User = {
      displayName: String(form.get('displayName') || '').trim(),
      email: String(form.get('email') || '').trim(),
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      setUser(updated);
      setMsg('Profil aktualisiert (Demo).');
    } catch { setMsg('Fehler beim Speichern.'); }
  }

  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPwd = String(form.get('newPwd') || '');
    const confirm = String(form.get('confirm') || '');
    if (newPwd.length < 8) { setPwdMsg('Passwort muss mind. 8 Zeichen haben.'); return; }
    if (newPwd !== confirm) { setPwdMsg('Passwörter stimmen nicht überein.'); return; }
    await new Promise(r => setTimeout(r, 350));
    setPwdMsg('Passwort geändert (Demo).');
    (e.target as HTMLFormElement).reset();
  }

  if (!user) {
    return (
      <RequireAuth>
        <main className="mx-auto max-w-3xl px-4 py-12"><p>Lade…</p></main>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-extrabold">Profil</h1>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-4">
          <h2 className="mb-3 text-xl font-bold">Konto-Informationen</h2>
          <form onSubmit={saveProfile} className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm opacity-80">Anzeigename</label>
              <input name="displayName" defaultValue={user.displayName}
                     className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400"/>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-80">E-Mail</label>
              <input name="email" type="email" defaultValue={user.email}
                     className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400"/>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm opacity-70">
              <div><span className="opacity-60">Erstellt: </span>{new Date(user.createdAt).toLocaleString()}</div>
              <div><span className="opacity-60">Zuletzt aktualisiert: </span>{new Date(user.updatedAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">Speichern</button>
              {msg && <span className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">{msg}</span>}
            </div>
          </form>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-4">
          <h2 className="mb-3 text-xl font-bold">Passwort ändern</h2>
          <form onSubmit={changePassword} className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm opacity-80">Neues Passwort</label>
              <input name="newPwd" type="password"
                     className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400"/>
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-80">Passwort bestätigen</label>
              <input name="confirm" type="password"
                     className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400"/>
            </div>
            <button className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">Passwort speichern</button>
            {pwdMsg && <p className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">{pwdMsg}</p>}
          </form>
        </section>
      </main>
    </RequireAuth>
  );
}
