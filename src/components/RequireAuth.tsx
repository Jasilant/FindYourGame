'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [ok, setOk] = useState<boolean>(false);

  useEffect(() => {
    const logged = isLoggedIn();
    if (!logged) {
      const next = typeof window !== 'undefined' ? window.location.pathname : '/';
      const q = params?.toString();
      const nextParam = q ? `${next}?${q}` : next;
      router.replace(`/login?next=${encodeURIComponent(nextParam)}`);
      return;
    }
    setOk(true);
  }, [params, router]);

  if (!ok) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-black/60 px-6 py-4">
          <p className="opacity-80">Weiterleitung zum Login…</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
