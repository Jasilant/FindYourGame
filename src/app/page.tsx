'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';
import { LogIn, Menu, X, Search, XCircle, Loader2 } from 'lucide-react';

type Game = {
  id: number;
  name: string;
  released?: string;
  rating?: number;
  background_image?: string;
  platforms?: string[];
};

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Ergebnis-Status (A)
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Game[]>([]);

  // Suche (B: Button navigiert zu /filter)
  function submitSearch() {
    if (!q.trim()) return;
    router.push(`/filter?q=${encodeURIComponent(q)}` as Route);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') submitSearch();
    if (e.key === 'Escape') setQ('');
  }

  // Keyboard-Shortcut: "/" fokussiert das Feld (C)
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

  // Tabs-Helper (typedRoutes)
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

  // Dummy-Vorschläge (lokal)
  const suggestions = ['Zelda: Tears of the Kingdom', 'Minecraft', 'Elden Ring', 'Fortnite', 'Baldur’s Gate 3']
    .filter(item => item.toLowerCase().includes(q.toLowerCase()));

  // Live-Dummy-Ergebnisse unter dem Hero (A)
  useEffect(() => {
    let t: any;
    if (!q.trim()) {
      setResults([]);
    } else {
      setLoading(true);
      t = setTimeout(() => {
        // Dummy: Erzeuge 6 Karten aus Suggestions (später API)
        const base = suggestions.length ? suggestions : ['Kein Ergebnis'];
        const mocked: Game[] = base.slice(0, 6).map((name, i) => ({
          id: i + 1,
          name,
          released: '—',
          rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
          background_image: undefined,
          platforms: ['PC', 'PS5', 'Switch'].slice(0, 1 + (i % 3)),
        }));
        setResults(mocked);
        setLoading(false);
      }, 300); // debounce
    }
    return () => t && clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Links: Brand */}
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

        {/* Suchfeld */}
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
            {/* Clear */}
            {q && (
              <button
                type="button"
                aria-label="Eingabe löschen"
                className="rounded-lg p-1 text-zinc-400 hover:text-white hover:bg-white/10 transition"
                onClick={() => setQ('')}
              >
                <XCircle size={20} />
              </button>
            )}
            <button
              onClick={submitSearch}
              className={`shrink-0 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold hover:bg-orange-700 transition active:scale-95 ${!q && !hasFocus ? 'animate-pulse' : ''}`}
            >
              Suchen
            </button>
          </div>

          {/* Vorschlagsliste (lokal) */}
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
          {['RPG', 'Switch', 'Co-op', 'Indie'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setQ(tag);
                submitSearch();
              }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* RESULTS GRID (A) */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {loading && (
          <div className="flex items-center gap-2 text-zinc-400">
            <Loader2 className="animate-spin" size={18} /> Suche läuft…
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((g) => (
              <article key={g.id} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <div className="relative aspect-[16/9] flex items-center justify-center text-zinc-500">
                  {/* Placeholder-Bild (später echte Bilder via API) */}
                  <span className="text-xs">Kein Bild</span>
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold text-white">{g.name}</h3>
                  <div className="mt-1 text-xs text-zinc-400">
                    Release: {g.released ?? '—'} {typeof g.rating === 'number' && <span className="ml-2">★ {g.rating}</span>}
                  </div>
                  {g.platforms && g.platforms.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {g.platforms.slice(0, 5).map((p, i) => (
                        <span key={i} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
