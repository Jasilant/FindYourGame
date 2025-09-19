export default function Hero() {
  return (
    <section className="relative isolate">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-orange-500/10 to-transparent" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Entdecke deine Lieblingsspiele!
        </h1>
        <p className="max-w-2xl text-balance text-lg opacity-80">
          Suche nach Titel, Genre oder Plattform – finde sofort dein Match.
        </p>
        <form action="/filter" method="GET" className="flex w-full max-w-2xl items-center gap-3">
          <input
            type="text"
            name="q"
            placeholder="Suche nach Titel (z. B. Zelda)…"
            className="h-14 w-full rounded-2xl bg-white px-5 text-black placeholder-black/50 outline-none"
          />
          <button
            type="submit"
            className="h-14 shrink-0 rounded-2xl bg-orange-500 px-6 font-semibold text-black hover:bg-orange-400"
          >
            Suchen
          </button>
        </form>
        <div className="text-sm opacity-70">
          Oder nutze weitere Filter in <span className="font-semibold">/filter</span>.
        </div>
      </div>
    </section>
  );
}

