'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('');
  return (
    <div className="flex gap-3">
      <input
        aria-label="Spielsuche"
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Suche nach Titel, Genre, Plattform…"
      />
      <button className="btn btn-accent" onClick={() => onSearch(q)}>Suchen</button>
    </div>
  );
}
