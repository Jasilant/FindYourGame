import GameGrid from "../../components/GameGrid";
import { generateMockGames } from "../../lib/mockGames";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "") as string;
  const genre = (sp.genre ?? "") as string;
  const platform = (sp.platform ?? "") as string;
  const sort = (sp.sort ?? "") as string;

  let list = generateMockGames(200);

  if (q) list = list.filter(g => g.title.toLowerCase().includes(q.toLowerCase()));
  if (genre) list = list.filter(g => g.genre === genre.toLowerCase());
  if (platform) list = list.filter(g => g.platform === platform.toLowerCase());

  if (sort === "rating") list = list.sort((a,b)=> b.rating - a.rating);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Browse</h1>
      <GameGrid games={list} />
    </main>
  );
}
