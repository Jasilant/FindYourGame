import { normalizeGenres, type CanonicalGenre } from "./genres";

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
  rawGenres: string[];           // Rohdaten (Simulation einer API)
  genres: CanonicalGenre[];      // kanonische Genres (inkl. 'free' bei gratis)
  releaseDate: string;
  rating: number;                // 0..100
  screenshots: string[];
  videos: { title: string; youtubeId: string }[];
  price?: number | null;
  isFree?: boolean;
};

/** Erzeugt deterministische Detaildaten aus einem Slug (Demo) */
export function mockGameDetail(slug: string): GameDetail {
  const baseSeed = `detail-${slug}`;
  const name = slug.split("-").map(w => w[0]?.toUpperCase() + w.slice(1)).join(" ");
  const platforms = ["PC", "PlayStation", "Xbox", "Switch"].filter((_, i) => (hash(slug) + i) % 2 === 0);

  // simulierte Provider-Tags:
  const rawGenres = pickSome(
    ["Action","Adventure","RPG","Shooter","Strategy","Simulation","Sports","Racing","Platformer","Puzzle","Horror","Survival","Fighting","Indie"],
    slug
  );

  // Preis / Free-Logik
  let price: number | null = (hash(slug) % 5 === 0) ? 0 : 59;
  if (slug.startsWith("free-")) {
    price = 0;
  }
  const isFree = price === 0;

  const genres = normalizeGenres({
    genres: rawGenres,
    tags: rawGenres,   // als ob sie auch als Tags kämen
    price,
    isFree
  });

  return {
    id: `game-${slug}`,
    slug,
    name,
    hero: pic(`${baseSeed}-hero`),
    short: "Kurze Beschreibung / Pitch des Spiels. Hier kommen Key Facts und der Ton deiner Marke zum Tragen.",
    platforms: platforms.length ? platforms : ["PC"],
    rawGenres,
    genres,
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
    ],
    price,
    isFree
  };
}

/* utils */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function pickSome(pool: string[], seed: string) {
  const out: string[] = [];
  for (let i=0;i<pool.length;i++) {
    if ((hash(seed+i.toString()) % 7) === 0) out.push(pool[i]);
  }
  if (out.length===0) out.push("Action");
  return out;
}
