'use client';

import Link from "next/link";
import { useFavorites } from "../../lib/favorites";

export default function FavoritesPage() {
  const { favorites, remove } = useFavorites();

  if (favorites.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="mb-3 text-3xl font-extrabold">Deine Favoriten</h1>
        <p className="opacity-80">Noch nichts gespeichert. Stöbere und füge Spiele mit dem Herz hinzu.</p>
        <div className="mt-6">
          <Link href="/" className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">Zur Startseite</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold">Deine Favoriten</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {favorites.map(game => (
          <div key={game.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="aspect-video w-full bg-white/10">
              {game.image ? (
                // Standard <img> – reicht hier
                <img src={game.image} alt={game.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center opacity-60">{game.name}</div>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="font-semibold">{game.name}</div>
                <div className="text-sm opacity-70">{game.platform ?? ""}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={game.slug ? `/games/${game.slug}` : `/filter?q=${encodeURIComponent(game.name)}`}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100"
                >
                  Öffnen
                </Link>
                <button
                  onClick={() => remove(game.id)}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-sm opacity-90 hover:opacity-100"
                >
                  Entfernen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
