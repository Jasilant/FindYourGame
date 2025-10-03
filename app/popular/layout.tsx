// app/popular/layout.tsx
export const dynamic = 'force-dynamic';
// Optional-härtung (normal nicht nötig):
// export const revalidate = 0;
// export const fetchCache = 'default-no-store';

export default function PopularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nur durchreichen – keine Änderungen an deinem UI.
  return children;
}
