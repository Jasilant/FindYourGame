'use client';

export const AUTH_KEY = 'findyourgame:auth';
export const USER_KEY = 'findyourgame:user';

export type DemoUser = {
  displayName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export function isLoggedIn(): boolean {
  try { return Boolean(localStorage.getItem(AUTH_KEY)); } catch { return false; }
}

export function demoLogin(email: string) {
  const now = new Date().toISOString();
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, ts: Date.now() }));
    const exists = localStorage.getItem(USER_KEY);
    if (!exists) {
      const user: DemoUser = {
        displayName: email.split('@')[0] || 'Gamer',
        email,
        createdAt: now,
        updatedAt: now
      };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch {}
}

export function demoLogout() {
  try { localStorage.removeItem(AUTH_KEY); } catch {}
}
