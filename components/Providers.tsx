'use client';

import { SessionProvider } from 'next-auth/react';
import AuthClickGuard from './AuthClickGuard';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* Globale Click-Absicherung für data-requires-auth-Elemente */}
      <AuthClickGuard />
      {children}
    </SessionProvider>
  );
}
