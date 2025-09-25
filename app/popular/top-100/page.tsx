import ThemedPage from "../../../components/ThemedPage";
import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockPopularTop100 } from "../../../lib/mock";

export const metadata = { title: "All-time Top 100 | FindYourGame" };

export default function Page() {
  const games = mockPopularTop100();
  return (
    <ThemedPage kind="popular">
      <ThemedHeader kind="popular" title="All-time Top 100" />
      <BrowseGrid title="All-time Top 100" games={games} hideTitle />
    </ThemedPage>
  );
}
