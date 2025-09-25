'use client';

import { Favorite, useFavorites } from "../lib/favorites";

type Props = {
  game: Favorite;        // { id, name, slug?, image? }
  size?: "sm" | "md";
};

export default function FavoriteButton({ game, size = "md" }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(game.id);

  const s = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      aria-label={active ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
      aria-pressed={active}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(game); }}
      className={`group ${s} rounded-xl border transition
                  ${active ? "border-orange-400 bg-orange-500/20" : "border-white/15 hover:bg-white/10"}`}
      title={active ? "Entfernen" : "Favorisieren"}
    >
      <svg viewBox="0 0 24 24" className="mx-auto mt-2.5 h-5 w-5" fill="currentColor" aria-hidden="true">
        {active ? (
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        ) : (
          <path d="M12.1 18.55 12 18.65l-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C14.46 5.99 15.96 5 17.5 5 19.5 5 21 6.5 21 8.5c0 2.89-3.14 5.74-8.9 10.05z" />
        )}
      </svg>
    </button>
  );
}
