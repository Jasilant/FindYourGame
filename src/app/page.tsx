'use client';
import { useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import GameTile from './components/GameTile';

const MOCK = [
  { title: 'Elden Ring', platform: 'PC / PS5 / XSX' },
  { title: 'Baldur\'s Gate 3', platform: 'PC / PS5' },
  { title: 'Hades II', platform: 'PC (Early Access)' },
  { title: 'Starfield', platform: 'PC / XSX' },
];

export default function Page() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (!query) return MOCK;
    const q = query.toLowerCase();
    return MOCK.filter(g => g.title.toLowerCase().includes(q) || g.platform.toLowerCase().includes(q));
  }, [query]);

  return (
    <main>
      <Header />
      <section className="container py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Finde dein <span style={{ color: 'var(--accent)' }}>nächstes Spiel</span>
        </h1>
        <p className="mt-3 opacity-80 max-w-2xl">Suche in allen Spielen der Welt. Orange & Schwarz, fokussiert auf schnelle Treffer.</p>
        <div className="mt-6">
          <SearchBar onSearch={setQuery} />
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map((g, i) => (
            <GameTile key={i} title={g.title} platform={g.platform} />
          ))}
        </div>
      </section>
    </main>
  );
}
