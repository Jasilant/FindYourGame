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

/* Listen für Browse-Seiten */
export function mockPopularBestOfYear(): BrowseGame[] { return make("popular","best","Best of the Year"); }
export function mockPopularTop100(): BrowseGame[]     { return make("popular","top","Top Game", 18); }

export function mockPlatforms(slug: string): BrowseGame[] {
  const map: Record<string,string> = { pc: "PC Game", playstation: "PlayStation Game", xbox: "Xbox Game", "nintendo-switch": "Switch Game" };
  const label = map[slug] ?? "Platform Game";
  return make("platform", slug, label);
}

export function mockGenres(slug: string): BrowseGame[] {
  const label = `${slug.charAt(0).toUpperCase()}${slug.slice(1)} Game`;
  return make("genre", slug, label);
}

export function mockReleasesThisWeek(): BrowseGame[]  { return make("releases","week","New Release"); }
export function mockReleasesCalendar(): BrowseGame[]  { return make("releases","calendar","Calendar Title"); }

/* ---------- Detail-Daten ---------- */

export type GameDetail = {
  id: string;
  slug: string;
  name: string;
  hero: string;
  short: string;
  platforms: string[];
  genres: string[];
  releaseDate: string;
  rating: number; // 0..100
  screenshots: string[];
  videos: { title: string; youtubeId: string }[];
};

/** Erzeugt deterministische Detaildaten aus einem Slug (Demo) */
export function mockGameDetail(slug: string): GameDetail {
  const baseSeed = `detail-${slug}`;
  const name = slug.split("-").map(w => w[0]?.toUpperCase() + w.slice(1)).join(" ");
  const platforms = ["PC", "PlayStation", "Xbox", "Switch"].filter((_, i) => (hash(slug) + i) % 2 === 0);
  const genres = ["Action", "RPG", "Indie", "Adventure", "Strategy"].filter((_, i) => (hash(slug) + i) % 3 === 0);

  return {
    id: `game-${slug}`,
    slug,
    name,
    hero: pic(`${baseSeed}-hero`),
    short: "Kurze Beschreibung / Pitch des Spiels. Hier kommen Key Facts und der Ton deiner Marke zum Tragen.",
    platforms: platforms.length ? platforms : ["PC"],
    genres: genres.length ? genres : ["Action"],
    releaseDate: "2024-11-15",
    rating: 86,
    screenshots: [
      pic(`${baseSeed}-sc1`),
      pic(`${baseSeed}-sc2`),
      pic(`${baseSeed}-sc3`),
      pic(`${baseSeed}-sc4`)
    ],
    videos: [
      { title: "Gameplay Trailer", youtubeId: "M7lc1UVf-VE" },
      { title: "Launch Trailer",   youtubeId: "ysz5S6PUM-U" }
    ]
  };
}

/* simplistischer String-Hash für die Demo */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
