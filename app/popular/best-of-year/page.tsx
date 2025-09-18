import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

export default function BestOfYearPage() {
  const all = generateMockGames(200);
  const year = new Date().getFullYear();
  const list = all.filter(g => new Date(g.release).getFullYear() === year)
                  .sort((a,b)=> b.rating - a.rating);
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Best of {year}</h1>
      <GameGrid games={list} />
    </main>
  );
}
