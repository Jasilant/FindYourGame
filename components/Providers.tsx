'use client';

import { FavoritesProvider } from "../lib/favorites";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
    </FavoritesProvider>
  );
}
