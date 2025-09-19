import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";
export const dynamic = "force-dynamic";

export default function ReleaseCalendarPage() {
  const games = generateMockGames(200).sort((a,b)=> a.title.localeCompare(b.title));
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Release Calendar</h1>
      <GameGrid games={games} />
    </main>
  );
}
