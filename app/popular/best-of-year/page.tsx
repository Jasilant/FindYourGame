import ThemedPage from "../../../components/ThemedPage";
import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockPopularBestOfYear } from "../../../lib/mock";

export const metadata = { title: "Best of the Year | FindYourGame" };

export default function Page() {
  const games = mockPopularBestOfYear();
  return (
    <ThemedPage kind="popular">
      <ThemedHeader kind="popular" title="Best of the Year" />
      <BrowseGrid title="Best of the Year" games={games} hideTitle />
    </ThemedPage>
  );
}
