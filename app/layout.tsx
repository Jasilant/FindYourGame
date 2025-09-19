import "./globals.css";
import "./theme.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "FindYourGame",
  description: "Entdecke deine Lieblingsspiele!",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
