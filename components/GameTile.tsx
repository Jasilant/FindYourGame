'use client';

import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export type GameTileData = {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  platform?: string;
};

export default function GameTile({ game }: { game: GameTileData }) {
  const href = game.slug ? `/games/${game.slug}` : `/filter?q=${encodeURIComponent(game.name)}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="relative aspect-video w-full bg-white/10">
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center opacity-60">{game.name}</div>
        )}

        {/* Herz oben rechts */}
        <div className="absolute right-3 top-3">
          <FavoriteButton game={{ id: game.id, name: game.name, slug: game.slug, image: game.image, platform: game.platform }} size="sm" />
        </div>

        {/* subtiler Gradient unten */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="font-semibold">{game.name}</div>
          <div className="text-sm opacity-70">{game.platform ?? ""}</div>
        </div>
        <span className="rounded-lg border border-white/15 px-2 py-1 text-xs opacity-80">Öffnen</span>
      </div>
    </Link>
  );
}
