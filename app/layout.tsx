import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import LoginPortalButton from '@/components/LoginPortalButton';

export const metadata: Metadata = {
  title: 'FindYourGame',
  description: 'Finde dein nächstes Lieblingsspiel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-black text-white">
        <Providers>
          <Navbar />
          {/* Dezent: globaler Login/Registrieren-Einstieg, nur sichtbar wenn ausgeloggt */}
          <LoginPortalButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
