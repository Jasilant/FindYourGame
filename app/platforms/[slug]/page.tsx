import BrowseGrid from "../../../components/BrowseGrid";
import { mockPlatforms } from "../../../lib/mock";

export const metadata = { title: "Platforms | FindYourGame" };

// absichtlich locker typisiert, um Next 15 TS-Signatur-Ärger zu vermeiden
export default function Page({ params }: any) {
  const slug: string = params?.slug ?? "pc";
  const games = mockPlatforms(slug);
  const labelMap: Record<string,string> = {
    "pc": "PC",
    "playstation": "PlayStation",
    "xbox": "Xbox",
    "nintendo-switch": "Nintendo Switch"
  };
  const title = `Platforms · ${labelMap[slug] ?? slug}`;
  return <BrowseGrid title={title} games={games} />;
}
