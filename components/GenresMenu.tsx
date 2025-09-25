'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CanonicalGenre } from "../lib/genres";

/* Beliebtheitsscores */
const RAW: { slug: CanonicalGenre; label: string; score: number; desc?: string }[] = [
  { slug: "action",           label: "Action",            score: 100, desc: "Tempo & Skills" },
  { slug: "shooter",          label: "Shooter",           score: 95,  desc: "Aim & Taktik" },
  { slug: "rpg",              label: "RPG",               score: 92,  desc: "Story & Builds" },
  { slug: "adventure",        label: "Abenteuer",         score: 88,  desc: "Erkunden & Rätsel" },
  { slug: "sports",           label: "Sport & Racing",    score: 84,  desc: "Wettkampf & Pace" },
  { slug: "simulation",       label: "Simulation",        score: 80,  desc: "Realismus & Systeme" },
  { slug: "strategy",         label: "Strategie",         score: 78,  desc: "Zug/RTS & Macro" },
  { slug: "platformer",       label: "Plattformer",       score: 72,  desc: "Präzise Sprünge" },
  { slug: "indie",            label: "Indie",             score: 70,  desc: "Kreativ & frisch" },
  { slug: "puzzle",           label: "Puzzle",            score: 66,  desc: "Knobeln & Logik" },
  { slug: "horror-survival",  label: "Horror / Survival", score: 64,  desc: "Spannung & Ressourcen" },
  { slug: "fighting",         label: "Fighting",          score: 58,  desc: "Matchups & Frames" },
  { slug: "free",             label: "Kostenlos",         score: 90,  desc: "Free to Play" },
];

/* kleine Icons (ohne Lib) */
function GenreIcon({ slug }: { slug: CanonicalGenre }) {
  const c = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  switch (slug) {
    case "action": return (<svg {...c}><path d="M7 21h2l8-8-2-2-8 8v2zm9-13 2 2 2-2-2-2-2 2zM3 17l2 2 2-2-2-2-2 2z"/></svg>);
    case "shooter": return (<svg {...c}><path d="M3 11h18v2H3v-2zm4-4h2v2H7V7zm8 8h2v2h-2v-2z"/></svg>);
    case "rpg": return (<svg {...c}><path d="M12 2 4 7v10l8 5 8-5V7l-8-5zm0 2.3 6 3.7v8l-6 3.7-6-3.7v-8l6-3.7z"/></svg>);
    case "adventure": return (<svg {...c}><path d="M3 7l9-4 9 4-9 4-9-4zm0 6 9 4 9-4M3 19l9 4 9-4"/></svg>);
    case "strategy": return (<svg {...c}><path d="M7 17h3v3H7v-3zm7-13h3v3h-3V4zM4 4h6v6H4V4zm10 10h6v6h-6v-6z"/></svg>);
    case "simulation": return (<svg {...c}><path d="M12 2a5 5 0 0 1 5 5h-2a3 3 0 1 0-6 0H7a5 5 0 0 1 5-5zm-7 9h14v9H5v-9zm2 2v5h10v-5H7z"/></svg>);
    case "sports": return (<svg {...c}><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm5 10a5 5 0 0 1-5 5v-2a3 3 0 0 0 3-3h2zM7 12a5 5 0 0 1 5-5v2a3 3 0 0 0-3 3H7z"/></svg>);
    case "platformer": return (<svg {...c}><path d="M3 17h8v2H3v-2zm10-4h8v2h-8v-2zM3 9h14v2H3V9z"/></svg>);
    case "puzzle": return (<svg {...c}><path d="M9 3h2a2 2 0 1 1 2 2h2v4h-2a2 2 0 1 1-2-2H9V3zm8 8h4v4h-2a2 2 0 1 1-2-2v-2zM3 9h4v2a2 2 0 1 1-2 2H3V9zm6 8h4v4H9v-2a2 2 0 1 1 0-2z"/></svg>);
    case "horror-survival": return (<svg {...c}><path d="M12 2C9 2 7 5 7 8v3H5v11h14V11h-2V8c0-3-2-6-5-6zm0 2c2 0 3 2 3 4v3H9V8c0-2 1-4 3-4z"/></svg>);
    case "fighting": return (<svg {...c}><path d="M5 12l4-4 3 3 5-5 2 2-7 7-3-3-3 3-1-3z"/></svg>);
    case "indie": return (<svg {...c}><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.5-.8L12 2z"/></svg>);
    case "free": return (<svg {...c}><path d="M4 4h16v6H4V4zm0 8h16v8H4v-8zm3 2v4h10v-4H7z"/></svg>);
    default: return (<svg {...c}><circle cx="12" cy="12" r="8"/></svg>);
  }
}

export default function GenresMenu() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const enter = () => { if (timer.current) { window.clearTimeout(timer.current); timer.current = null; } setOpen(true); };
  const leave = () => { timer.current = window.setTimeout(() => setOpen(false), 140); };

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const GENRES = useMemo(() => [...RAW].sort((a,b)=>b.score - a.score), []);

  return (
    <div
      ref={wrapRef}
      className="relative menu-wrap"
      data-open={open ? "true" : "false"}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{ "--accent": "#f97316" } as React.CSSProperties}
    >
      <span className="cursor-pointer opacity-90 hover:opacity-100">Genres</span>

      <div className="menu-caret" />
      <div className="menu-panel">
        <div className="menu-topline" />
        <div className="menu-inner">
          <div className="menu-header">
            <div>
              <div className="menu-title">Genres</div>
              <div className="menu-sub">Finde genau deinen Vibe</div>
            </div>
          </div>

          <div className="menu-grid">
            {GENRES.map((g) => (
              <Link key={g.slug} href={`/genres/${g.slug}`} className="menu-item">
                <span className="menu-icon"><GenreIcon slug={g.slug} /></span>
                <span className="menu-text">
                  <span className="menu-label">{g.label}</span>
                  <span className="menu-meta">{g.desc}</span>
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
