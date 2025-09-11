export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="FindYourGame" className="h-8" />
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a className="hover:opacity-80" href="#news">News</a>
          <a className="hover:opacity-80" href="#filter">Spiele-Filter</a>
        </nav>
      </div>
    </header>
  );
}
