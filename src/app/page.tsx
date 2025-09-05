export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-orange-500 mb-6">FindYourGame.ch</h1>
      <p className="text-gray-400 text-lg mb-10 text-center">
        Finde dein nächstes Lieblingsspiel 🎮
      </p>

      <div className="w-full max-w-xl flex">
        <input
          type="text"
          placeholder="Suche nach einem Spiel..."
          className="flex-grow px-4 py-3 rounded-l-2xl border border-orange-500 bg-black text-white focus:outline-none"
        />
        <button className="px-6 py-3 rounded-r-2xl bg-orange-500 text-black font-bold hover:bg-orange-600 transition">
          Suchen
        </button>
      </div>
    </main>
  );
}
