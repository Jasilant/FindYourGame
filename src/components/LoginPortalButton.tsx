'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

/**
 * Zeigt oben rechts einen dezenten "Anmelden"-Button, NUR wenn der User ausgeloggt ist.
 * Keine bestehenden Komponenten werden verändert – rein additiv.
 */
export default function LoginPortalButton() {
  const { status } = useSession();
  const loggedOut = status === 'unauthenticated' || status === 'loading';

  if (!loggedOut) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-16 z-[60] sm:top-4">
      <div className="pointer-events-auto rounded-xl border border-white/15 bg-black/80 backdrop-blur px-3 py-1.5 shadow">
        <Link
          href="/login"
          className="text-sm font-semibold text-orange-400 hover:underline"
        >
          Anmelden
        </Link>
        <span className="mx-1 opacity-40">·</span>
        <Link
          href="/register"
          className="text-sm text-white/80 hover:underline"
        >
          Registrieren
        </Link>
      </div>
    </div>
  );
}
