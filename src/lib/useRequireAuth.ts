'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * useRequireAuth
 * - call() -> boolean   (true = darf ausführen, false = wurde zu /login umgeleitet)
 * - wrap(handler) -> (e) => void   (Click-Handler-Wrapper)
 * - redirectToLogin() -> void
 */
export function useRequireAuth(redirectOverride?: string) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  function redirectToLogin() {
    const dest = redirectOverride || pathname || '/';
    router.push(`/login?redirect=${encodeURIComponent(dest)}`);
  }

  function call(): boolean {
    if (status === 'authenticated') return true;
    // Wenn noch "loading", lassen wir es zur Sicherheit auch zum Login gehen
    redirectToLogin();
    return false;
  }

  function wrap<T extends React.SyntheticEvent | MouseEvent>(handler: (e: T) => void) {
    return (e: T) => {
      if (!call()) return;
      handler?.(e);
    };
  }

  return { call, wrap, redirectToLogin };
}
