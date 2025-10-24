'use client';

import { useEffect } from 'react';
import { useRequireAuth } from '@/lib/useRequireAuth';

export default function AuthClickGuard() {
  const { call } = useRequireAuth();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Suche nach nächstem Element mit data-requires-auth="true"
      const el = target.closest<HTMLElement>('[data-requires-auth="true"]');
      if (!el) return;

      // nicht eingeloggt? → Login-Redirect, Klick unterbinden
      const ok = call();
      if (!ok) {
        e.preventDefault();
        e.stopPropagation();
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [call]);

  return null;
}
