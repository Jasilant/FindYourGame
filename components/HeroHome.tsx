'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroHome() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative isolate">
      {/* sanfter Moving-Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pt-10 pb-20 text-center md:gap-7 md:pt-14 md:pb-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
          Entdecke deine <span className="text-orange-500">Lieblings</span>spiele!
        </h1>

        <p className="max-w-3xl text-lg md:text-xl opacity-90">
          Suche nach Titel, Genre oder Plattform – finde sofort dein Match.
        </p>

        {/* Suchleiste */}
        <form action="/browse" method="GET" className="w-full max-w-5xl">
          <div
            className="group flex items-center gap-3 rounded-[22px]
                       border border-white/12 ring-1 ring-white/12 bg-white/5
                       px-6 py-4 md:px-8 md:py-5
                       shadow-[0_22px_70px_rgba(0,0,0,0.55)]
                       transition-all duration-200 hover:-translate-y-[1px]
                       focus-within:ring-2 focus-within:ring-orange-400/40 focus-within:border-orange-400/30"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" className="opacity-70 transition group-hover:opacity-100" aria-hidden="true">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0,0,0,16,9.5,6.5,6.5,0,1,0,9.5,16c1.61,0,3.09-.59,4.23-1.57l.27.28v.79l5,4.99L20.49,19l-4.99-5Zm-6,0C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5,14,7.01,14,9.5,11.99,14,9.5,14Z"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              name="q"
              placeholder="Finde dein Spiel…   (Tipp: Drücke '/' zum Fokus)"
              className="h-12 md:h-14 w-full bg-transparent outline-none placeholder-white/60"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-xl bg-orange-500 px-6 font-semibold text-black
                         transition-transform duration-150 hover:-translate-y-[1px] active:scale-95"
            >
              Suchen
            </button>
          </div>
        </form>

        {/* Beliebt-Chips */}
        <div className="mt-2 flex items-center gap-3 text-sm opacity-90">
          <span>Beliebt:</span>
          <div className="flex flex-wrap gap-2">
            <Link href="/browse?genre=rpg"       className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">RPG</Link>
            <Link href="/browse?platform=switch" className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">Switch</Link>
            <Link href="/browse?sort=rating"     className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">Top Rated</Link>
            <Link href="/browse?genre=indie"     className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">Indie</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
