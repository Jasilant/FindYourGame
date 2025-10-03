// app/not-found.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-extrabold text-orange-500">Seite nicht gefunden</h1>
      <p className="opacity-80">
        Die angeforderte Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400">
          Zur Startseite
        </Link>
        <Link href="/popular" className="rounded-xl border border-white/15 px-4 py-2 hover:border-orange-400">
          Beliebte Spiele
        </Link>
        <Link href="/genres" className="rounded-xl border border-white/15 px-4 py-2 hover:border-orange-400">
          Genres
        </Link>
      </div>
    </main>
  );
}
