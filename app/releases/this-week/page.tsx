import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockReleasesThisWeek } from "../../../lib/mock";

export const metadata = { title: "Releases · This Week | FindYourGame" };

export default function Page() {
  const games = mockReleasesThisWeek();
  return (
    <>
      <ThemedHeader kind="releases" title="Releases · This Week" />
      <BrowseGrid title="Releases · This Week" games={games} hideTitle />
    </>
  );
}
