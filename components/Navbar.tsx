'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import GenresMenu from "./GenresMenu";

type IconName = "calendar"|"sparkles"|"trophy"|"fire"|"pc"|"playstation"|"xbox"|"switch"|"dot";
function Icon({ name }: { name: IconName }) {
  const base = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  switch (name) {
    case "calendar":    return <svg {...base}><path d="M7 2v2H5a2 2 0 0 0-2 2v2h18V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm14 8H3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10z"/></svg>;
    case "sparkles":    return <svg {...base}><path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2zm7 7l1 2.3L22 12l-2 0.7L19 15l-0.7-2-2-0.7 2-0.7L19 9zm-14 6l1 2.3L8 18l-2 0.7L5 21l-0.7-2L2 18l2-0.7L5 15z"/></svg>;
    case "trophy":      return <svg {...base}><path d="M7 4h10v2h3a3 3 0 0 1-3 3h-1.1A5 5 0 0 1 13 12v2h3v2H8v-2h3v-2a5 5 0 0 1-2.9-3H7A3 3 0 0 1 4 6h3V4zM6 8a1 1 0 0 0 1-1V6H5a1 1 0 0 0 1 2zm12-2h-2v1a1 1 0 0 0 1 1 1 1 0 0 0 1-2z"/></svg>;
    case "fire":        return <svg {...base}><path d="M12 2s4 3 4 7c0 2-1 3-1 3s3-1 3 3a6 6 0 1 1-12 0c0-4 4-6 6-13z"/></svg>;
    case "pc":          return <svg {...base}><path d="M3 5h18v10H3V5zm6 12h6v2H9v-2z"/></svg>;
    case "playstation": return <svg {...base}><path d="M9 3v14l7 2V7c0-2-2-3-7-4zm-4 9c-2 1-2 3 0 4l3 1v-4l-3-1zm13 1-4 1v4l4-1c2-.5 2-3 0-4z"/></svg>;
    case "xbox":        return <svg {...base}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-5 6c3-3 7-3 10 0-3 2-7 2-10 0zm10 8c-3 3-7 3-10 0 3-2 7-2 10 0z"/></svg>;
    case "switch":      return <svg {...base}><path d="M9 3h3v18H9a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm6 0a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-3V3h3zM8 7.5A1.5 1.5 0 1 0 8 10a1.5 1.5 0 0 0 0-2.5zm8 6A1.5 1.5 0 1 0 16 16a1.5 1.5 0 0 0 0-2.5z"/></svg>;
    default:            return <svg {...base}><circle cx="12" cy="12" r="8"/></svg>;
  }
}

