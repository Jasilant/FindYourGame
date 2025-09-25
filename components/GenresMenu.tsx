'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CanonicalGenre } from "../lib/genres";

/* Beliebtheitsscores (größer = beliebter) */
const RAW: { slug: CanonicalGenre; label: string; score: number }[] = [
  { slug: "action",           label: "Action",            score: 100 },
  { slug: "shooter",          label: "Shooter",           score: 95  },
  { slug: "rpg",              label: "RPG",               score: 92  },
  { slug: "adventure",        label: "Abenteuer",         score: 88  },
  { slug: "sports",           label: "Sport & Racing",    score: 84  },
  { slug: "simulation",       label: "Simulation",        score: 80  },
  { slug: "strategy",         label: "Strategie",         score: 78  },
  { slug: "platformer",       label: "Plattformer",       score: 72  },
  { slug: "indie",            label: "Indie",             score: 70  },
  { slug: "puzzle",           label: "Puzzle",            score: 66  },
  { slug: "horror-survival",  label: "Horror / Survival", score: 64  },
  { slug: "fighting",         label: "Fighting",          score: 58  },
  { slug: "free",             label: "Kostenlos",         score: 90  },
];

/* Kleine, eingebaute Icons (ohne extra Lib) */
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
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Panel offen lassen, wenn geklickt (Pin). Klick außerhalb/ESC schließt. */
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

  const GENRES = useMemo(() => [...RAW].sort((a,b)=>b.score - a.score), []);

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
        Genres
      </button>

      <div className="menu-panel" data-open={open ? "true" : "false"}>
        <div className="menu-grid p-4">
          {GENRES.map((g) => (
            <Link key={g.slug} href={`/genres/${g.slug}`} className="menu-item">
              <span className="menu-icon"><GenreIcon slug={g.slug} /></span>
              <span>{g.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
