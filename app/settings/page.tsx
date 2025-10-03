'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';

function SettingsInner() {
  const session = useSession(); // nicht destructuren, damit undefined keine Exceptions wirft
  const status = session?.status;
  const loggedIn = status === 'authenticated';

  if (status === 'loading') {
    return <div className="p-6 opacity-80">Lade…</div>;
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-3 text-2xl font-extrabold text-orange-500">Einstellungen</h1>
        <p className="opacity-80">Bitte melde dich an, um deine persönlichen Einstellungen zu verwalten.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/login?redirect=/settings" className="rounded-xl border border-white/15 px-4 py-2 hover:border-orange-400">
            Anmelden
          </Link>
          <Link href="/register?redirect=/settings" className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">
            Registrieren
          </Link>
        </div>
      </main>
    );
  }

  // Eingeloggt: hier bleibt/kehrt dein bestehender Settings-Inhalt hin
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-orange-500">Einstellungen</h1>

      {/* Platzhalter – ersetze diesen Block mit deinem bisherigen Settings-UI */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="opacity-80">
          Hier verwaltest du Sprache, Theme, Zeitzone, Benachrichtigungen, Datenschutz, Rechtliches usw.
        </p>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="p-6 opacity-80">Lade…</div>}>
      <SettingsInner />
    </Suspense>
  );
}
