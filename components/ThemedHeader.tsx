'use client';

import { themeClassFor, type ThemeKind } from "../lib/themeMap";

export default function ThemedHeader({
  kind,
  slug,
  title,
  subtitle,
  height = 260
}: { kind: ThemeKind; slug?: string; title: string; subtitle?: string; height?: number }) {

  const klass = themeClassFor(kind, slug);

  return (
    <div className={`relative isolate overflow-hidden ${klass}`} style={{height}}>
      {/* Noise-Layer */}
      <div className="theme-noise" />

      {/* Titelzeile */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
          {subtitle && <p className="mt-1 opacity-90">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
