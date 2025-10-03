'use client';

import { useCallback, useState } from "react";
import Captcha from "@/components/Captcha";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleToken = useCallback((t: string | null) => {
    setCaptchaToken(t);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        newsletter,
        acceptedTerms: terms,
        captchaToken,
        name: name || undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) setMsg(data.error);
    else setMsg("Registrierung erfolgreich. Du kannst dich jetzt einloggen.");
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">Registrieren</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="rounded-xl border border-white/20 bg-black px-3 py-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anzeigename (optional)"
        />
        <input
          className="rounded-xl border border-white/20 bg-black px-3 py-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          required
        />
        <input
          className="rounded-xl border border-white/20 bg-black px-3 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort (min. 8 Zeichen)"
          minLength={8}
          required
        />

        {/* Captcha (Turnstile oder reCAPTCHA – abhängig von ENV-Keys) */}
        <Captcha onToken={handleToken} className="my-1" />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          Newsletter abonnieren
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            required
          />
          AGB akzeptieren
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-black hover:bg-orange-400 disabled:opacity-60"
        >
          {loading ? "Bitte warten…" : "Registrieren"}
        </button>

        {msg && <p className="text-sm text-orange-400">{msg}</p>}
      </form>
    </main>
  );
}
