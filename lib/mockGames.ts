export type Game = {
  id: number;
  title: string;
  genre: "rpg" | "action" | "adventure" | "indie" | "racing";
  platform: "pc" | "ps5" | "xbox" | "switch";
  release: string; // YYYY-MM-DD
  rating: number;  // 0..100
};

const GENRES: Game["genre"][] = ["rpg","action","adventure","indie","racing"];
const PLATFORMS: Game["platform"][] = ["pc","ps5","xbox","switch"];

function rand(seed: number) {
  // simple deterministic rng for stable data between builds
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockGames(count = 120): Game[] {
  const baseDate = new Date("2023-01-01");
  const out: Game[] = [];
  for (let i = 1; i <= count; i++) {
    const genre = GENRES[i % GENRES.length];
    const platform = PLATFORMS[(i * 2) % PLATFORMS.length];
    const d = new Date(baseDate);
    d.setDate(d.getDate() + (i * 11) % 700);
    const rating = Math.floor(60 + rand(i) * 40); // 60..100
    out.push({
      id: i,
      title: `Game #${i} ${genre.toUpperCase()} ${platform.toUpperCase()}`,
      genre,
      platform,
      release: d.toISOString().slice(0,10),
      rating
    });
  }
  return out;
}
