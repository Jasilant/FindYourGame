'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/profile",
    });
  }

  return (
    <main className="mx-auto max-w-md py-10">
      <h1 className="mb-4 text-2xl font-bold">Anmelden</h1>
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
        <button type="submit" className="rounded-md bg-orange-500 px-4 py-2 font-semibold">
          Login
        </button>
      </form>
    </main>
  );
}
