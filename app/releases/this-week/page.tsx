import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";
export const dynamic = "force-dynamic";

export default function ReleasesThisWeek() {
  const games = generateMockGames(60).sort((a,b)=> b.rating - a.rating);
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Releases — This Week</h1>
      <GameGrid games={games} />
    </main>
  );
}
