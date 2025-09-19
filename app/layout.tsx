<<<<<<< HEAD
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FindYourGame',
  description: 'Entdecke deine Lieblingsspiele!',
=======
import "./globals.css";
import "./theme.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "FindYourGame",
  description: "Finde Spiele nach Genre, Plattform und Trends.",
 icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};
>>>>>>> feat/analytics-and-routes
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
<<<<<<< HEAD
      <body className="min-h-dvh bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}

=======
      <body>
        <Navbar />
        {children}
        {/* Vercel Analytics + Speed Insights */}
        <SpeedInsights />
      </body>
        <Analytics />
    </html>
  );
}
>>>>>>> feat/analytics-and-routes
