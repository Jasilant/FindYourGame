import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "FindYourGame.ch",
  description: "Entdecke deine Lieblingsspiele!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-dvh bg-black text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
