import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FindYourGame',
  description: 'Entdecke deine Lieblingsspiele!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-dvh bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}

