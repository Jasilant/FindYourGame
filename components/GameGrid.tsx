'use client';

import { useEffect, useState } from "react";
import type { Game } from "../lib/mockGames";

const FAV_KEY = "fy_favorites";

export default function GameGrid({ games }: { games: Game[] }) {
  const [fav, setFav] = useState<Set<number>>(new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      setFav(new Set(raw ? (JSON.parse(raw) as number[]) : []));
    } catch { setFav(new Set()); }
  }, []);
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(fav)));
  }, [fav]);

  function toggle(id: number) {
    setFav(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {games.map(g => (
        <article key={g.id}
          className="group rounded-2xl border border-white/12 bg-white/[0.03] p-4 transition hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight">{g.title}</h3>
            <button
              aria-label="Favorit umschalten"
              onClick={()=>toggle(g.id)}
              className="rounded-lg border border-white/15 p-1.5 transition hover:bg-white/10"
              title="Favorit"
            >
              {fav.has(g.id) ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fb923c"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" className="opacity-80" fill="currentColor"><path d="M12.1,18.55l-.1.1-.11-.1C7.14,14.24,4,11.39,4,8.5A3.5,3.5,0,0,1,7.5,5,4.38,4.38,0,0,1,12,7.09,4.38,4.38,0,0,1,16.5,5,3.5,3.5,0,0,1,20,8.5C20,11.39,16.86,14.24,12.1,18.55Z"/></svg>
              )}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs opacity-80">
            <span className="rounded-full border border-white/15 px-2 py-0.5">{g.genre.toUpperCase()}</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5">{g.platform.toUpperCase()}</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5">Release {g.release}</span>
            <span className="rounded-full border border-white/15 px-2 py-0.5">Rating {g.rating}</span>
          </div>
        </article>
      ))}
      {games.length === 0 && (
        <div className="col-span-full rounded-2xl border border-white/12 p-8 text-center opacity-80">
          Keine Treffer.
        </div>
      )}
    </div>
  );
}
