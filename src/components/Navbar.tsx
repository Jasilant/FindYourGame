'use client';

import React from 'react';
import Link from 'next/link';
import SettingsMenu from '@/components/SettingsMenu';
import { useSession } from 'next-auth/react';
import NavDropdown from '@/components/NavDropdown';

export default function Navbar() {
  const { status } = useSession();
  const loggedIn = status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex min-w-[160px] items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-orange-500">FindYourGame</span>
          </Link>
        </div>

        {/* Navigation mit Hover-Dropdowns */}
        <nav className="flex flex-1 items-center justify-center gap-1">
          <Link href="/" className="rounded-lg px-3 py-1.5 hover:bg-white/5">Home</Link>

          {/* RELEASES */}
          <NavDropdown
            label="Releases"
            items={[
              { name: 'Upcoming',     href: '/releases?tab=upcoming' },
              { name: 'This Week',    href: '/releases?range=week' },
              { name: 'This Month',   href: '/releases?range=month' },
              { name: 'Calendar',     href: '/releases?view=calendar' },
              { name: 'New on PC',    href: '/releases?platform=pc' },
            ]}
          />

          {/* POPULAR */}
          <NavDropdown
            label="Popular"
            items={[
              { name: 'Best of Year', href: '/popular?sort=best-of-year' },
              { name: 'Top Rated',    href: '/popular?sort=top-rated' },
              { name: 'Trending',     href: '/popular?sort=trending' },
              { name: 'All Time',     href: '/popular?sort=all-time' },
              { name: 'Indie Hits',   href: '/popular?tag=indie' },
            ]}
          />

          {/* PLATFORMS */}
          <NavDropdown
            label="Platforms"
            items={[
              { name: 'PC',          href: '/platforms?platform=pc' },
              { name: 'PlayStation', href: '/platforms?platform=playstation' },
              { name: 'Xbox',        href: '/platforms?platform=xbox' },
              { name: 'Switch',      href: '/platforms?platform=switch' },
              { name: 'Mobile',      href: '/platforms?platform=mobile' },
            ]}
          />

          {/* GENRES */}
          <NavDropdown
            label="Genres"
            items={[
              { name: 'Action',    href: '/genres?genre=action' },
              { name: 'Adventure', href: '/genres?genre=adventure' },
              { name: 'RPG',       href: '/genres?genre=rpg' },
              { name: 'Shooter',   href: '/genres?genre=shooter' },
              { name: 'Strategy',  href: '/genres?genre=strategy' },
              { name: 'Simulation',href: '/genres?genre=simulation' },
              { name: 'Sports',    href: '/genres?genre=sports' },
              { name: 'Racing',    href: '/genres?genre=racing' },
              { name: 'Horror',    href: '/genres?genre=horror' },
              { name: 'Survival',  href: '/genres?genre=survival' },
              { name: 'Indie',     href: '/genres?genre=indie' },
              { name: 'Puzzle',    href: '/genres?genre=puzzle' },
            ]}
          />
        </nav>

        {/* Rechts */}
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
