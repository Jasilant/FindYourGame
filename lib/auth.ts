'use client';

export const AUTH_KEY = 'findyourgame:auth';

export function isLoggedIn() {
  try { return Boolean(localStorage.getItem(AUTH_KEY)); } catch { return false; }
}

export function demoLogin(email: string) {
  try { localStorage.setItem(AUTH_KEY, JSON.stringify({ email, ts: Date.now() })); } catch {}
}

export function demoLogout() {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
}
