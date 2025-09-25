import ThemedHeader from "../../../components/ThemedHeader";
import BrowseGrid from "../../../components/BrowseGrid";
import { mockReleasesCalendar } from "../../../lib/mock";

export const metadata = { title: "Releases · Calendar | FindYourGame" };

export default function Page() {
  const games = mockReleasesCalendar();
  return (
    <>
      <ThemedHeader kind="releases" title="Releases · Calendar" />
      <BrowseGrid title="Releases · Calendar" games={games} hideTitle />
    </>
  );
}
