'use client';

import { pageClassFor, type ThemeKind } from "../lib/themeMap";

export default function ThemedPage({
  kind,
  slug,
  children
}: { kind: ThemeKind; slug?: string; children: React.ReactNode }) {
  const klass = pageClassFor(kind, slug);
  return (
    <div className={klass}>
      <div className="theme-page__bg" />
      <div className="relative">{children}</div>
    </div>
  );
}
