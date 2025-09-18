'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"de" | "en">("de");
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href ? "text-orange-500" : "opacity-90 hover:opacity-100";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold">
          <span className="text-white">FindYourGame</span>
          <span className="text-orange-500">.ch</span>
        </Link>

        {/* Mitte: Home, Mega-Menüs, News */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className={`px-2 py-1 rounded-lg transition ${isActive("/")}`}>Home</Link>

          {/* Releases */}
          <div className="relative group">
            <button className="px-2 py-1 rounded-lg opacity-90 transition group-hover:opacity-100">Releases</button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-white/12 bg-black/90 p-2 opacity-0 shadow-xl backdrop-blur transition group-hover:pointer-events-auto group-hover:opacity-100">
              <Link href="/releases/calendar" className="block rounded-xl px-3 py-2 hover:bg-white/10">Release Calendar</Link>
              <Link href="/releases/this-week" className="block rounded-xl px-3 py-2 hover:bg-white/10">This Week</Link>
            </div>
          </div>

          {/* Popular */}
          <div className="relative group">
            <button className="px-2 py-1 rounded-lg opacity-90 transition group-hover:opacity-100">Popular</button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-white/12 bg-black/90 p-2 opacity-0 shadow-xl backdrop-blur transition group-hover:pointer-events-auto group-hover:opacity-100">
              <Link href="/popular/best-of-year" className="block rounded-xl px-3 py-2 hover:bg-white/10">Best of the Year</Link>
              <Link href="/popular/top-100" className="block rounded-xl px-3 py-2 hover:bg-white/10">All-time Top 100</Link>
            </div>
          </div>

          {/* Platforms */}
          <div className="relative group">
            <button className="px-2 py-1 rounded-lg opacity-90 transition group-hover:opacity-100">Platforms</button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[360px] -translate-x-1/2 rounded-2xl border border-white/12 bg-black/90 p-2 opacity-0 shadow-xl backdrop-blur transition group-hover:pointer-events-auto group-hover:opacity-100">
              <Link href="/platforms/pc" className="block rounded-xl px-3 py-2 hover:bg-white/10">PC</Link>
              <Link href="/platforms/playstation" className="block rounded-xl px-3 py-2 hover:bg-white/10">PlayStation</Link>
              <Link href="/platforms/xbox" className="block rounded-xl px-3 py-2 hover:bg-white/10">Xbox</Link>
              <Link href="/platforms/nintendo-switch" className="block rounded-xl px-3 py-2 hover:bg-white/10">Nintendo Switch</Link>
            </div>
          </div>

          {/* Genres */}
          <div className="relative group">
            <button className="px-2 py-1 rounded-lg opacity-90 transition group-hover:opacity-100">Genres</button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-[420px] -translate-x-1/2 rounded-2xl border border-white/12 bg-black/90 p-2 opacity-0 shadow-xl backdrop-blur transition group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="grid grid-cols-2">
                <Link href="/genres/rpg" className="rounded-xl px-3 py-2 hover:bg-white/10">RPG</Link>
                <Link href="/genres/action" className="rounded-xl px-3 py-2 hover:bg-white/10">Action</Link>
                <Link href="/genres/adventure" className="rounded-xl px-3 py-2 hover:bg-white/10">Adventure</Link>
                <Link href="/genres/indie" className="rounded-xl px-3 py-2 hover:bg-white/10">Indie</Link>
                <Link href="/genres/racing" className="rounded-xl px-3 py-2 hover:bg-white/10">Racing</Link>
              </div>
            </div>
          </div>

          <Link href="/news" className={`px-2 py-1 rounded-lg transition ${isActive("/news")}`}>News</Link>
        </div>

        {/* rechts: Favoriten + Zahnrad */}
        <div className="relative flex items-center gap-2" ref={menuRef}>
          <Link href="/favorites" className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" aria-label="Favoriten" title="Favoriten">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>

          <button onClick={()=>setOpen(v=>!v)} aria-haspopup="menu" aria-expanded={open}
            className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" title="Menü">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.48.48,0,0,0,.11-.61l-2-3.46a.49.49,0,0,0-.6-.22l-2.49,1a7.16,7.16,0,0,0-1.63-.94l-.38-2.65A.49.49,0,0,0,12.23,2H9.77a.49.49,0,0,0-.48.41L9,5.06a7.16,7.16,0,0,0-1.63.94l-2.49-1a.49.49,0,0,0-.6.22l-2,3.46a.48.48,0,0,0,.11.61L4.91,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.8,14.59a.48.48,0,0,0-.11.61l2,3.46a.49.49,0,0,0,.6.22l2.49-1a7.16,7.16,0,0,0,1.63.94l.38,2.65a.49.49,0,0,0,.48.41h2.46a.49.49,0,0,0,.48-.41l.38-2.65a7.16,7.16,0,0,0,1.63-.94l2.49,1a.49.49,0,0,0,.6-.22l2-3.46a.48.48,0,0,0-.11-.61ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-56 animate-slide-up rounded-2xl border border-white/12 bg-black/90 p-1.5 shadow-xl backdrop-blur">
              <button onClick={()=>setLang(lang==="de"?"en":"de")} className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-white/10">
                <span>Sprache</span><span className="text-orange-400 font-semibold">{lang.toUpperCase()}</span>
              </button>
              <Link href="/settings" className="block rounded-xl px-3 py-2 hover:bg-white/10">Einstellungen</Link>
              <Link href="/profile" className="block rounded-xl px-3 py-2 hover:bg-white/10">Profil</Link>
              {/* Ausloggen später einblenden, wenn Auth existiert */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
