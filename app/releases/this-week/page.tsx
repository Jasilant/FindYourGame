import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

function startOfWeek(d: Date) { const x = new Date(d); const day = (x.getDay()+6)%7; x.setDate(x.getDate()-day); x.setHours(0,0,0,0); return x; }
function endOfWeek(d: Date) { const s = startOfWeek(d); const e = new Date(s); e.setDate(s.getDate()+6); e.setHours(23,59,59,999); return e; }

export default function ThisWeekPage() {
  const all = generateMockGames(200);
  const s = startOfWeek(new Date());
  const e = endOfWeek(new Date());
  const list = all.filter(g => {
    const d = new Date(g.release);
    return d >= s && d <= e;
  }).sort((a,b)=> (a.release > b.release ? 1 : -1));
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Releases – Diese Woche</h1>
      <GameGrid games={list} />
    </main>
  );
}
