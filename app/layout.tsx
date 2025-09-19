import "./globals.css";
import "./theme.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "FindYourGame",
  description: "Finde Spiele nach Genre, Plattform und Trends.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
        {/* Vercel Analytics + Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
