import './styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'FindYourGame.ch',
  description: 'Finde dein nächstes Spiel — Search & Discover',
  icons: { icon: '/favicon.ico' }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
