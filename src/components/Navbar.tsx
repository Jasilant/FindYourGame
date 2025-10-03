'use client';

import React from 'react';
import Link from 'next/link';
import SettingsMenu from '@/components/SettingsMenu';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { status } = useSession();
  const loggedIn = status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo links */}
        <div className="flex min-w-[160px] items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm-1 5h2v6h-2V7Zm1 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
            </svg>
            <span className="text-lg font-bold text-orange-500">FindYourGame</span>
          </Link>
        </div>

        {/* Tabs zentriert (nur funktionierende Seiten) */}
        <nav className="flex flex-1 items-center justify-center gap-1">
          <Link href="/" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Home</Link>
          <Link href="/releases" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Releases</Link>
          <Link href="/popular" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Popular</Link>
          <Link href="/platforms" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Platforms</Link>
          <Link href="/genres" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Genres</Link>
        </nav>

        {/* Rechts: Favoriten + Settings/Anmelden (wie gehabt) */}
        <div className="flex min-w-[160px] items-center justify-end gap-3">
          <Link
            href="/favorites"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 hover:border-orange-400"
            title="Favoriten"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-7-4.534-9.333-8.2C.8 9.8 2.2 6 6 6c2.133 0 3.4 1.067 4 2 .6-.933 1.867-2 4-2 3.8 0 5.2 3.8 3.333 6.8C19 16.466 12 21 12 21Z" />
            </svg>
          </Link>

          {loggedIn ? (
            <SettingsMenu />
          ) : (
            <>
              <Link href="/login" className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:border-orange-400">
                Login
              </Link>
              <Link href="/register" className="rounded-xl bg-orange-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-orange-400">
                Registrieren
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
