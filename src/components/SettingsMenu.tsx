'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

type Lang = { code: string; label: string };
const LANGS: Lang[] = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: 'Mandarin (中文)' },
  { code: 'ja', label: '日本語' }
];

const LS_LANG = 'findyourgame:lang';

export default function SettingsMenu() {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<string>('de');

  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_LANG);
      if (stored) setLang(stored);
    } catch {}
  }, []);

  useLayoutEffect(() => {
    function place() {
      const el = btnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const MENU_W = 224; // w-56
      const top = Math.round(r.bottom + window.scrollY + 8);
      const left = Math.round(r.right + window.scrollX - MENU_W);
      setPos({ top, left, width: MENU_W });
    }
    if (open) {
      place();
      window.addEventListener('resize', place);
      window.addEventListener('scroll', place, true);
      return () => {
        window.removeEventListener('resize', place);
        window.removeEventListener('scroll', place, true);
      };
    }
  }, [open]);

  useEffect(() => {
    function onOutside(e: PointerEvent) {
      const btn = btnRef.current;
      if (!btn) return;
      const target = e.target as Node | null;
      const portal = document.getElementById('settings-menu-portal');
      const insideBtn = btn.contains(target as Node);
      const insidePortal = portal ? portal.contains(target as Node) : false;
      if (!insideBtn && !insidePortal) {
        setOpen(false);
        setLangOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        setLangOpen(false);
      }
    }
    if (open) {
      window.addEventListener('pointerdown', onOutside);
      window.addEventListener('keydown', onEsc);
      return () => {
        window.removeEventListener('pointerdown', onOutside);
        window.removeEventListener('keydown', onEsc);
      };
    }
  }, [open]);

  function onToggle(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen(v => !v);
    if (open) setLangOpen(false);
  }

  function onLangPick(code: string) {
    setLang(code);
    try { localStorage.setItem(LS_LANG, code); } catch {}
    setLangOpen(false);
  }

  function onLogout() {
    setOpen(false);
    // zentraler Logout über Route (sauber, erweiterbar)
    router.push('/logout');
  }

  const dropdown = open
    ? createPortal(
        <div
          id="settings-menu-portal"
          style={{ position: 'absolute', top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
        >
          <div className="rounded-2xl border border-white/10 bg-black/90 p-2 shadow-xl backdrop-blur" role="menu">
            <Link
              href="/profile"
              className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5"
              role="menuitem"
              onClick={() => { setOpen(false); }}
            >
              <span>Profil</span>
              <span className="text-xs opacity-60">Konto</span>
            </Link>

            <Link
              href="/settings"
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5"
              role="menuitem"
              onClick={() => { setOpen(false); }}
            >
              <span>Einstellungen</span>
              <span className="text-xs opacity-60">Allgemein</span>
            </Link>

            <div className="mt-1">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5"
                aria-haspopup="true"
                aria-expanded={langOpen}
                onClick={() => setLangOpen(v => !v)}
              >
                <span>Sprache</span>
                <span className="text-xs opacity-80">
                  {LANGS.find(l => l.code === lang)?.label ?? 'Deutsch'}
                </span>
              </button>

              {langOpen && (
                <div className="mt-2 rounded-xl border border-white/10 bg-black/80 p-1">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      className={`w-full rounded-lg px-3 py-2 text-left hover:bg-white/5 ${l.code === lang ? 'bg-white/5' : ''}`}
                      onClick={() => onLangPick(l.code)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-2 border-t border-white/10 pt-2">
              <button
                type="button"
                className="w-full rounded-xl px-3 py-2 text-left text-red-400 hover:bg-red-500/10"
                onClick={onLogout}
              >
                Ausloggen
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onToggle}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 hover:border-orange-400"
        title="Einstellungen"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.06a2 2 0 0 1-2.83 2.83l-.06-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .55l-.06.06a2 2 0 0 1-2.83 0l-.06-.06a1.7 1.7 0 0 0-1-.55 1.7 1.7 0 0 0-1.87.34l-.06.05a2 2 0 0 1-2.83-2.83l.05-.06A1.7 1.7 0 0 0 4.6 15c0-.39-.14-.77-.39-1.06l-.05-.06a2 2 0 0 1 2.83-2.83l.06.05c.29.25.67.39 1.06.39s.77-.14 1.06-.39l.06-.05a2 2 0 0 1 2.83 0l.06.05c.29.25.67.39 1.06.39s.77-.14 1.06-.39l.06-.05a2 2 0 0 1 2.83 2.83l-.05.06c-.25.29-.39.67-.39 1.06Z" />
        </svg>
      </button>

      {dropdown}
    </div>
  );
}
