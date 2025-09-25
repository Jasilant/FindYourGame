'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GenresMenu from "./GenresMenu";

/* Wiederverwendbares Hover-Dropdown (ohne Klick-Pin, bleibt offen solange Maus drauf) */
function HoverOnlyMenu({
  label,
  items,
  accent = "#f97316",
  width = "min(92vw, 640px)",
  sub = ""
}: {
  label: string;
  items: { href: string; label: string; desc?: string }[];
  accent?: string;
  width?: string;
  sub?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const enter = () => { if (timer.current) { window.clearTimeout(timer.current); timer.current = null; } setOpen(true); };
  const leave = () => { timer.current = window.setTimeout(() => setOpen(false), 140); };
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <div
      ref={wrapRef}
      className="relative menu-wrap"
      data-open={open ? "true" : "false"}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <span className="cursor-pointer opacity-90 hover:opacity-100">{label}</span>

      <div className="menu-caret" />
      <div className="menu-panel" style={{ width }}>
        <div className="menu-topline" />
        <div className="menu-inner">
          <div className="menu-header">
            <div>
              <div className="menu-title">{label}</div>
              {sub && <div className="menu-sub">{sub}</div>}
            </div>
          </div>

          <div className="menu-grid">
            {items.map((it) => (
              <Link key={it.href} href={it.href} className="menu-item">
                <span className="menu-icon" />
                <span className="menu-text">
                  <span className="menu-label">{it.label}</span>
                  {it.desc && <span className="menu-meta">{it.desc}</span>}
                </span>
                <span className="menu-arrow">›</span>
              </Link>
            ))}
          </div>
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

          <HoverOnlyMenu
            label="Releases"
            accent="#22d3ee"
            sub="Was ist frisch erschienen?"
            items={[
              { href: "/releases/this-week", label: "This Week", desc: "Top Neuheiten dieser Woche" },
              { href: "/releases/calendar",   label: "Release Calendar", desc: "Plane deine nächsten Games" }
            ]}
          />

          <HoverOnlyMenu
            label="Popular"
            accent="#a78bfa"
            sub="Fan-Favoriten & Evergreens"
            items={[
              { href: "/popular/best-of-year", label: "Best of the Year", desc: "Die stärksten Titel 2025" },
              { href: "/popular/top-100",      label: "All-time Top 100", desc: "Dauerbrenner & Klassiker" }
            ]}
          />

          <HoverOnlyMenu
            label="Platforms"
            accent="#34d399"
            sub="Wähle deine Plattform"
            items={[
              { href: "/platforms/pc",              label: "PC",              desc: "Schwarz/Grau, Futur-Vibe" },
              { href: "/platforms/playstation",     label: "PlayStation",     desc: "Blau, PS-Feeling" },
              { href: "/platforms/xbox",            label: "Xbox",            desc: "Grün, Xbox-Look" },
              { href: "/platforms/nintendo-switch", label: "Nintendo Switch", desc: "Rot, Nintendo-Style" }
            ]}
          />

          {/* Genres: hübsch, sortiert, Icons, Hover-only */}
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
