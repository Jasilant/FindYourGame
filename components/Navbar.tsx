'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GenresMenu from "./GenresMenu";

/* Wiederverwendbares Hover+Pin Dropdown */
function HoverMenu({
  label,
  items,
  width = "min(92vw, 640px)"
}: {
  label: string;
  items: { href: string; label: string }[];
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setPinned(false);
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPinned(false); setOpen(false); }
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => { if (!pinned) setOpen(false); }}
    >
      <button
        type="button"
        className="cursor-pointer opacity-90 hover:opacity-100"
        onClick={() => { setPinned(v => !v); setOpen(true); }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
      </button>

      <div className="menu-panel" data-open={open ? "true" : "false"} style={{ width }}>
        <div className="menu-grid p-3">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="menu-item">
              <span>{it.label}</span>
            </Link>
          ))}
        </div>
      </div>
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
          <Link href="/" className="opacity-90 hover:opacity-100">Home</Link>

          <HoverMenu
            label="Releases"
            items={[
              { href: "/releases/this-week", label: "This Week" },
              { href: "/releases/calendar",   label: "Release Calendar" }
            ]}
          />

          <HoverMenu
            label="Popular"
            items={[
              { href: "/popular/best-of-year", label: "Best of the Year" },
              { href: "/popular/top-100",      label: "All-time Top 100" }
            ]}
          />

          <HoverMenu
            label="Platforms"
            items={[
              { href: "/platforms/pc",              label: "PC" },
              { href: "/platforms/playstation",     label: "PlayStation" },
              { href: "/platforms/xbox",            label: "Xbox" },
              { href: "/platforms/nintendo-switch", label: "Nintendo Switch" }
            ]}
          />

          {/* Genres: sortiert + Icons + Hover/Klick-Pin */}
          <GenresMenu />
        </div>

        {/* Rechts: Favoriten & Settings (einfach) */}
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
              <Link href="/settings" className="block rounded-lg px-3 py-2 hover:bg-white/10">Einstellungen</Link>
              <Link href="/profile"  className="block rounded-lg px-3 py-2 hover:bg-white/10">Profil</Link>
              <Link href="/language" className="block rounded-lg px-3 py-2 hover:bg-white/10">Sprache</Link>
              <button className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">Ausloggen</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
