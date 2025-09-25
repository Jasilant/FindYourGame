'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Favorite = {
  id: string;          // stabile ID (z. B. von deiner API)
  name: string;
  slug?: string;
  image?: string;
  platform?: string;
};

type Ctx = {
  favorites: Favorite[];
  isFavorite: (id: string) => boolean;
  add: (item: Favorite) => void;
  remove: (id: string) => void;
  toggle: (item: Favorite) => void;
  count: number;
};

const FavoritesContext = createContext<Ctx | null>(null);
const LS_KEY = "fyf:favorites:v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Initial laden
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  // Speichern
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Cross-Tab Sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY && e.newValue) {
        try { setFavorites(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo<Ctx>(() => ({
    favorites,
    count: favorites.length,
    isFavorite: (id: string) => favorites.some(f => f.id === id),
    add: (item: Favorite) => setFavorites(prev => prev.some(f => f.id === item.id) ? prev : [...prev, item]),
    remove: (id: string) => setFavorites(prev => prev.filter(f => f.id !== id)),
    toggle: (item: Favorite) =>
      setFavorites(prev => prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item]),
  }), [favorites]);

  return <FavoritesContext.Provider value={api}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
