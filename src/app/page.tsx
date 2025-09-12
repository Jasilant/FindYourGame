'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { LogIn, Menu, X, Search } from 'lucide-react';

export default function Home() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Suche
  function submitSearch() {
    if (!q.trim()) return;
    alert(`Suche: ${q}`); // TODO: später echte Suche anbinden
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submitSearch();
  }

  // Keyboard-Shortcut: "/" fokussiert das Feld
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

  // Tabs-Helper mit typedRoutes
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

  // Beliebte Tags (klickbar)
  const popularTags = ['RPG', 'Switch', 'Co-op', 'Indie'];
  function clickTag(tag: string) {
    setQ(tag);
    submitSearch();
  }

  // Dummy-Vorschläge (lokal gefiltert)
  const suggestions = ['Zelda: Tears of the Kingdom', 'Minecraft', 'Elden Ring', 'Fortnite', 'Baldur’s Gate 3']
    .filter(item => item.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Links: NUR Brand-Text */}
          <Link href={"/" as Route} className="text-lg font-bold tracking-wide">
            FindYourGame<span className="text-orange-500">.ch</span>
          </Link>

          {/* Mitte: Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {tab('/' as Route, 'Home')}
            {tab('/news' as Route, 'News')}
            {tab('/filter' as Route, 'Spiele-Filter')}
          </nav>

          {/* Rechts: Login + Burger (mobil) */}
          <div className="flex items-center gap-2">
            <Link
              href={"/login" as Route}
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
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href={"/" as Route}>Home</Link>
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href={"/news" as Route}>News</Link>
              <Link onClick={() => setMobileOpen(false)} className="py-2 text-zinc-200" href={"/filter" as Route}>Spiele-Filter</Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO / Suche */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          Entdecke deine <span className="text-orange-500">Lieblings</span>spiele!
        </h1>
        <p className="mb-10 max-w-2xl text-zinc-300">
          Suche nach Titel, Genre oder Plattform – finde sofort dein Match.
        </p>

        {/* Großes Suchfeld mit Glow & Dropdown */}
        <div className="relative w-full rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur shadow-2xl">
          <div className="flex items-center gap-2 rounded-xl bg-black/50 p-2 transition focus-within:ring-2 focus-within:ring-orange-500/70 focus-within:shadow-[0_0_15px_rgba(255,100,0,0.5)]">
            <Search className="ml-1 shrink-0 text-zinc-400" size={22} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              placeholder="Finde dein Spiel…  (Tipp: Drücke '/' zum Fokus)"
              className="w-full bg-transparent px-3 py-3 text-base text-white placeholder:text-zinc-500 focus:outline-none"
              aria-label="Spielsuche"
            />
            <button
              onClick={submitSearch}
              className={`shrink-0 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold hover:bg-orange-700 transition active:scale-95 ${!q && !hasFocus ? 'animate-pulse' : ''}`}
            >
              Suchen
            </button>
          </div>

          {/* Vorschlagsliste */}
          {q && (
            <ul className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-black/90 border border-white/10 shadow-lg divide-y divide-white/10">
              {suggestions.length ? suggestions.map((item, i) => (
                <li
                  key={i}
                  className="px-4 py-2 text-left text-sm text-zinc-200 hover:bg-white/10 cursor-pointer"
                  onClick={() => {
                    setQ(item);
                    submitSearch();
                  }}
                >
                  {item}
                </li>
              )) : (
                <li className="px-4 py-3 text-left text-sm text-zinc-400">
                  Keine Treffer. Versuch „RPG“, „Switch“, „Indie“ …
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Beliebt: klickbare Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-zinc-400 mr-2">Beliebt:</span>
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => clickTag(tag)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-xs text-zinc-500">
          Bereits <span className="text-zinc-300 font-medium">5.000+</span> Spieler haben hier ihr nächstes Game gefunden.
        </div>
      </section>
    </main>
  );
}
