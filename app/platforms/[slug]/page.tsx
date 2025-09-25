import ThemedPage from "../../../components/ThemedPage";
import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockPlatforms } from "../../../lib/mock";

export const metadata = { title: "Platforms | FindYourGame" };

export default function Page({ params }: any) {
  const slug: string = params?.slug ?? "pc";
  const games = mockPlatforms(slug);
  const labelMap: Record<string,string> = {
    "pc": "PC", "playstation": "PlayStation", "xbox": "Xbox", "nintendo-switch": "Nintendo Switch"
  };
  const title = `Platforms · ${labelMap[slug] ?? slug}`;
  return (
    <ThemedPage kind="platform" slug={slug}>
      <ThemedHeader kind="platform" slug={slug} title={title} />
      <BrowseGrid title={title} games={games} hideTitle />
    </ThemedPage>
  );
}
