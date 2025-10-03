'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import GenresMenu from "./GenresMenu";

/* --------- kleine Inline-Icons ---------- */
type IconName =
  | "calendar" | "sparkles" | "trophy" | "fire"
  | "pc" | "playstation" | "xbox" | "switch"
  | "dot";

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

/* ---------- Reusable Hover menu ---------- */
type MenuItem = { href: string; label: string; desc?: string; icon?: IconName; accent?: string; };

function HoverOnlyMenu({
  label, items, accent = "#f97316", width = 560, sub = ""
}: { label: string; items: MenuItem[]; accent?: string; width?: number; sub?: string; }) {
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
      <div className="menu-panel" style={{ width: `${width}px`, maxWidth: "min(92vw, 640px)" }}>
        <div className="menu-topline" />
        <div className="menu-inner">
          <div className="menu-header"><div><div className="menu-title">{label}</div>{sub && <div className="menu-sub">{sub}</div>}</div></div>
          <div className="menu-grid">
            {items.map((it) => (
              <Link key={it.href} href={it.href} className="menu-item"
                style={it.accent ? ({ ["--item" as any]: it.accent } as React.CSSProperties) : undefined}>
                <span className="menu-icon"><Icon name={it.icon ?? "dot"} /></span>
                <span className="menu-text"><span className="menu-label">{it.label}</span>{it.desc && <span className="menu-meta">{it.desc}</span>}</span>
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
  const session = useSession();
  const loggedIn = session?.status === "authenticated";
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const redirectTo = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('redirect') || pathname) : pathname;

  async function doLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');
    const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: redirectTo || '/' });
    // NextAuth übernimmt Redirect, kein extra Code nötig
  }

  function handleFavoritesClick(e: React.MouseEvent) {
    if (!loggedIn) {
      e.preventDefault();
      router.push(`/login?redirect=/favorites`);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-orange-400">FindYourGame</Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="opacity-90 hover:opacity-100">Home</Link>

          <HoverOnlyMenu label="Releases" accent="#22d3ee" sub="Was ist frisch erschienen?"
            items={[
              { href: "/releases/this-week", label: "This Week", desc: "Top Neuheiten dieser Woche", icon: "sparkles", accent: "#22d3ee" },
              { href: "/releases/calendar",   label: "Release Calendar", desc: "Plane deine nächsten Games", icon: "calendar", accent: "#22d3ee" },
            ]}
          />

          <HoverOnlyMenu label="Popular" accent="#a78bfa" sub="Fan-Favoriten & Evergreens"
            items={[
              { href: "/popular/best-of-year", label: "Best of the Year", desc: "Die stärksten Titel 2025", icon: "trophy", accent: "#f59e0b" },
              { href: "/popular/top-100",      label: "All-time Top 100", desc: "Dauerbrenner & Klassiker", icon: "fire",   accent: "#ef4444" },
            ]}
          />

          <HoverOnlyMenu label="Platforms" accent="#34d399" sub="Wähle deine Plattform"
            items={[
              { href: "/platforms/pc",              label: "PC",              desc: "Schwarz/Grau, Futur-Vibe", icon: "pc",          accent: "#9ca3af" },
              { href: "/platforms/playstation",     label: "PlayStation",     desc: "Blau, PS-Feeling",        icon: "playstation", accent: "#2563eb" },
              { href: "/platforms/xbox",            label: "Xbox",            desc: "Grün, Xbox-Look",        icon: "xbox",        accent: "#16a34a" },
              { href: "/platforms/nintendo-switch", label: "Nintendo Switch", desc: "Rot, Nintendo-Style",    icon: "switch",      accent: "#ef4444" },
            ]}
          />

          <GenresMenu />
        </div>

        <div className="relative flex items-center gap-3">
          <Link
            href="/favorites"
            onClick={handleFavoritesClick}
            className="rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100"
            aria-label="Favoriten"
            title="Favoriten"
          >
            ♥
          </Link>

          {!loggedIn && (
            <>
              {/* Login-Trigger */}
              <button
                onClick={() => setShowLogin((v) => !v)}
                className="rounded-xl border border-white/15 px-3 py-1.5 text-sm hover:border-orange-400"
              >
                Login
              </button>

              {/* Mini-Login-Panel */}
              {showLogin && (
                <div className="absolute right-0 top-[42px] z-[80] w-[300px] rounded-2xl border border-white/12 bg-black/90 p-3 shadow-xl backdrop-blur">
                  <div className="mb-2 text-sm font-semibold">Anmelde­daten eingeben</div>
                  <form onSubmit={doLogin} className="flex flex-col gap-2">
                    <input name="email" type="email" required placeholder="E-Mail"
                      className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none placeholder-white/40" />
                    <input name="password" type="password" required placeholder="Passwort"
                      className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none placeholder-white/40" />
                    <button type="submit"
                      className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-black hover:bg-orange-400">
                      Einloggen
                    </button>
                  </form>
                  <div className="mt-2 text-xs opacity-70">
                    Noch kein Konto?{" "}
                    <Link href="/register" className="text-orange-400 hover:underline">
                      Jetzt registrieren
                    </Link>
                  </div>
                </div>
              )}

              <Link href="/register" className="rounded-xl bg-orange-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-orange-400">
                Registrieren
              </Link>
            </>
          )}

          {/* Zahnrad-Menü (Logout nur wenn eingeloggt) */}
          <div className="relative group">
            <span className="cursor-pointer rounded-xl border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100">⚙</span>
            <div className="invisible absolute right-0 z-[70] mt-2 w-56 rounded-2xl border border-white/10 bg-black p-2 text-white opacity-0 shadow-xl ring-1 ring-white/15 transition group-hover:visible group-hover:opacity-100">
              <Link href="/profile"  className="block rounded-lg px-3 py-2 hover:bg-white/10">Profil</Link>
              <Link href="/settings" className="block rounded-lg px-3 py-2 hover:bg-white/10">Einstellungen</Link>
              <Link href="/language" className="block rounded-lg px-3 py-2 hover:bg-white/10">Sprache</Link>
              {loggedIn && (
                <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10">
                  Ausloggen
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Styles: Panel mittig + einheitliche Größe + Item-Farben */}
      <style jsx global>{`
        .menu-wrap { position: relative; }
        .menu-wrap .menu-caret {
          position:absolute; top: 34px; left: 50%; transform: translateX(-50%) translateY(-6px);
          width:0; height:0; opacity:0; transition: opacity .15s, transform .15s;
          border-left:8px solid transparent; border-right:8px solid transparent;
          border-bottom:8px solid color-mix(in oklab, var(--accent) 35%, #111 65%);
          pointer-events:none;
        }
        .menu-wrap .menu-panel {
          position:absolute; top:44px; left: 50%; transform: translateX(-50%) translateY(-6px);
          background: color-mix(in oklab, #000 82%, var(--accent) 18%);
          border:1px solid rgba(255,255,255,.08);
          border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,.5);
          opacity:0; transition: opacity .15s, transform .15s;
          pointer-events:none; overflow:hidden; backdrop-filter: blur(6px); z-index:60;
          width:560px; max-width:min(92vw, 640px);
        }
        .menu-wrap .menu-topline { height:3px; background: linear-gradient(90deg, var(--accent), transparent); }
        .menu-wrap[data-open="true"] .menu-caret,
        .menu-wrap[data-open="true"] .menu-panel { opacity:1; transform: translateX(-50%) translateY(0); pointer-events:auto; }
        .menu-inner { padding:12px; min-width:280px; }
        .menu-header { display:flex; justify-content:space-between; align-items:center; padding:6px 6px 10px 6px; }
        .menu-title { font-weight:700; letter-spacing:.2px; }
        .menu-sub { font-size:.85rem; opacity:.7; }
        .menu-grid { display:grid; grid-template-columns: 1fr; gap:6px; }
        @media (min-width: 520px){ .menu-grid { grid-template-columns: 1fr 1fr; } }
        .menu-item { display:flex; gap:10px; align-items:center; padding:10px; border-radius:12px; background: rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); text-decoration:none; color:inherit; transition: background .15s, border-color .15s, box-shadow .15s; }
        .menu-item:hover { background: color-mix(in oklab, var(--item, var(--accent)) 20%, #000 80%); border-color: color-mix(in oklab, var(--item, var(--accent)) 40%, #fff 20%); box-shadow: 0 0 0 1px color-mix(in oklab, var(--item, var(--accent)) 35%, transparent); }
        .menu-icon { width:22px; height:22px; display:flex; align-items:center; justify-content:center; opacity:.9; }
        .menu-text { display:flex; flex-direction:column; }
        .menu-label { font-weight:600; line-height:1.1; }
        .menu-meta { font-size:.8rem; opacity:.7; }
        .menu-arrow { margin-left:auto; opacity:.6; }
      `}</style>
    </header>
  );
}
