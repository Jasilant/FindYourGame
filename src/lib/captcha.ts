export async function verifyCaptcha(token?: string) {
  try {
    const turnstile = process.env.TURNSTILE_SECRET;
    const recaptcha = process.env.RECAPTCHA_SECRET;
    const secret = turnstile || recaptcha;
    if (!secret || !token) return true; // wenn nicht konfiguriert → überspringen

    if (turnstile) {
      const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret: turnstile, response: token }),
      });
      const data = await resp.json();
      return !!data.success;
    } else {
      const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: recaptcha!, response: token }),
      });
      const data = await resp.json();
      return !!data.success;
    }
  } catch {
    return false;
  }
}
