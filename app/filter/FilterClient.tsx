'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function FilterClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') ?? '';
  const genre = searchParams.get('genre') ?? '';
  const platform = searchParams.get('platform') ?? '';

  const activeFilters = useMemo(
    () => ({ query, genre, platform }),
    [query, genre, platform]
  );

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/filter?${params.toString()}`);
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Filter</h1>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="w-full rounded-2xl border px-4 py-3 bg-black/20 text-white placeholder-white/60"
          placeholder="Suche nach Titel…"
          defaultValue={query}
          onBlur={(e) => updateParam('q', e.target.value)}
        />
        <input
          className="w-full rounded-2xl border px-4 py-3 bg-black/20 text-white placeholder-white/60"
          placeholder="Genre (z.B. RPG)"
          defaultValue={genre}
          onBlur={(e) => updateParam('genre', e.target.value)}
        />
        <input
          className="w-full rounded-2xl border px-4 py-3 bg-black/20 text-white placeholder-white/60"
          placeholder="Plattform (z.B. PC, PS5)"
          defaultValue={platform}
          onBlur={(e) => updateParam('platform', e.target.value)}
        />
      </div>

      <div className="text-sm opacity-80">
        <span className="font-semibold">Aktiv:</span>{' '}
        {Object.entries(activeFilters)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}=${v}`)
          .join(' • ') || 'Keine'}
      </div>

      <div className="rounded-2xl border p-6">
        <p className="opacity-80">
          Hier kommen später die Ergebnisse hin. Die URL-Parameter aktualisieren sich schon.
        </p>
      </div>
    </div>
  );
}
