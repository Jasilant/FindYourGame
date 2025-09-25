import ThemedPage from "../../../components/ThemedPage";
import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockGenres } from "../../../lib/mock";

export const metadata = { title: "Genres | FindYourGame" };

export default function Page({ params }: any) {
  const slug: string = params?.slug ?? "rpg";
  const games = mockGenres(slug);
  const title = `Genres · ${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (
    <ThemedPage kind="genre" slug={slug}>
      <ThemedHeader kind="genre" slug={slug} title={title} />
      <BrowseGrid title={title} games={games} hideTitle />
    </ThemedPage>
  );
}
