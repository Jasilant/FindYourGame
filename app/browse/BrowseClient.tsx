'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Game } from "../../lib/mockGames";
import { generateMockGames } from "../../lib/mockGames";

const ALL = generateMockGames(150);
const PAGE_SIZE = 12;
const FAV_KEY = "fy_favorites";

function useFavorites() {
  const [fav, setFav] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(FAV_KEY);
      return new Set(raw ? JSON.parse(raw) as number[] : []);
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(fav)));
  }, [fav]);

  const toggle = (id: number) =>
    setFav(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return { fav, toggle };
}

export default function BrowseClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const { fav, toggle } = useFavorites();

  // URL-Params
  const q = (sp.get("q") ?? "").toLowerCase().trim();
  const genre = (sp.get("genre") ?? "").toLowerCase().trim();
  const platform = (sp.get("platform") ?? "").toLowerCase().trim();
  const sort = (sp.get("sort") ?? "popularity").toLowerCase().trim();

  // Filter + Sort
  const filtered = useMemo(() => {
    const base = ALL.filter(g => {
      const okQ = !q || g.title.toLowerCase().includes(q);
      const okG = !genre || g.genre === genre;
      const okP = !platform || g.platform === platform;
      return okQ && okG && okP;
    });
    switch (sort) {
      case "rating":    return base.slice().sort((a,b)=>b.rating-a.rating);
      case "release":   return base.slice().sort((a,b)=> (a.release<b.release?1:-1));
      default:          return base; // popularity (mock)
    }
  }, [q, genre, platform, sort]);

  // Infinite Scroll
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => setVisible(PAGE_SIZE), [q, genre, platform, sort]); // reset on filters
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(v => Math.min(v + PAGE_SIZE, filtered.length));
      }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  // URL-Update helper
  function setParam(key: string, value: string) {
    const params = new URLSearchParams(sp.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/browse?${params.toString()}`);
  }

  const slice = filtered.slice(0, visible);
  const genres: Array<Game["genre"]> = ["rpg","action","adventure","indie","racing"];
  const platforms: Array<Game["platform"]> = ["pc","ps5","xbox","switch"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Browse</h1>

      {/* Controls */}
      <div className="grid gap-3 md:grid-cols-4">
        <input
          defaultValue={q}
          placeholder="Suche…"
          className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3"
          onBlur={(e)=> setParam("q", e.target.value)}
        />
        <select
          value={genre}
          onChange={(e)=> setParam("genre", e.target.value)}
          className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3"
        >
          <option value="">Genre: alle</option>
          {genres.map(g => <option key={g} value={g}>{g.toUpperCase()}</option>)}
        </select>
        <select
          value={platform}
          onChange={(e)=> setParam("platform", e.target.value)}
          className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3"
        >
          <option value="">Plattform: alle</option>
          {platforms.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e)=> setParam("sort", e.target.value)}
          className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3"
        >
          <option value="popularity">Sort: Popularity</option>
          <option value="release">Sort: Release</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {/* Active filters */}
      <div className="text-sm opacity-80">
        <span className="font-semibold">Aktiv:</span>{" "}
        {[["q",q],["genre",genre],["platform",platform],["sort",sort]]
          .filter(([,v])=>v).map(([k,v])=>`${k}=${v}`).join(" • ") || "Keine"}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map(g => (
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

        {slice.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/12 p-8 text-center opacity-80">
            Keine Treffer – passe deine Filter an.
          </div>
        )}
      </div>

      {/* Infinite Scroll sentinel */}
      <div ref={sentinelRef} className="h-10" />

      {/* Ende-Hinweis */}
      {visible >= filtered.length && filtered.length > 0 && (
        <div className="text-center text-sm opacity-60">Ende erreicht.</div>
      )}
    </div>
  );
}
