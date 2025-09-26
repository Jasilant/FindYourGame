'use client';

import { create } from 'zustand';

type UIState = {
  language: 'de' | 'en' | 'it' | 'fr' | 'zh' | 'ja';
  setLanguage: (lang: UIState['language']) => void;

  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
};

const LANG_KEY = 'fyf_lang_v1';
const TOKEN_KEY = 'fyf_token_v1';

function loadLang(): UIState['language'] {
  if (typeof window === 'undefined') return 'de';
  const saved = localStorage.getItem(LANG_KEY) as UIState['language'] | null;
  return saved ?? 'de';
}
function loadToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export const useUI = create<UIState>((set) => ({
  language: loadLang(),
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') localStorage.setItem(LANG_KEY, lang);
    set({ language: lang });
  },

  token: loadToken(),
  setToken: (t) => {
    if (typeof window !== 'undefined') {
      if (t) localStorage.setItem(TOKEN_KEY, t);
      else localStorage.removeItem(TOKEN_KEY);
    }
    set({ token: t });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
    set({ token: null });
    if (typeof window !== 'undefined') window.location.href = '/';
  },
}));
