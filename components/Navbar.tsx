'use client';

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type MenuId = "releases" | "popular" | "platforms" | "genres" | null;

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href ? "text-orange-500" : "opacity-90 hover:opacity-100";

  // Hover-Status
  const [openMenu, setOpenMenu] = useState<MenuId>(null);

  // Referenzen auf Trigger und Container zum exakten Positionieren
  const barRef = useRef<HTMLDivElement>(null);
  const triggers = {
    releases: useRef<HTMLButtonElement>(null),
    popular: useRef<HTMLButtonElement>(null),
    platforms: useRef<HTMLButtonElement>(null),
    genres: useRef<HTMLButtonElement>(null),
  } as const;

  // Submenu-Container (nimmt Platz ein → schiebt Hero runter)
  const subWrapRef = useRef<HTMLDivElement>(null);
  const subInnerRef = useRef<HTMLDivElement>(null);

  // dynamische Werte: Höhe (für smooth pushdown) & linke Position des Panels
  const [subHeight, setSubHeight] = useState(0);
  const [subLeft, setSubLeft] = useState(0);
  const [subWidth, setSubWidth] = useState(520); // Defaultbreite, je nach Menü angepasst

  // Maus außerhalb von Nav+Submenu → schließen
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node) &&
          !subWrapRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousemove", onDoc);
    return () => document.removeEventListener("mousemove", onDoc);
  }, []);

  // Höhe animieren (push-down)
  useLayoutEffect(() => {
    const content = subInnerRef.current;
    const wrap = subWrapRef.current;
    if (!content || !wrap) return;
    // Zielhöhe messen (nur wenn offen)
    const target = openMenu ? content.scrollHeight : 0;
    // sanft animieren
    setSubHeight(target);
  }, [openMenu]);

  // Linke Position und Breite bestimmen → Panel direkt unter den Trigger setzen
  useLayoutEffect(() => {
    const wrap = subWrapRef.current;
    if (!wrap || !openMenu) return;

    const containerRect = wrap.getBoundingClientRect();
    const btn =
      openMenu === "releases" ? triggers.releases.current :
      openMenu === "popular" ? triggers.popular.current :
      openMenu === "platforms" ? triggers.platforms.current :
      openMenu === "genres" ? triggers.genres.current :
      null;

    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();

    // Wunschbreite je Menü
    const width =
      openMenu === "genres" ? 720 :
      openMenu === "platforms" ? 560 :
      520;
    setSubWidth(width);

    // Panel so ausrichten, dass seine linke Kante an der linken Kante des Buttons sitzt,
    // aber nicht aus dem Container läuft.
    const left = Math.max(
      0,
      Math.min(btnRect.left - containerRect.left, containerRect.width - width)
    );
    setSubLeft(left);
  }, [openMenu]);

  // Hover-Helfer
  const handleEnter = (id: MenuId) => setOpenMenu(id);
  const handleLeaveZone = (e: React.MouseEvent) => {
    // Schließen, wenn Maus die gesamte Zone (Trigger + Panel) verlässt
    // (eigene onMouseLeave auf dem gemeinsamen Wrapper)
    setOpenMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      {/* Top-Bar */}
      <nav ref={barRef} className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold">
          <span className="text-white">FindYourGame</span>
          <span className="text-orange-500">.ch</span>
        </Link>

        {/* Mitte: Home + Menüs + News */}
        <div
          className="relative hidden items-center gap-6 md:flex"
        >
          <Link href="/" className={`px-2 py-1 rounded-lg transition ${isActive("/")}`}>Home</Link>

          {/* Releases */}
          <div
            onMouseEnter={() => handleEnter("releases")}
            className="relative"
          >
            <button
              ref={triggers.releases}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
            >
              Releases
            </button>
          </div>

          {/* Popular */}
          <div
            onMouseEnter={() => handleEnter("popular")}
            className="relative"
          >
            <button
              ref={triggers.popular}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
            >
              Popular
            </button>
          </div>

          {/* Platforms */}
          <div
            onMouseEnter={() => handleEnter("platforms")}
            className="relative"
          >
            <button
              ref={triggers.platforms}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
            >
              Platforms
            </button>
          </div>

          {/* Genres */}
          <div
            onMouseEnter={() => handleEnter("genres")}
            className="relative"
          >
            <button
              ref={triggers.genres}
              className="px-2 py-1 rounded-lg opacity-90 transition hover:opacity-100"
            >
              Genres
            </button>
          </div>

          <Link href="/news" className={`px-2 py-1 rounded-lg transition ${isActive("/news")}`}>News</Link>
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
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.48.48,0,0,0,.11-.61l-2-3.46a.49.49,0,0,0-.6-.22l-2.49,1a7.16,7.16,0,0,0-1.63-.94l-.38-2.65A.49.49,0,0,0,12.23,2H9.77a.49.49,0,0,0-.48.41L9,5.06a7.16,7.16,0,0,0-1.63.94l-2.49-1a.49.49,0,0,0-.6.22l-2,3.46a.48.48,0,0,0,.11.61L4.91,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.8,14.59a.48.48,0,0,0-.11.61l2,3.46a.49.49,0,0,0,.6.22l2.49-1a7.16,7.16,0,0,0,1.63.94l.38,2.65a.49.49,0,0,0,.48.41h2.46a.49.49,0,0,0,.48-.41l.38-2.65a7.16,7.16,0,0,0,1.63-.94l2.49,1a.49.49,0,0,0,.6-.22l2-3.46a.48.48,0,0,0-.11-.61ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
          </Link>
        </div>
      </nav>

      {/* Submenu-Wrapper: nimmt Höhe ein → schiebt Inhalt runter */}
      <div
        ref={subWrapRef}
        onMouseLeave={handleLeaveZone}
        className="mx-auto max-w-7xl px-4 overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: subHeight }}
      >
        {/* Inner: hier drin wird tatsächliche Höhe gemessen */}
        <div ref={subInnerRef} className="relative pt-2 pb-4">
          {/* Panel */}
          {openMenu && (
            <div
              className="rounded-2xl text-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              style={{
                width: subWidth,
                marginLeft: subLeft,
                backgroundColor: '#fb923c' /* Tailwind orange-400/500 nah */,
              }}
              onMouseEnter={() => openMenu && setOpenMenu(openMenu)}
              onMouseLeave={handleLeaveZone}
            >
              {/* Inhalt je Menü */}
              {openMenu === "releases" && (
                <div className="p-3">
                  <Link href="/releases/calendar" className="block rounded-xl px-4 py-3 hover:bg-black/10">Release Calendar</Link>
                  <Link href="/releases/this-week" className="block rounded-xl px-4 py-3 hover:bg-black/10">This Week</Link>
                </div>
              )}

              {openMenu === "popular" && (
                <div className="p-3">
                  <Link href="/popular/best-of-year" className="block rounded-xl px-4 py-3 hover:bg-black/10">Best of the Year</Link>
                  <Link href="/popular/top-100" className="block rounded-xl px-4 py-3 hover:bg-black/10">All-time Top 100</Link>
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
                <div className="grid grid-cols-2 gap-2 p-3">
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
