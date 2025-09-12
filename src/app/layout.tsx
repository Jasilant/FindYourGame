import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FindYourGame.ch",
  description: "Entdecke deine Lieblingsspiele – Suche nach Titel, Genre oder Plattform.",
  openGraph: {
    title: "FindYourGame.ch",
    description: "Entdecke deine Lieblingsspiele – Suche nach Titel, Genre oder Plattform.",
    url: "https://www.findyourgame.ch",
    siteName: "FindYourGame.ch",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
