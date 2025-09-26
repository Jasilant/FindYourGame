'use client';

import React, { useEffect, useState } from 'react';

type User = {
  displayName: string;
  email: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const LS_USER = 'findyourgame:user';

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    displayName: '',
    email: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        setUser(parsed);
      } else {
        // demo default
        const demo: User = {
          displayName: 'Gamer',
          email: 'demo@example.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(LS_USER, JSON.stringify(demo));
        setUser(demo);
      }
    } catch {}
  }, []);

  function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const displayName = String(form.get('displayName') || '').trim();
    const email = String(form.get('email') || '').trim();
    const updated: User = {
      displayName,
      email,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(LS_USER, JSON.stringify(updated));
      setUser(updated);
      setMsg('Profil aktualisiert (Demo).');
    } catch {
      setMsg('Fehler beim Speichern.');
    }
  }

  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPwd = String(form.get('newPwd') || '');
    const confirm = String(form.get('confirm') || '');
    if (newPwd.length < 8) { setPwdMsg('Passwort muss mind. 8 Zeichen haben.'); return; }
    if (newPwd !== confirm) { setPwdMsg('Passwörter stimmen nicht überein.'); return; }
    await new Promise(r => setTimeout(r, 400));
    setPwdMsg('Passwort geändert (Demo).');
    (e.target as HTMLFormElement).reset();
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(user, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'findyourgame-account-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function deleteAccount() {
    if (!confirm('Konto wirklich löschen? Dies ist eine Demo-Aktion.')) return;
    try {
      localStorage.removeItem(LS_USER);
      setMsg('Konto-Daten lokal gelöscht (Demo).');
    } catch {
      setMsg('Löschen fehlgeschlagen.');
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold">Profil</h1>

      <section className="rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Konto-Informationen</h2>
        <p className="mb-4 text-sm opacity-80">
          Hier siehst du alle derzeit gespeicherten Kontodaten (Demo). Später werden diese Daten aus dem Backend geladen.
        </p>

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
            <button type="button" onClick={exportData}
                    className="rounded-xl border border-white/15 px-4 py-2 hover:border-orange-400">Daten exportieren</button>
            <button type="button" onClick={deleteAccount}
                    className="rounded-xl border border-red-400/40 px-4 py-2 text-red-400 hover:bg-red-500/10">Konto löschen</button>
          </div>

          {msg && <p className="mt-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm">{msg}</p>}
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
  );
}
