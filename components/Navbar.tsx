'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-2 py-1 rounded-lg transition ${
        active ? "text-orange-500" : "opacity-90 hover:opacity-100"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"de" | "en">("de");
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = false; // TODO: mit echter Auth verdrahten

  // Klick außerhalb schließt Menü
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

        {/* Tabs mittig: Home → Filter → News */}
        <div className="hidden gap-6 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/filter">Filter</NavLink>
          <NavLink href="/news">News</NavLink>
        </div>

        {/* rechts: Favoriten + Zahnrad */}
        <div className="relative flex items-center gap-2" ref={menuRef}>
          {/* Favoriten */}
          <Link
            href="/favorites"
            className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition"
            aria-label="Favoriten"
            title="Favoriten"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </Link>

          {/* Zahnrad */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition"
            title="Menü"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.48.48,0,0,0,.11-.61l-2-3.46a.49.49,0,0,0-.6-.22l-2.49,1a7.16,7.16,0,0,0-1.63-.94l-.38-2.65A.49.49,0,0,0,12.23,2H9.77a.49.49,0,0,0-.48.41L9,5.06a7.16,7.16,0,0,0-1.63.94l-2.49-1a.49.49,0,0,0-.6.22l-2,3.46a.48.48,0,0,0,.11.61L4.91,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.8,14.59a.48.48,0,0,0-.11.61l2,3.46a.49.49,0,0,0,.6.22l2.49-1a7.16,7.16,0,0,0,1.63.94l.38,2.65a.49.49,0,0,0,.48.41h2.46a.49.49,0,0,0,.48-.41l.38-2.65a7.16,7.16,0,0,0,1.63-.94l2.49,1a.49.49,0,0,0,.6-.22l2-3.46a.48.48,0,0,0-.11-.61ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-56 animate-slide-up rounded-2xl border border-white/12 bg-black/90 p-1.5 shadow-xl backdrop-blur">
              <button
                onClick={() => setLang(lang === "de" ? "en" : "de")}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-white/10"
              >
                <span>Sprache</span><span className="text-orange-400 font-semibold">{lang.toUpperCase()}</span>
              </button>
              <Link href="/settings" className="block rounded-xl px-3 py-2 hover:bg-white/10">Einstellungen</Link>
              <Link href="/profile" className="block rounded-xl px-3 py-2 hover:bg-white/10">Profil</Link>
              {isLoggedIn && (
                <button className="block w-full rounded-xl px-3 py-2 text-left hover:bg-white/10">Ausloggen</button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
