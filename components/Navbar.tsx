'use client';

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type MenuId = "releases" | "popular" | "platforms" | "genres" | null;

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ? "text-orange-500" : "opacity-90 hover:opacity-100";

  // Offenes Menü (hover-gesteuert mit Intent)
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  // Refs
  const barRef = useRef<HTMLDivElement>(null);
  const triggers = {
    releases: useRef<HTMLButtonElement>(null),
    popular: useRef<HTMLButtonElement>(null),
    platforms: useRef<HTMLButtonElement>(null),
    genres: useRef<HTMLButtonElement>(null),
  } as const;

  // Submenu-Wrapper (nimmt Höhe ein → schiebt Content runter)
  const subWrapRef = useRef<HTMLDivElement>(null);
  const subInnerRef = useRef<HTMLDivElement>(null);

  // Layout-Werte
  const [subHeight, setSubHeight] = useState(0);
  const [subLeft, setSubLeft] = useState(0);
  const [subWidth, setSubWidth] = useState(560);
  const [caretLeft, setCaretLeft] = useState(24); // Position des kleinen Dreiecks
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  // Hover-Intent: öffnen mit Delay, schließen mit Delay
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

  // Maus komplett außerhalb von Nav + Panel → schließen
  useEffect(() => {
    const onDocMove = (e: MouseEvent) => {
      const inBar = !!barRef.current?.contains(e.target as Node);
      const inWrap = !!subWrapRef.current?.contains(e.target as Node);
      if (!inBar && !inWrap) scheduleClose();
    };
    document.addEventListener("mousemove", onDocMove);
    return () => document.removeEventListener("mousemove", onDocMove);
  }, []);

  // Höhe animieren (push-down)
  useLayoutEffect(() => {
    const content = subInnerRef.current;
    if (!content) return;
    const target = openMenu ? content.scrollHeight : 0;
    setSubHeight(target);
  }, [openMenu]);

  // Positionen berechnen: Panel links, Breite, Caret, Unterstrich unter Trigger
  useLayoutEffect(() => {
    const wrap = subWrapRef.current;
    if (!wrap) return;

    const containerRect = wrap.getBoundingClientRect();

    const btn =
      openMenu === "releases" ? triggers.releases.current :
      openMenu === "popular" ? triggers.popular.current :
      openMenu === "platforms" ? triggers.platforms.current :
      openMenu === "genres" ? triggers.genres.current : null;

    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();

    const width =
      openMenu === "genres" ? 760 :
      openMenu === "platforms" ? 600 : 560;
    setSubWidth(width);

    const left = Math.max(
      0,
      Math.min(btnRect.left - containerRect.left, containerRect.width - width)
    );
    setSubLeft(left);

    const center = btnRect.left - containerRect.left + btnRect.width / 2;
    setCaretLeft(Math.max(16, Math.min(center - left - 8, width - 16)));

    // Unterstreichung unter dem Trigger
    setUnderlineLeft(btnRect.left - containerRect.left);
    setUnderlineWidth(btnRect.width);
  }, [openMenu]);

  // Handler für die Trigger-Zeile
  const onEnterTrigger = (id: MenuId) => scheduleOpen(id);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      {/* Top-Bar */}
      <nav ref={barRef} className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold">
            <span className="text-white">FindYourGame</span>
            <span className="text-orange-500">.ch</span>
          </Link>

          {/* Mitte: Home + Menüs + News */}
          <div className="relative hidden items-center gap-6 md:flex"
               onMouseLeave={scheduleClose}>
            <Link href="/" className={`px-2 py-1 rounded-lg transition ${isActive("/")}`}
                  onMouseEnter={() => scheduleOpen(null)}>
              Home
            </Link>

            {/* Releases */}
            <button ref={triggers.releases}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("releases")}>
              Releases
            </button>

            {/* Popular */}
            <button ref={triggers.popular}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("popular")}>
              Popular
            </button>

            {/* Platforms */}
            <button ref={triggers.platforms}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("platforms")}>
              Platforms
            </button>

            {/* Genres */}
            <button ref={triggers.genres}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
              onMouseEnter={() => onEnterTrigger("genres")}>
              Genres
            </button>

            <Link href="/news" className={`px-2 py-1 rounded-lg transition ${isActive("/news")}`}
                  onMouseEnter={() => scheduleOpen(null)}>
              News
            </Link>

            {/* Unterstreichungs-Indikator */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-orange-400 transition-all duration-200"
                 style={{ width: underlineWidth, transform: `translateX(${underlineLeft}px)` }}
            />
          </div>

          {/* rechts: Favoriten + Zahnrad */}
          <div className="relative flex items-center gap-2">
            <Link href="/favorites" className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" aria-label="Favoriten" title="Favoriten">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </Link>
            <Link href="/settings" className="rounded-xl border border-white/15 p-1.5 opacity-90 hover:opacity-100 transition" aria-label="Einstellungen" title="Einstellungen">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.48.48,0,0,0,.11-.61l-2-3.46a.49.49,0,0,0-.6-.22l-2.49,1a7.16,7.16,0,0,0-1.63-.94l-.38-2.65A.49.49,0,0,0,12.23,2H9.77a.49.49,0,0,0-.48.41L9,5.06a7.16,7.16,0,0,0-1.63.94l-2.49-1a.49.49,0,0,0-.6.22l-2,3.46a.48.48,0,0,0,.11.61L4.91,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.8,14.59a.48.48,0,0,0-.11.61l2,3.46a.49.49,0,0,0,.6.22l2.49-1a.49.49,0,0,0,1.63.94l.38,2.65a.49.49,0,0,0,.48.41h2.46a.49.49,0,0,0,.48-.41l.38-2.65a7.16,7.16,0,0,0,1.63-.94l2.49,1a.49.49,0,0,0,.6-.22l2-3.46a.48.48,0,0,0-.11-.61ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Submenu-Wrapper: nimmt Höhe ein → schiebt Inhalt runter */}
      <div
        ref={subWrapRef}
        className="mx-auto max-w-7xl px-4 overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: subHeight }}
        onMouseEnter={() => openMenu && scheduleOpen(openMenu)}
        onMouseLeave={scheduleClose}
      >
        {/* Inner misst die tatsächliche Zielhöhe */}
        <div ref={subInnerRef}>
          {openMenu && (
            <div
              className="relative rounded-2xl text-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              style={{
                width: subWidth,
                marginLeft: subLeft,
                background: "linear-gradient(180deg,#f97316 0%, #fb923c 100%)"
              }}
            >
              {/* Caret (kleines Dreieck) */}
              <div
                className="absolute -top-2 h-4 w-4 rotate-45"
                style={{ left: caretLeft, background: "#f97316" }}
              />

              {/* Inhalt */}
              {openMenu === "releases" && (
                <div className="grid gap-2 p-3">
                  <Link href="/releases/calendar" className="rounded-xl px-4 py-3 hover:bg-black/10">Release Calendar</Link>
                  <Link href="/releases/this-week" className="rounded-xl px-4 py-3 hover:bg-black/10">This Week</Link>
                </div>
              )}

              {openMenu === "popular" && (
                <div className="grid gap-2 p-3">
                  <Link href="/popular/best-of-year" className="rounded-xl px-4 py-3 hover:bg-black/10">Best of the Year</Link>
                  <Link href="/popular/top-100" className="rounded-xl px-4 py-3 hover:bg-black/10">All-time Top 100</Link>
                </div>
              )}

              {openMenu === "platforms" && (
                <div className="grid grid-cols-2 gap-2 p-3">
                  <Link href="/platforms/pc" className="rounded-xl px-4 py-3 hover:bg-black/10">PC</Link>
                  <Link href="/platforms/playstation" className="rounded-xl px-4 py-3 hover:bg-black/10">PlayStation</Link>
                  <Link href="/platforms/xbox" className="rounded-xl px-4 py-3 hover:bg-black/10">Xbox</Link>
                  <Link href="/platforms/nintendo-switch" className="rounded-xl px-4 py-3 hover:bg-black/10">Nintendo Switch</Link>
                </div>
              )}

              {openMenu === "genres" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
                  <Link href="/genres/rpg" className="rounded-xl px-4 py-3 hover:bg-black/10">RPG</Link>
                  <Link href="/genres/action" className="rounded-xl px-4 py-3 hover:bg-black/10">Action</Link>
                  <Link href="/genres/adventure" className="rounded-xl px-4 py-3 hover:bg-black/10">Adventure</Link>
                  <Link href="/genres/indie" className="rounded-xl px-4 py-3 hover:bg-black/10">Indie</Link>
                  <Link href="/genres/racing" className="rounded-xl px-4 py-3 hover:bg-black/10">Racing</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
