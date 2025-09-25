import BrowseGrid from "../../../components/BrowseGrid";
import { mockPopularBestOfYear } from "../../../lib/mock";

export const metadata = { title: "Best of the Year | FindYourGame" };

export default function Page() {
  const games = mockPopularBestOfYear();
  return <BrowseGrid title="Best of the Year" games={games} />;
}
