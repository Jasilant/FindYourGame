'use client';

import React, { useEffect } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthFlag />
      {children}
    </SessionProvider>
  );
}

/**
 * Setzt ein globales Flag für "eingeloggt/ausgeloggt",
 * das du bei Bedarf in Client-Komponenten lesen kannst.
 */
function AuthFlag() {
  const { status } = useSession();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__AUTH_STATUS__ =
        status === 'authenticated' ? 'loggedin' : 'loggedout';
    }
  }, [status]);
  return null;
}
