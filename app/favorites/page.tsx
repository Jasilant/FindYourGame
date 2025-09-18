'use client';

import { useEffect, useMemo, useState } from "react";
import { generateMockGames } from "../../lib/mockGames";

const ALL = generateMockGames(150);
const FAV_KEY = "fy_favorites";

export default function FavoritesPage() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      setIds(raw ? (JSON.parse(raw) as number[]) : []);
    } catch { setIds([]); }
  }, []);

  const list = useMemo(() => ALL.filter(g => ids.includes(g.id)), [ids]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Favoriten</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(g => (
          <article key={g.id} className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs opacity-80">
              <span className="rounded-full border border-white/15 px-2 py-0.5">{g.genre.toUpperCase()}</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5">{g.platform.toUpperCase()}</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5">Release {g.release}</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5">Rating {g.rating}</span>
            </div>
          </article>
        ))}
        {list.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/12 p-8 text-center opacity-80">
            Du hast noch keine Favoriten. Geh zu <a className="underline" href="/browse">Browse</a> und füge welche hinzu.
          </div>
        )}
      </div>
    </main>
  );
}
