'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function ProfileGuardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <div className="p-6 opacity-80">Lade…</div>;
  }
  if (status === 'unauthenticated') {
    return null; // wird sofort ersetzt durch redirect
  }
  return <>{children}</>;
}
