'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Cog, User2, SlidersHorizontal, Globe2, LogOut, Check, ChevronDown } from 'lucide-react';
import { useUI } from '@/store/ui';

const LANGS = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文 (Mandarin)' },
  { code: 'ja', label: '日本語' },
] as const;

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { language, setLanguage, logout } = useUI();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenLang(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setOpenLang(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-zinc-200 hover:text-white hover:bg-white/5 ring-1 ring-white/10"
        title="Einstellungen"
      >
        <Cog className="h-5 w-5" />
      </button>

      {/* Dropdown */}
      <div
        className={[
          'absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden',
          'bg-black/80 backdrop-blur-md shadow-2xl ring-1 ring-white/10',
          'transition origin-top-right',
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        ].join(' ')}
        role="menu"
      >
        <MenuLink href="/profile" icon={<User2 className="h-4 w-4" />} label="Profil" />
        <MenuLink href="/settings" icon={<SlidersHorizontal className="h-4 w-4" />} label="Einstellungen" />

        {/* Sprache */}
        <button
          onClick={() => setOpenLang((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-zinc-200 hover:text-white hover:bg-white/5"
          role="menuitem"
        >
          <span className="inline-flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            Sprache
          </span>
          <ChevronDown className={['h-4 w-4 transition', openLang ? 'rotate-180' : ''].join(' ')} />
        </button>

        {/* Language Panel */}
        <div className={['px-2 pb-2', openLang ? 'block' : 'hidden'].join(' ')}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code as any);
              }}
              className={[
                'w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-sm',
                'text-zinc-300 hover:text-white hover:bg-white/5'
              ].join(' ')}
            >
              <span>{l.label}</span>
              {language === l.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>

        <div className="h-px bg-white/10" />

        <button
          onClick={() => logout()}
          role="menuitem"
          className="w-full flex items-center gap-2 px-3 py-2 text-left text-zinc-200 hover:text-white hover:bg-white/5"
        >
          <LogOut className="h-4 w-4" />
          Ausloggen
        </button>
      </div>
    </div>
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: JSX.Element; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-zinc-200 hover:text-white hover:bg-white/5"
      role="menuitem"
    >
      {icon}
      {label}
    </Link>
  );
}
