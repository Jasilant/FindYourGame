'use client';

import Link from "next/link";
import { useState } from "react";
import GenresMenu from "./GenresMenu";

function HoverMenu({
  label,
  items
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-pointer opacity-90 hover:opacity-100">
        {label}
      </span>
      {open && (
        <div className="absolute left-1/2 z-50 mt-3 w-[min(92vw,640px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-black p-3 text-white shadow-xl ring-1 ring-white/15">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Links: Logo */}
        <Link href="/" className="text-xl font-extrabold text-orange-400">
          FindYourGame
        </Link>

        {/* Mitte: Tabs */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="opacity-90 hover:opacity-100">
            Home
          </Link>

          <HoverMenu
            label="Releases"
            items={[
              { href: "/releases/this-week", label: "This Week" },
              { href: "/releases/calendar", label: "Release Calendar" }
            ]}
          />

          <HoverMenu
            label="Popular"
            items={[
              { href: "/popular/best-of-year", label: "Best of the Year" },
              { href: "/popular/top-100", label: "All-time Top 100" }
            ]}
          />

          <HoverMenu
            label="Platforms"
            items={[
              { href: "/platforms/pc", label: "PC" },
              { href: "/platforms/playstation", label: "PlayStation" },
              { href: "/platforms/xbox", label: "Xbox" },
              { href: "/platforms/nintendo-switch", label: "Nintendo Switch" }
            ]}
          />

          {/* NEU: Genres mit „Kostenlos“ */}
          <GenresMenu />
        </div>

        {/* Rechts: Favoriten & Einstellungen (simple) */}
        <div className="flex items-center gap-3">
          <Link
            href="/favorites"
            className="rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100"
            aria-label="Favoriten"
            title="Favoriten"
          >
            ♥
          </Link>

          <div className="relative group">
            <span className="cursor-pointer rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100">
              ⚙
            </span>
            <div className="invisible absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-white/10 bg-black p-2 text-white opacity-0 shadow-xl ring-1 ring-white/15 transition group-hover:visible group-hover:opacity-100">
              <Link href="/settings" className="block rounded-lg px-3 py-2 hover:bg-white/10">
                Einstellungen
              </Link>
              <Link href="/profile" className="block rounded-lg px-3 py-2 hover:bg-white/10">
                Profil
              </Link>
              <Link href="/language" className="block rounded-lg px-3 py-2 hover:bg-white/10">
                Sprache
              </Link>
              {/* Falls eingeloggt: */}
              <button className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">
                Ausloggen
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
