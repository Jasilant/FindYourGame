'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
  onToken: (token: string | null) => void;
  theme?: 'auto' | 'light' | 'dark';
  className?: string;
};

/**
 * Captcha-Komponente:
 * - nutzt Cloudflare Turnstile, wenn NEXT_PUBLIC_TURNSTILE_SITEKEY gesetzt ist
 * - sonst Google reCAPTCHA, wenn NEXT_PUBLIC_RECAPTCHA_SITEKEY gesetzt ist
 * - wenn beides fehlt, ruft sie onToken(null) auf und zeigt nichts (Dev/Preview)
 */
export default function Captcha({ onToken, theme = 'dark', className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || '';
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY || '';

  useEffect(() => {
    if (!turnstileKey && !recaptchaKey) {
      onToken(null); // Captcha deaktiviert
      return;
    }

    let cleaned = false;

    async function loadScript(src: string, id: string) {
      if (document.getElementById(id)) return;
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.id = id;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Captcha script failed to load'));
        document.head.appendChild(s);
      });
    }

    if (turnstileKey) {
      // Cloudflare Turnstile
      (async () => {
        try {
          await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js', 'cf-turnstile');
          if (cleaned) return;
          if (!ref.current) return;
          // @ts-ignore
          const turnstile = (window as any).turnstile;
          if (!turnstile) return;
          // render
          turnstile.render(ref.current, {
            sitekey: turnstileKey,
            theme,
            callback: (token: string) => onToken(token),
            'error-callback': () => onToken(null),
            'expired-callback': () => onToken(null),
          });
        } catch {
          onToken(null);
        }
      })();
    } else if (recaptchaKey) {
      // Google reCAPTCHA v2
      (async () => {
        try {
          await loadScript(`https://www.google.com/recaptcha/api.js?render=explicit`, 'grecaptcha');
          if (cleaned) return;
          if (!ref.current) return;
          // @ts-ignore
          const grecaptcha = (window as any).grecaptcha;
          if (!grecaptcha) return;
          grecaptcha.ready(() => {
            const widgetId = grecaptcha.render(ref.current!, {
              sitekey: recaptchaKey,
              theme,
              callback: (token: string) => onToken(token),
              'error-callback': () => onToken(null),
              'expired-callback': () => onToken(null),
            });
            // optional: cleanup widgetId on unmount
            (ref.current as any).__rcid = widgetId;
          });
        } catch {
          onToken(null);
        }
      })();
    }

    return () => {
      cleaned = true;
    };
  }, [turnstileKey, recaptchaKey, onToken, theme]);

  if (!turnstileKey && !recaptchaKey) {
    return (
      <div className={`rounded-xl border border-white/10 bg-black/40 p-3 text-sm opacity-70 ${className || ''}`}>
        Captcha ist in dieser Umgebung deaktiviert.
      </div>
    );
  }

  return <div ref={ref} className={className} />;
}
