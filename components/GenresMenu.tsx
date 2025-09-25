'use client';

import { useState } from "react";
import Link from "next/link";
import type { CanonicalGenre } from "../lib/genres";

const GENRES: { slug: CanonicalGenre; label: string }[] = [
  { slug: "action",           label: "Action" },
  { slug: "adventure",        label: "Abenteuer" },
  { slug: "rpg",              label: "RPG" },
  { slug: "shooter",          label: "Shooter" },
  { slug: "strategy",         label: "Strategie" },
  { slug: "simulation",       label: "Simulation" },
  { slug: "sports",           label: "Sport & Racing" },
  { slug: "platformer",       label: "Plattformer" },
  { slug: "puzzle",           label: "Puzzle" },
  { slug: "horror-survival",  label: "Horror / Survival" },
  { slug: "fighting",         label: "Fighting" },
  { slug: "indie",            label: "Indie" },
  { slug: "free",             label: "Kostenlos" }
];

export default function GenresMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-pointer opacity-90 hover:opacity-100">
        Genres
      </span>

      {open && (
        <div className="absolute left-1/2 z-50 mt-3 w-[min(92vw,760px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black p-4 text-white shadow-xl ring-1 ring-white/15">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {GENRES.map((g) => (
              <Link
                key={g.slug}
                href={`/genres/${g.slug}`}
                className="rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
