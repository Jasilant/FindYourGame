'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { LogIn, Menu, X, Search } from 'lucide-react';

export default function Home() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  function submitSearch() {
    if (!q.trim()) return;
    alert(`Suche: ${q}`); // TODO: später echte Suche
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submitSearch();
  }
  useEffect(() => {
    const onSlash = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onSlash);
    return () => window.removeEventListener('keydown', onSlash);
  }, []);

  const tab = (href: Route, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`text-sm transition ${active ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Links: Logo (Maskottchen später) + Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="FindYourGame"
              width={40}
              height={40}
              className="rounded-lg ring-1 ring-white/10"
              priority
            />
            <Link href="/" className="text-lg font-bold tracking-wide">
              FindYourGame<span className="text-orange-500">.ch</span>
            </Link>
          </div>

          {/* Mitte: Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {tab('/' as Route, 'Home')}
            {tab('/news' as Route, 'News')}
            {tab('/filter' as Route, 'Spiele-Filter')}
          </nav>

          {/* Rechts: Login + Burger (mobil) */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              aria-label="Login"
              className="rounded-xl p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition"
            >
              <LogIn size={22} />
            </Link>
            <button
              className="md:hidden rounded-xl p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Menü öffnen"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile-Menü */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href="/">Home</Link>
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href="/news">News</Link>
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href="/filter">Spiele-Filter</Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO / Suche */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Finde dein nächstes <span className="text-orange-500">Game</span>
        </h1>
        <p className="mb-10 max-w-2xl text-zinc-300">
          Such nach Titel, Genre oder Plattform – wir zeigen dir die besten Treffer.
        </p>

        {/* Großes Suchfeld */}
        <div className="w-full rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur shadow-2xl">
          <div className="flex items-center gap-2 rounded-xl bg-black/50 p-2 focus-within:ring-2 focus-within:ring-orange-500/70 transition">
            <Search className="ml-1 shrink-0 text-zinc-400" size={22} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Finde dein Spiel…  (Tipp: Drücke '/' zum Fokus)"
              className="w-full bg-transparent px-3 py-3 text-base text-white placeholder:text-zinc-500 focus:outline-none"
              aria-label="Spielsuche"
            />
            <button
              onClick={submitSearch}
              className="shrink-0 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold hover:bg-orange-700 transition"
            >
              Suchen
            </button>
          </div>
        </div>

        <div className="mt-6 text-sm text-zinc-400">
          Beliebt: „RPG“, „Switch“, „Co-op“, „Indie“
        </div>
      </section>
    </main>
  );
}
