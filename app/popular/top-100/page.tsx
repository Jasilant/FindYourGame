import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

export default function Top100Page() {
  const list = generateMockGames(400).sort((a,b)=> b.rating - a.rating).slice(0,100);
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">All-time Top 100</h1>
      <GameGrid games={list} />
    </main>
  );
}
