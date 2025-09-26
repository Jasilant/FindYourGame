'use client';

import { useState } from 'react';

export default function CookieSettings() {
  const [necessary] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-3 md:px-6 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Cookie-Einstellungen (Platzhalter)</h1>
      <p className="text-sm text-zinc-400 mb-4">Passe deine Einwilligungen an.</p>

      <label className="flex items-center justify-between gap-3 py-2">
        <span className="text-sm text-zinc-300">Notwendig</span>
        <input type="checkbox" checked={necessary} readOnly />
      </label>
      <label className="flex items-center justify-between gap-3 py-2">
        <span className="text-sm text-zinc-300">Analytics</span>
        <input type="checkbox" checked={analytics} onChange={(e)=>setAnalytics(e.target.checked)} />
      </label>
      <label className="flex items-center justify-between gap-3 py-2">
        <span className="text-sm text-zinc-300">Marketing</span>
        <input type="checkbox" checked={marketing} onChange={(e)=>setMarketing(e.target.checked)} />
      </label>

      <div className="mt-4 flex gap-2">
        <button className="rounded-xl px-4 py-2 bg-orange-500 text-black font-semibold hover:bg-orange-400">Speichern</button>
        <button className="rounded-xl px-4 py-2 bg-white/10 text-white hover:bg-white/20">Alle ablehnen</button>
        <button className="rounded-xl px-4 py-2 bg-white/10 text-white hover:bg-white/20">Alle akzeptieren</button>
      </div>
    </main>
  );
}
