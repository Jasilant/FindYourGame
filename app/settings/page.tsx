'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const LS_LANG = 'findyourgame:lang';
const LS_SETTINGS = 'findyourgame:settings';

type SettingsData = {
  lang: string;
  theme: 'system' | 'dark' | 'light';
  timezone: string;
  emailNews: boolean;
  emailProduct: boolean;
  privacyPublicProfile: boolean;
  privacySearchIndex: boolean;
  trackingOptOut: boolean;
};

const DEFAULTS: SettingsData = {
  lang: 'de',
  theme: 'dark',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Zurich',
  emailNews: true,
  emailProduct: false,
  privacyPublicProfile: true,
  privacySearchIndex: false,
  trackingOptOut: false,
};

const LANGS = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: 'Mandarin (中文)' },
  { code: 'ja', label: '日本語' },
];

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData>(DEFAULTS);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_SETTINGS);
      if (raw) setData(JSON.parse(raw));
      const l = localStorage.getItem(LS_LANG);
      if (l) setData(prev => ({ ...prev, lang: l }));
    } catch {}
  }, []);

  function save() {
    try {
      localStorage.setItem(LS_SETTINGS, JSON.stringify(data));
      localStorage.setItem(LS_LANG, data.lang);
      setMsg('Einstellungen gespeichert (Demo).');
      setTimeout(() => setMsg(null), 1500);
    } catch {
      setMsg('Speichern fehlgeschlagen.');
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold">Einstellungen</h1>

      {/* Sprache */}
      <section className="rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Sprache</h2>
        <select
          className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-orange-400"
          value={data.lang}
          onChange={(e) => setData({ ...data, lang: e.target.value })}
        >
          {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </section>

      {/* Darstellung */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Darstellung</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(['system','dark','light'] as const).map(opt => (
            <label key={opt} className="flex items-center gap-3 rounded-xl border border-white/15 p-3 hover:border-orange-400">
              <input type="radio" name="theme" checked={data.theme===opt} onChange={()=>setData({...data, theme: opt})}/>
              <span className="capitalize">{opt}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Zeitzone */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Zeitzone</h2>
        <input
          className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-orange-400"
          value={data.timezone}
          onChange={(e)=>setData({...data, timezone: e.target.value})}
          placeholder="Europe/Zurich"
        />
      </section>

      {/* Benachrichtigungen */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Benachrichtigungen</h2>
        <label className="mb-2 flex items-center gap-3">
          <input type="checkbox" checked={data.emailNews} onChange={e=>setData({...data, emailNews: e.target.checked})}/>
          <span>E-Mail: News & Updates</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={data.emailProduct} onChange={e=>setData({...data, emailProduct: e.target.checked})}/>
          <span>E-Mail: Angebote & Aktionen</span>
        </label>
      </section>

      {/* Datenschutz */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-black/50 p-4">
        <h2 className="mb-3 text-xl font-bold">Datenschutz</h2>
        <label className="mb-2 flex items-center gap-3">
          <input type="checkbox" checked={data.privacyPublicProfile} onChange={e=>setData({...data, privacyPublicProfile: e.target.checked})}/>
          <span>Öffentliches Profil sichtbar</span>
        </label>
        <label className="mb-2 flex items-center gap-3">
          <input type="checkbox" checked={data.privacySearchIndex} onChange={e=>setData({...data, privacySearchIndex: e.target.checked})}/>
          <span>Profil in interner Suche auffindbar</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={data.trackingOptOut} onChange={e=>setData({...data, trackingOptOut: e.target.checked})}/>
          <span>Tracking/Analytics deaktivieren (Opt-Out)</span>
        </label>

        <div className="mt-3 text-sm opacity-80">
          Weitere Infos: <Link href="/privacy-policy" className="text-orange-400 hover:underline">Datenschutzerklärung</Link> · <Link href="/cookie-settings" className="text-orange-400 hover:underline">Cookie-Einstellungen</Link> · <Link href="/terms" className="text-orange-400 hover:underline">AGB</Link> · <Link href="/imprint" className="text-orange-400 hover:underline">Impressum</Link>
        </div>
      </section>

      <div className="mt-6 flex gap-3">
        <button onClick={save} className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">Speichern</button>
        {msg && <span className="self-center rounded-xl border border-white/15 bg-white/5 px-3
