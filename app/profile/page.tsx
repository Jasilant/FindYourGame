'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('PlayerOne');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [twoFA, setTwoFA] = useState(false);

  const onSaveBasic = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profil aktualisiert (Demo).');
  };
  const onChangePw = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) return alert('Neue Passwörter stimmen nicht überein.');
    alert('Passwort geändert (Demo).');
  };
  const onDownload = () => {
    const data = { email, username, twoFA, exportAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'findyourgame-account-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  const onDelete = () => {
    if (!confirm('Willst du dein Konto wirklich löschen? Dies ist endgültig.')) return;
    alert('Konto-Löschung angefragt (Demo).');
  };

  return (
    <main className="mx-auto max-w-3xl px-3 md:px-6 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Profil</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Aktualisiere deine Anmeldedaten und verwalte Sicherheits- & Datenschutz-Optionen.
      </p>

      <section className="mb-8 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
        <h2 className="text-white font-semibold mb-3">Basisdaten</h2>
        <form onSubmit={onSaveBasic} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-zinc-300">E-Mail</span>
            <input
              className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-zinc-300">Nutzername</span>
            <input
              className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <div className="flex gap-2">
            <button type="submit" className="rounded-xl px-4 py-2 bg-orange-500 text-black font-semibold hover:bg-orange-400">Speichern</button>
            <button type="button" onClick={onDownload} className="rounded-xl px-4 py-2 bg-white/10 text-white hover:bg-white/20">Daten exportieren (JSON)</button>
          </div>
        </form>
      </section>

      <section className="mb-8 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
        <h2 className="text-white font-semibold mb-3">Passwort ändern</h2>
        <form onSubmit={onChangePw} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-zinc-300">Aktuelles Passwort</span>
            <input className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10" type="password" value={currentPw} onChange={(e)=>setCurrentPw(e.target.value)} required />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">Neues Passwort</span>
              <input className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10" type="password" value={newPw} onChange={(e)=>setNewPw(e.target.value)} required />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">Neues Passwort bestätigen</span>
              <input className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10" type="password" value={confirmPw} onChange={(e)=>setConfirmPw(e.target.value)} required />
            </label>
          </div>
          <button type="submit" className="rounded-xl px-4 py-2 bg-orange-500 text-black font-semibold hover:bg-orange-400">Passwort ändern</button>
        </form>
      </section>

      <section className="mb-8 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
        <h2 className="text-white font-semibold mb-3">Sicherheit</h2>
        <label className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-white">Zwei-Faktor-Authentifizierung (2FA)</div>
            <div className="text-xs text-zinc-400">Empfohlen für zusätzlichen Schutz.</div>
          </div>
          <input type="checkbox" checked={twoFA} onChange={(e)=>setTwoFA(e.target.checked)} />
        </label>
        <div className="mt-3 text-xs text-zinc-400">Sitzungen & Geräte-Verwaltung kommt mit echtem Login.</div>
      </section>

      <section className="mb-8 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
        <h2 className="text-white font-semibold mb-3">Datenschutz & Rechte</h2>
        <div className="grid gap-2">
          <Link className="underline text-sm text-zinc-200" href="/privacy-policy">Datenschutzerklärung</Link>
          <Link className="underline text-sm text-zinc-200" href="/terms">AGB / Nutzungsbedingungen</Link>
          <Link className="underline text-sm text-zinc-200" href="/imprint">Impressum</Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={onDownload} className="rounded-xl px-3 py-2 bg-white/10 text-white hover:bg-white/20 text-sm">Kopie meiner Daten</button>
          <button onClick={onDelete} className="rounded-xl px-3 py-2 bg-red-600 text-white hover:bg-red-500 text-sm">Konto löschen</button>
        </div>
        <p className="text-xs text-zinc-400 mt-3">
          Hinweis: EU (GDPR) & Schweiz (revDSG) – Rechte auf Auskunft, Berichtigung, Löschung, Portabilität. Echte Umsetzung folgt mit Backend.
        </p>
      </section>
    </main>
  );
}