function HoverOnlyMenu({
  label, items, accent = "#f97316", width = "min(92vw, 640px)", sub = ""
}: {
  label: string;
  items: { href: string; label: string; desc?: string; icon?: IconName }[];
  accent?: string; width?: string; sub?: string;
}) {
  const [open, setOpen] = useState(false);
  const t = useRef<number | null>(null);
  const enter = () => { if (t.current) { clearTimeout(t.current); t.current = null; } setOpen(true); };
  const leave = () => { t.current = window.setTimeout(() => setOpen(false), 140); };
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);
  return (
    <div className="relative menu-wrap" data-open={open ? "true" : "false"} onMouseEnter={enter} onMouseLeave={leave}
         style={{ ["--accent" as any]: accent } as React.CSSProperties}>
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
                <span className="menu-icon"><Icon name={it.icon ?? "dot"} /></span>
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
        <Link href="/" className="text-xl font-extrabold text-orange-400">FindYourGame</Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="opacity-90 hover:opacity-100">Home</Link>

          <HoverOnlyMenu
            label="Releases" accent="#22d3ee" sub="Was ist frisch erschienen?"
            items={[
              { href: "/releases/this-week", label: "This Week", desc: "Top Neuheiten dieser Woche", icon: "sparkles" },
              { href: "/releases/calendar",   label: "Release Calendar", desc: "Plane deine nächsten Games", icon: "calendar" },
            ]}
          />

          <HoverOnlyMenu
            label="Popular" accent="#a78bfa" sub="Fan-Favoriten & Evergreens"
            items={[
              { href: "/popular/best-of-year", label: "Best of the Year", desc: "Die stärksten Titel 2025", icon: "trophy" },
              { href: "/popular/top-100",      label: "All-time Top 100", desc: "Dauerbrenner & Klassiker", icon: "fire" },
            ]}
          />

          <HoverOnlyMenu
            label="Platforms" accent="#34d399" sub="Wähle deine Plattform"
            items={[
              { href: "/platforms/pc",              label: "PC",              desc: "Schwarz/Grau, Futur-Vibe", icon: "pc" },
              { href: "/platforms/playstation",     label: "PlayStation",     desc: "Blau, PS-Feeling",        icon: "playstation" },
              { href: "/platforms/xbox",            label: "Xbox",            desc: "Grün, Xbox-Look",        icon: "xbox" },
              { href: "/platforms/nintendo-switch", label: "Nintendo Switch", desc: "Rot, Nintendo-Style",    icon: "switch" },
            ]}
          />

          {/* Dein bestehendes Genres-Dropdown (eigene Datei) */}
          <GenresMenu />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/favorites"
            className="rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100"
            aria-label="Favoriten" title="Favoriten">♥</Link>

          <div className="relative group">
            <span className="cursor-pointer rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100">⚙</span>
            <div className="invisible absolute right-0 z-[70] mt-2 w-52 rounded-2xl border border-white/10 bg-black p-2 text-white opacity-0 shadow-xl ring-1 ring-white/15 transition group-hover:visible group-hover:opacity-100">
              <Link href="/profile"  className="block rounded-lg px-3 py-2 hover:bg-white/10">Profil</Link>
              <Link href="/settings" className="block rounded-lg px-3 py-2 hover:bg-white/10">Einstellungen</Link>
              <Link href="/language" className="block rounded-lg px-3 py-2 hover:bg-white/10">Sprache</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">Ausloggen</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Styles inline, damit sie sicher greifen */}
      <style jsx global>{`
        .menu-wrap { position: relative; }
        .menu-wrap .menu-caret {
          position:absolute; top: 34px; left: 12px; width:0; height:0;
          border-left:8px solid transparent; border-right:8px solid transparent;
          border-bottom:8px solid color-mix(in oklab, var(--accent) 35%, #111 65%);
          opacity:0; transform: translateY(-6px); transition: opacity .15s, transform .15s;
          pointer-events:none;
        }
        .menu-wrap .menu-panel {
          position:absolute; top:44px; left:0;
          background: color-mix(in oklab, #000 80%, var(--accent) 20%);
          border:1px solid rgba(255,255,255,.08);
          border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,.5);
          opacity:0; transform: translateY(-6px); transition: opacity .15s, transform .15s;
          pointer-events:none; overflow:hidden;
          backdrop-filter: blur(6px);
          z-index:60;
        }
        .menu-wrap .menu-topline { height:3px; background: linear-gradient(90deg, var(--accent), transparent); }
        .menu-wrap[data-open="true"] .menu-caret,
        .menu-wrap[data-open="true"] .menu-panel { opacity:1; transform: translateY(0); pointer-events:auto; }
        .menu-inner { padding:12px; min-width:280px; }
        .menu-header { display:flex; justify-content:space-between; align-items:center; padding:6px 6px 10px 6px; }
        .menu-title { font-weight:700; letter-spacing:.2px; }
        .menu-sub { font-size:.85rem; opacity:.7; }
        .menu-grid { display:grid; grid-template-columns: 1fr; gap:6px; }
        @media (min-width: 520px){ .menu-grid { grid-template-columns: 1fr 1fr; } }
        .menu-item { display:flex; gap:10px; align-items:center; padding:10px; border-radius:12px; background: rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); text-decoration:none; color:inherit; }
        .menu-item:hover { background: color-mix(in oklab, var(--accent) 18%, #000 82%); border-color: color-mix(in oklab, var(--accent) 40%, #fff 20%); }
        .menu-icon { width:22px; height:22px; display:flex; align-items:center; justify-content:center; opacity:.9; }
        .menu-text { display:flex; flex-direction:column; }
        .menu-label { font-weight:600; line-height:1.1; }
        .menu-meta { font-size:.8rem; opacity:.7; }
        .menu-arrow { margin-left:auto; opacity:.6; }
      `}</style>
    </header>
  );
}
