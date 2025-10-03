import './globals.css';
import type { Metadata } from 'next';
import Providers from '../components/Providers';
import Navbar from '../components/Navbar';

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
          {children}
        </Providers>
      </body>
    </html>
  );
}
