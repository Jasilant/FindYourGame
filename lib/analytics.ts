'use client';
import va from '@vercel/analytics';

/** Wrapper für Custom Events (failsafe) */
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
) {
  try { (va as any)?.track?.(name, props); } catch {}
}
