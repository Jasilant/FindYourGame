export type ThemeKind = "platform" | "genre" | "popular" | "releases";

/** Liefert CSS-Class für den Banner-Hintergrund */
export function themeClassFor(kind: ThemeKind, slug?: string) {
  if (kind === "platform") {
    const s = (slug ?? "").toLowerCase();
    if (s === "playstation") return "theme-banner theme--playstation";
    if (s === "xbox")        return "theme-banner theme--xbox";
    if (s === "pc")          return "theme-banner theme--pc";
    if (s === "nintendo-switch") return "theme-banner theme--nintendo";
    return "theme-banner theme--platform";
  }
  if (kind === "genre") {
    const s = (slug ?? "").toLowerCase();
    return `theme-banner theme--genre-${s}`;
  }
  if (kind === "popular")  return "theme-banner theme--popular";
  if (kind === "releases") return "theme-banner theme--releases";
  return "theme-banner";
}
