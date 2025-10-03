// app/favorites/layout.tsx
export const dynamic = 'force-dynamic';
// Optional zusätzlich (falls nötig):
// export const revalidate = 0;
// export const fetchCache = 'default-no-store';

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wir reichen nur durch – keine Änderungen an deinem bestehenden UI.
  return children;
}
