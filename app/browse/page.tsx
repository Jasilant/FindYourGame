import { Suspense } from "react";
import BrowseClient from "./BrowseClient";

export const dynamic = "force-dynamic";

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-6 animate-pulse">Lade Browse…</div>}>
      <BrowseClient />
    </Suspense>
  );
}
