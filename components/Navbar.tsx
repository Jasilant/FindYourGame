'use client';

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

type MenuId = "releases" | "popular" | "platforms" | "genres" | null;

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href ? "text-orange-400" : "opacity-90 hover:opacity-100";

  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const barRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const subWrapRef = useRef<HTMLDivElement>(null);
  const subInnerRef = useRef<HTMLDivElement>(null);

  const btnHome = useRef<HTMLAnchorElement>(null);
  const btnNews = useRef<HTMLAnchorElement>(null);
  const btnReleases = useRef<HTMLButtonElement>(null);
  const btnPopular  = useRef<HTMLButtonElement>(null);
  const btnPlatforms= useRef<HTMLButtonElement>(null);
  const btnGenres   = useRef<HTMLButtonElement>(null);

  const [subHeight, setSubHeight] = useState(0);
  const [panelWidth, setPanelWidth] = useState(560);
  const [panelLeft, setPanelLeft] = useState(0);
  const [caretLeft, setCaretLeft] = useState(24);
  const [underlineLeft, setULeft]   = useState(0);
  const [underlineWidth, setUWidth] = useState(0);

  const scheduleOpen = (id: MenuId) => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMenu(id), 120);
  };
  const scheduleClose = () => {
    if (openTimer.current) { window.clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  useEffect(() => {
    const onDocMove = (e: MouseEvent) => {
      const inBar  = !!barRef.current?.contains(e.target as Node);
      const inWrap = !!subWrapRef.current?.contains(e.target as Node);
      if (!inBar && !inWrap) scheduleClose();
    };
    document.addEventListener("mousemove", onDocMove);
    return () => document.removeEventListener("mousemove", onDocMove);
  }, []);

  // Höhe des Submenus smooth animieren (schiebt die Suche unten weiter runter)
  useLayoutEffect(() => {
    const content = subInnerRef.current;
    const target = openMenu ? (content?.scrollHeight ?? 0) : 0;
    setSubHeight(target);
  }, [openMenu]);

  // Panel mittig unter dem Trigger positionieren (Viewport begrenzen)
  useLayoutEffect(() => {
    const wrap = subWrapRef.current;
    if (!wrap || !openMenu) return;

    const containerRect = wrap.getBoundingClientRect();
    const btn =
      openMenu === "releases" ? btnReleases.current :
      openMenu === "popular"  ? btnPopular.current  :
      openMenu === "platforms"? btnPlatforms.current:
      openMenu === "genres"   ? btnGenres.current   : null;
    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();

    const width =
      openMenu === "genres"    ? 880 :       // 4 Spalten
      openMenu === "platforms" ? 620 :       // 2 Spalten
                                  560;       // Standard
    setPanelWidth(width);

    const center = btnRect.left - containerRect.left + btnRect.width / 2;
    const left   = Math.max(0, Math.min(center - width / 2, containerRect.width - width));
    setPanelLeft(left);

    const caret = Math.max(16, Math.min(center - left - 6, width - 16));
    setCaretLeft(caret);
  }, [openMenu]);

  function setUnderlineTo(el: HTMLElement | null) {
    const row = rowRef.current;
    if (!row || !el) return;
    const r = row.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    setULeft(e.left - r.left);
    setUWidth(e.width);
  }

  useEffect(() => {
    if (pathname.startsWith("/releases")) setUnderlineTo(btnReleases.current);
    else if (pathname.startsWith("/popular")) setUnderlineTo(btnPopular.current);
    else if (pathname.startsWith("/platforms")) setUnderlineTo(btnPlatforms.current);
    else if (pathname.startsWith("/genres")) setUnderlineTo(btnGenres.current);
    else if (pathname === "/news") setUnderlineTo(btnNews.current);
    else setUnderlineTo(btnHome.current);
  }, [pathname]);

  const onEnterTrigger = (id: MenuId) => {
    scheduleOpen(id);
    if (id === "releases") setUnderlineTo(btnReleases.current);
    if (id === "popular")  setUnderlineTo(btnPopular.current);
    if (id === "platforms")setUnderlineTo(btnPlatforms.current);
    if (id === "genres")   setUnderlineTo(btnGenres.current);
  };

  const t = (menu: string, target: string) => () =>
    trackEvent("menu_select", { menu, target });

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <nav ref={barRef} className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">

          {/* BRAND: Fuchs-Logo + Wortmarke */}
          <Link href="/" className="group flex items-center gap-2">
            <img
              src="/logo-fox-pixel-coarse.svg"
              alt=""
              className="h-7 w-7 transition-transform duration-200 group-hover:-translate-y-[1px] group-active:scale-95"
            />
            <span className="text-xl font-extrabold">
              <span className="text-white">FindYourGame</span>
              <span className="text-orange-500">.ch</span>
            </span>
          </Link>

          {/* NAV ROW */}
          <div ref={rowRef} className="relative hidden items-center gap-6 md:flex" onMouseLeave={scheduleClose}>
            <Link href="/" ref={btnHome}
              className={`px-2 py-1 rounded-lg transition ${isActive("/")}`}
              onMouseEnter={() => { scheduleOpen(null); setUnderlineTo(btnHome.current); }}>
              Home
            </Link>

            <button ref={btnReleases}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("releases")}>
              Releases
            </button>

            <button ref={btnPopular}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("popular")}>
              Popular
            </button>

            <button ref={btnPlatforms}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("platforms")}>
              Platforms
            </button>

            <button ref={btnGenres}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("genres")}>
              Genres
            </button>

            <Link href="/news" ref={btnNews}
              className={`px-2 py-1 rounded-lg transition ${isActive("/news")}`}
              onMouseEnter={() => { scheduleOpen(null); setUnderlineTo(btnNews.current); }}>
              News
            </Link>

            {/* Unterstreich-Indicator */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] transition-all duration-200"
              style={{ width: underlineWidth, transform: `translateX(${underlineLeft}px)`, background: 'var(--accent)' }}
            />
          </div>

          {/* RIGHT: Favorites + Settings */}
          <div className="relative flex items-center gap-2">
            <Link href="/favorites" className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" aria-label="Favoriten" title="Favoriten">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </Link>
            <Link href="/settings" className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" aria-label="Einstellungen" title="Einstellungen">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.63l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.19 7.19 0 0 0-1.7-.99l-.38-2.65A.5.5 0 0 0 12.04 2h-4.1a.5.5 0 0 0-.49.41l-.38 2.65c-.6.24-1.17.56-1.7.95l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.63l2.11 1.65c-.05.33-.08.66-.08 1s.03.67.08.99L.52 14.63a.5.5 0 0 0-.12.63l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.53.39 1.1.71 1.7.95l.38 2.65a.5.5 0 0 0 .49.41h4.1a.5.5 0 0 0 .49-.41l.38-2.65c.6-.24 1.17-.56 1.7-.95l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.63l-2.11-1.65ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Submenu (schiebt Content nach unten) */}
      <div
        ref={subWrapRef}
        className="mx-auto max-w-7xl px-4 overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: subHeight }}
        onMouseEnter={() => openMenu && scheduleOpen(openMenu)}
        onMouseLeave={scheduleClose}
      >
        <div ref={subInnerRef}>
          {openMenu && (
            <div
              className="relative animate-menu-pop menu-panel menu-noise"
              style={{ width: panelWidth, marginLeft: panelLeft }}
            >
              {/* caret/„Schnabel“ in Panel-Farbe */}
              <div className="absolute -top-2 h-4 w-4 rotate-45" style={{ left: caretLeft, background: 'var(--menu-bg)', borderTopLeftRadius: 3 }} />

              {openMenu === "releases" && (
                <div className="grid gap-2 p-3">
                  <Link href="/releases/calendar" onClick={t("releases","calendar")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 6H4v12h16V8z"/></svg></span>
                    Release Calendar
                  </Link>
                  <Link href="/releases/this-week" onClick={t("releases","this-week")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v14H3V5zm2 2v10h14V7H5z"/></svg></span>
                    This Week
                  </Link>
                </div>
              )}

              {openMenu === "popular" && (
                <div className="grid gap-2 p-3">
                  <Link href="/popular/best-of-year" onClick={t("popular","best-of-year")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
                    Best of the Year
                  </Link>
                  <Link href="/popular/top-100" onClick={t("popular","top-100")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h4v-6H3v6zm6 0h4V7h-4v10zm6 0h4V4h-4v13z"/></svg></span>
                    All-time Top 100
                  </Link>
                </div>
              )}

              {openMenu === "platforms" && (
                <div className="grid grid-cols-2 gap-2 p-3">
                  <Link href="/platforms/pc" onClick={t("platforms","pc")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v10H4zM2 18h20v2H2z"/></svg></span> PC
                  </Link>
                  <Link href="/platforms/playstation" onClick={t("platforms","playstation")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="12" r="3"/><path d="M17 9v6h-2V9z"/></svg></span> PlayStation
                  </Link>
                  <Link href="/platforms/xbox" onClick={t("platforms","xbox")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9-4-9-9-9z"/></svg></span> Xbox
                  </Link>
                  <Link href="/platforms/nintendo-switch" onClick={t("platforms","nintendo-switch")} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                    <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3h5v18H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 0a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-5V3h5z"/></svg></span> Nintendo Switch
                  </Link>
                </div>
              )}

              {openMenu === "genres" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3">
                  {[
                    ["rpg","RPG"],["action","Action"],["adventure","Adventure"],["indie","Indie"],
                    ["racing","Racing"],["rts","RTS"],["strategy","Strategy"],["shooter","Shooter"],
                  ].map(([slug,label])=>(
                    <Link key={slug} href={`/genres/${slug}`} onClick={t("genres", slug)} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-black/10">
                      <span className="inline-block h-5 w-5"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4z"/></svg></span> {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
