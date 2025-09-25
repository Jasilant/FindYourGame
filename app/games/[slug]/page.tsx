'use client';

import { useMemo } from "react";
import FavoriteButton from "../../../components/FavoriteButton";
import { mockGameDetail } from "../../../lib/mock";

export default function GameDetailPage({ params }: any) {
  const slug: string = params?.slug ?? "unknown";
  const g = useMemo(() => mockGameDetail(slug), [slug]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <img src={g.hero} alt={g.name} className="h-[320px] w-full object-cover md:h-[420px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold md:text-4xl">{g.name}</h1>
            <FavoriteButton game={{ id: g.id, name: g.name, slug: g.slug, image: g.hero }} />
          </div>

          {/* PLATTFORMEN */}
          <div className="mt-3 flex flex-wrap gap-2 text-sm opacity-90">
            {g.platforms.map(p => (
              <span key={p} className="rounded-full border border-white/20 px-3 py-1">{p}</span>
            ))}
          </div>

          {/* GENRES (kanonisch) */}
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {g.genres.map(ge => (
              <a
                key={ge}
                href={`/genres/${ge}`}
                className="rounded-full border border-white/25 px-3 py-1"
                style={{ background: "var(--accent, transparent)", color: "black" }}
              >
                {ge}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* META + SHORT */}
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <h2 className="mb-2 text-xl font-bold">Kurzbeschreibung</h2>
          <p className="opacity-90">{g.short}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm opacity-90 md:grid-cols-3">
            <div><div className="opacity-60">Release</div><div>{g.releaseDate}</div></div>
            <div><div className="opacity-60">Rating</div><div>{g.rating}/100</div></div>
            <div><div className="opacity-60">Slug</div><div>{g.slug}</div></div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="mb-2 font-bold">Key Facts</h3>
          <ul className="list-inside list-disc space-y-1 opacity-90">
            <li>Single-/Multiplayer je nach Titel</li>
            <li>Plattformen: {g.platforms.join(", ")}</li>
            <li>Genres: {g.genres.join(", ")}</li>
            {g.price === 0 && <li>Kostenlos spielbar</li>}
          </ul>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">Screenshots</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {g.screenshots.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-white/10">
              <img src={src} alt={`Screenshot ${i+1}`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
            </div>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">Videos</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {g.videos.map(v => (
            <div key={v.youtubeId} className="overflow-hidden rounded-xl border border-white/10">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="px-4 py-2 opacity-90">{v.title}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
