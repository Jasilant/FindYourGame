'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Game = {
  id: number;
  name: string;
  released?: string;
  rating?: number;
  platforms?: string[];
};

// Die eigentliche Logik in eine Client-Komponente auslagern:
function FilterContent() {
  const sp = useSearchParams(); // <- darf in Client-Komponente stehen
  const q = (sp.get('q') ?? '').trim();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    setLoading(true);
    const t = setTimeout(() => {
      const mocked: Game[] = Array.from({ length: 9 }).map((_, i) => ({
        id: i + 1,
        name: `${q} – Ergebnis ${i + 1}`,
        released: '—',
        rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
        platforms: ['PC', 'PS5', 'Switch'].slice(0, 1 + (i % 3)),
      }));
      setResults(mocked);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Ergebnisse für „{q || '—'}“</h1>

        {loading && <p className="mt-4 text-zinc-400">Suche läuft…</p>}

        {!loading && q && results.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((g) => (
              <article key={g.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <div className="aspect-[16/9] flex items-center justify-center text-zinc-500 text-xs">Kein Bild</div>
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

        {!loading && q && results.length === 0 && (
          <p className="mt-6 text-zinc-400">Keine Treffer gefunden.</p>
        )}
      </section>
    </main>
  );
}

// WICHTIG: Seite mit Suspense um die Client-Komponente
export default function FilterPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black text-white"><div className="p-6 text-zinc-400">Lade Filter…</div></main>}>
      <FilterContent />
    </Suspense>
  );
}
