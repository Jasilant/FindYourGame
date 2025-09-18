import GameGrid from "../../../components/GameGrid";
import { generateMockGames, GENRES } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

export default function GenrePage({ params }: { params: { slug: string } }) {
  const g = params.slug.toLowerCase();
  const valid = (GENRES as string[]).includes(g);
  const all = generateMockGames(200);
  const list = valid ? all.filter(x => x.genre === g).sort((a,b)=> b.rating - a.rating) : [];
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Genre: {g.toUpperCase()}</h1>
      <GameGrid games={list} />
    </main>
  );
}
