'use client';

import Link from 'next/link';
import Image from 'next/image';
import SettingsMenu from './SettingsMenu';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 md:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-fox-pixel-coarse.svg"
            alt="FindYourGame"
            width={28}
            height={28}
            priority
          />
          <span className="hidden sm:inline text-white font-semibold">FindYourGame.ch</span>
        </Link>

        {/* Center: Tabs */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-zinc-300 hover:text-white">Home</Link>
          <Link href="/filter" className="text-zinc-300 hover:text-white">Spiele-Filter</Link>
          <Link href="/news" className="text-zinc-300 hover:text-white">News</Link>
          <Link href="/browse" className="text-zinc-300 hover:text-white">Browse</Link>
        </nav>

        {/* Right: Favorites + Settings */}
        <div className="flex items-center gap-2">
          <Link
            href="/favorites"
            className="rounded-xl px-3 py-2 text-zinc-200 hover:text-white hover:bg-white/5 ring-1 ring-white/10"
            title="Favoriten"
          >
            ❤
          </Link>
          <SettingsMenu />
        </div>
      </div>
    </header>
  );
}
