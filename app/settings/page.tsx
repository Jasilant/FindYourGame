'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUI } from '@/store/ui';

export default function SettingsPage() {
  const { language, setLanguage } = useUI();
  const [theme, setTheme] = useState<'system'|'dark'|'light'>('dark');
  const [timezone, setTimezone] = useState('Europe/Zurich');
  const [emailsNewReleases, setEmailsNewReleases] = useState(true);
  const [emailsDeals, setEmailsDeals] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-3 md:px-6 py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Einstellungen</h1>
      <p className="text-sm text-zinc-400 mb-6">Allgemeine App-Optionen & Datenschutz.</p>

      <Section title="Allgemein">
        <Row label="Sprache">
          <select
            value={language}
            onChange={(e)=>setLanguage(e.target.value as any)}
            className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10"
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="it">Italiano</option>
            <option value="fr">Français</option>
            <option value="zh">中文 (Mandarin)</option>
            <option value="ja">日本語</option>
          </select>
        </Row>
        <Row label="Theme">
          <select
            value={theme}
            onChange={(e)=>setTheme(e.target.value as any)}
            className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10"
          >
            <option value="dark">Dunkel</option>
            <option value="light">Hell</option>
            <option value="system">System</option>
          </select>
        </Row>
        <Row label="Zeitzone">
          <input
            value={timezone}
            onChange={(e)=>setTimezone(e.target.value)}
            className="rounded-xl bg-black/40 text-white px-3 py-2 ring-1 ring-white/10"
          />
        </Row>
      </Section>

      <Section title="Benachrichtigungen">
        <Toggle label="E-Mails: Neue Releases (Wunschlisten & Genres)" checked={emailsNewReleases} onChange={setEmailsNewReleases} />
        <Toggle label="E-Mails: Deals & Rabatte" checked={emailsDeals} onChange={setEmailsDeals} />
      </Section>

      <Section title="Datenschutz & Daten">
        <Toggle label="Marketing-Einwilligung (Newsletter, Aktionen)" checked={marketingConsent} onChange={setMarketingConsent} />
        <div className="text-xs text-zinc-400 mt-2">
          Du kannst Cookies verwalten unter <Link className="underline" href="/cookie-settings">Cookie-Einstellungen</Link>.
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="/profile" className="rounded-xl px-3 py-2 bg-white/10 text-white hover:bg-white/20 text-sm">Kopie meiner Daten / Konto löschen</a>
        </div>
      </Section>

      <Section title="Sicherheit">
        <div className="text-sm text-zinc-300">2FA, aktive Sitzungen & verbundene Logins werden mit echtem Account eingeführt.</div>
      </Section>

      <Section title="Rechtliches">
        <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
          <li><Link className="underline" href="/privacy-policy">Datenschutzerklärung</Link></li>
          <li><Link className="underline" href="/terms">AGB / Nutzungsbedingungen</Link></li>
          <li><Link className="underline" href="/imprint">Impressum (Anbieterkennzeichnung)</Link></li>
        </ul>
        <p className="text-xs text-zinc-400 mt-2">
          FindYourGame.ch richtet sich nach Schweizer revDSG; bei EU-Nutzern auch nach der GDPR.
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
      <h2 className="text-white font-semibold mb-3">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-zinc-300">{label}</span>
      {children}
    </label>
  );
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange:(v:boolean)=>void }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-sm text-zinc-300">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} />
    </label>
  );
}
