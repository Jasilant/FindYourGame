import { Suspense } from 'react';
import FilterClient from './FilterClient';

export const dynamic = 'force-dynamic';

export default function FilterPage() {
  return (
    <Suspense fallback={<div className="p-6">Lade Filter…</div>}>
      <FilterClient />
    </Suspense>
  );
}
