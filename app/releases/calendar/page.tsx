import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

export default function ReleaseCalendarPage() {
  const all = generateMockGames(200);
  const today = new Date();
  const in90 = new Date(); in90.setDate(in90.getDate()+90);
  const list = all.filter(g => {
    const d = new Date(g.release);
    return d >= today && d <= in90;
  }).sort((a,b) => (a.release > b.release ? 1 : -1)); // bald zuerst
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Release Calendar (nächste 90 Tage)</h1>
      <GameGrid games={list} />
    </main>
  );
}
