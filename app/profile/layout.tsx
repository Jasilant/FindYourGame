
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileGuardLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const status = session?.status;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/login?redirect=${encodeURIComponent(pathname || '/profile')}`);
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <div className="p-6 opacity-80">Lade…</div>;
  }
  if (status === 'unauthenticated') {
    return null;
  }
  return <>{children}</>;
}
