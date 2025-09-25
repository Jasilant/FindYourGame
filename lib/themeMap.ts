export type ThemeKind = "platform" | "genre" | "popular" | "releases";

/** Banner-Klasse (oben) – bleibt bestehen */
export function themeClassFor(kind: ThemeKind, slug?: string) {
  if (kind === "platform") {
    const s = (slug ?? "").toLowerCase();
    if (s === "playstation") return "theme-banner theme--playstation";
    if (s === "xbox")        return "theme-banner theme--xbox";
    if (s === "pc")          return "theme-banner theme--pc";
    if (s === "nintendo-switch") return "theme-banner theme--nintendo";
    return "theme-banner theme--platform";
  }
  if (kind === "genre")     return `theme-banner theme--genre-${(slug ?? "").toLowerCase()}`;
  if (kind === "popular")   return "theme-banner theme--popular";
  if (kind === "releases")  return "theme-banner theme--releases";
  return "theme-banner";
}

/** NEU: Seitenweite Klasse für den Hintergrund + Textfarben */
export function pageClassFor(kind: ThemeKind, slug?: string) {
  if (kind === "platform") {
    const s = (slug ?? "").toLowerCase();
    if (s === "playstation")      return "page theme-page theme-page--playstation";
    if (s === "xbox")             return "page theme-page theme-page--xbox";
    if (s === "pc")               return "page theme-page theme-page--pc";
    if (s === "nintendo-switch")  return "page theme-page theme-page--nintendo";
    return "page theme-page theme-page--platform";
  }
  if (kind === "genre")     return `page theme-page theme-page--genre-${(slug ?? "").toLowerCase()}`;
  if (kind === "popular")   return "page theme-page theme-page--popular";
  if (kind === "releases")  return "page theme-page theme-page--releases";
  return "page theme-page";
}
