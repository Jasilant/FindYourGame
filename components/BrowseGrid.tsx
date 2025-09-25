'use client';

import GameTile, { GameTileData } from "./GameTile";

export default function BrowseGrid({
  title,
  games,
  hideTitle = false
}: { title: string; games: GameTileData[]; hideTitle?: boolean }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {!hideTitle && <h1 className="mb-6 text-3xl font-extrabold">{title}</h1>}
      {games.length === 0 ? (
        <p className="opacity-80">Keine Einträge gefunden.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {games.map((g) => <GameTile key={g.id} game={g} />)}
        </div>
      )}
    </main>
  );
}
