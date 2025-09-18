import GameGrid from "../../../components/GameGrid";
import { generateMockGames } from "../../../lib/mockGames";

export const dynamic = "force-dynamic";

function mapSlug(slug: string): "pc" | "ps5" | "xbox" | "switch" | null {
  const s = slug.toLowerCase();
  if (s === "pc") return "pc";
  if (s === "playstation" || s === "ps" || s === "ps5") return "ps5";
  if (s === "xbox" || s === "x-box") return "xbox";
  if (s === "nintendo-switch" || s === "switch") return "switch";
  return null;
}

export default function PlatformPage({ params }: { params: { slug: string } }) {
  const key = mapSlug(params.slug);
  const all = generateMockGames(200);
  const list = key ? all.filter(g => g.platform === key).sort((a,b)=> b.rating - a.rating) : [];
  const title = key ? (key === "ps5" ? "PlayStation" : key.toUpperCase()) : "Unbekannte Plattform";
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <GameGrid games={list} />
    </main>
  );
}
