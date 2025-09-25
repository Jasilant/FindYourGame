export type CanonicalGenre =
  | "action" | "adventure" | "rpg" | "shooter" | "strategy"
  | "simulation" | "sports" | "platformer" | "puzzle"
  | "horror-survival" | "fighting" | "indie" | "free";

export const GENRE_META: Record<CanonicalGenre, { label: string; synonyms: string[] }> = {
  action: {
    label: "Action",
    synonyms: ["action", "brawler", "hack and slash", "hack-and-slash", "beat em up", "beat 'em up", "stealth", "action-adventure", "third person action"]
  },
  adventure: {
    label: "Adventure",
    synonyms: ["adventure", "narrative", "story rich", "walking sim", "point and click", "point-and-click", "graphic adventure"]
  },
  rpg: {
    label: "RPG",
    synonyms: ["rpg", "jrpg", "arpg", "crpg", "role-playing", "role playing", "roguelike", "roguelite", "soulslike"]
  },
  shooter: {
    label: "Shooter",
    synonyms: ["shooter", "fps", "first-person shooter", "tps", "third-person shooter", "shmup", "shoot em up", "bullet hell"]
  },
  strategy: {
    label: "Strategy",
    synonyms: ["strategy", "rts", "real-time strategy", "tbs", "turn-based", "4x", "tactics", "tower defense", "grand strategy"]
  },
  simulation: {
    label: "Simulation",
    synonyms: ["simulation", "sim", "life sim", "vehicle sim", "management", "builder", "tycoon", "farming", "city builder"]
  },
  sports: {
    label: "Sports & Racing",
    synonyms: ["sports", "sport", "soccer", "football", "basketball", "fifa", "nba", "racing", "driving", "racer", "rally", "motorsport"]
  },
  platformer: {
    label: "Platformer",
    synonyms: ["platformer", "platform", "metroidvania", "runner"]
  },
  puzzle: {
    label: "Puzzle",
    synonyms: ["puzzle", "logic", "match-3", "sokoban", "block", "physics"]
  },
  "horror-survival": {
    label: "Horror / Survival",
    synonyms: ["horror", "survival", "survival horror", "zombie"]
  },
  fighting: {
    label: "Fighting",
    synonyms: ["fighting", "fight", "versus", "arena fighter"]
  },
  indie: {
    label: "Indie",
    synonyms: ["indie", "indie game", "independent"]
  },
  free: {
    label: "Free",
    synonyms: ["free", "free to play", "free-to-play", "f2p", "kostenlos"]
  }
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9+ ]+/g, " ").replace(/\s+/g, " ").trim();
}

const SYN_MAP: Array<{canon: CanonicalGenre; test: (t: string)=>boolean}> =
  (Object.keys(GENRE_META) as CanonicalGenre[]).flatMap(canon => {
    const keys = [canon, ...GENRE_META[canon].synonyms].map(slugify);
    return keys.map(k => ({
      canon,
      test: (t: string) => slugify(t) === k
          || (canon==="shooter" && /\b(fps|tps)\b/.test(slugify(t)))
          || (canon==="rpg" && /\b(jrpg|arpg|crpg|roguelike|roguelite)\b/.test(slugify(t)))
          || (canon==="strategy" && /\b(rts|tbs|4x|tactics)\b/.test(slugify(t)))
          || (canon==="sports" && /\b(racing|racer|driving)\b/.test(slugify(t)))
    }));
  });

export type RawGenreInput = {
  genres?: string[];      // z.B. RAWG/IGDB Genres
  tags?: string[];        // z.B. Steam Tags
  categories?: string[];  // Store-Kategorien
  price?: number | null;  // 0 => free
  isFree?: boolean;       // true => free
};

export function normalizeGenres(raw: RawGenreInput): CanonicalGenre[] {
  const pool = new Set<string>();
  for (const list of [raw.genres, raw.tags, raw.categories]) {
    (list ?? []).forEach(t => pool.add(t));
  }
  const out = new Set<CanonicalGenre>();

  // map Synonyme -> Kanon
  pool.forEach(t => {
    for (const entry of SYN_MAP) {
      if (entry.test(t)) { out.add(entry.canon); break; }
    }
  });

  // Sonderfall: fighting oft als Action – falls nicht separat getroffen, übernehmen wir Action
  if (out.has("fighting")) out.add("action");

  // Kostenlos?
  if (raw.isFree || raw.price === 0) out.add("free");
  for (const t of pool) {
    if (/\bfree\b|\bfree[- ]to[- ]play\b|\bf2p\b|\bfrei\b|\bkostenlos\b/i.test(t)) {
      out.add("free");
    }
  }

  // Minimal halten: wenn action-adjacent ohne Adventure, lassen wir "adventure" nur drin, wenn explizit vorhanden
  // (Hier bewusst nichts aggressiv entfernen – du willst zuverlässige Mehrfach-Zuordnung)

  // Für stabile Reihenfolge etwas sorten
  const order: CanonicalGenre[] = ["free","action","adventure","rpg","shooter","strategy","simulation","sports","platformer","puzzle","horror-survival","fighting","indie"];
  return Array.from(out).sort((a,b)=>order.indexOf(a)-order.indexOf(b));
}



