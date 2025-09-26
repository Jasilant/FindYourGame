'use client';

import { useEffect } from 'react';
import { demoLogout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    demoLogout();
    router.replace('/login');
  }, [router]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="opacity-80">Du wirst abgemeldet…</p>
    </main>
  );
}
