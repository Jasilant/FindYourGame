export type BrowseGame = {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  platform?: string;
};

function pic(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/450`;
}

function make(kind: string, tag: string, label: string, count = 12): BrowseGame[] {
  const items: BrowseGame[] = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: `${kind}-${tag}-${i}`,
      name: `${label} ${i}`,
      slug: `${tag}-${i}`,
      image: pic(`${kind}-${tag}-${i}`),
      platform: tag.toUpperCase()
    });
    }
  return items;
}

export function mockPopularBestOfYear(): BrowseGame[] {
  return make("popular", "best", "Best of the Year");
}

export function mockPopularTop100(): BrowseGame[] {
  return make("popular", "top", "Top Game");
}

export function mockPlatforms(slug: string): BrowseGame[] {
  const map: Record<string,string> = {
    "pc": "PC Game",
    "playstation": "PlayStation Game",
    "xbox": "Xbox Game",
    "nintendo-switch": "Switch Game"
  };
  const label = map[slug] ?? "Platform Game";
  return make("platform", slug, label);
}

export function mockGenres(slug: string): BrowseGame[] {
  const label = `${slug.charAt(0).toUpperCase()}${slug.slice(1)} Game`;
  return make("genre", slug, label);
}

export function mockReleasesThisWeek(): BrowseGame[] {
  return make("releases", "week", "New Release");
}

export function mockReleasesCalendar(): BrowseGame[] {
  return make("releases", "calendar", "Calendar Title");
}
