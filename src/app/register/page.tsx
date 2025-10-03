'use client';

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, newsletter, acceptedTerms: terms }),
    });
    const data = await res.json();
    if (data.error) setMsg(data.error);
    else setMsg("Registrierung erfolgreich. Du kannst dich jetzt einloggen.");
  }

  return (
    <main className="mx-auto max-w-md py-10">
      <h1 className="mb-4 text-2xl font-bold">Registrieren</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="rounded-md border border-white/20 bg-black px-3 py-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
        />
        <input
          className="rounded-md border border-white/20 bg-black px-3 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
        />

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
          />
          AGB akzeptieren
        </label>

        <button type="submit" className="rounded-md bg-orange-500 px-4 py-2 font-semibold">
          Registrieren
        </button>

        {msg && <p className="text-sm text-orange-400">{msg}</p>}
      </form>
    </main>
  );
}
