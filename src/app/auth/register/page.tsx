"use client";

import { useState } from "react";
import { signup } from "./actions";

export default function RegisterPage() {
  const allowRegistration =
    process.env.NEXT_PUBLIC_ALLOW_REGISTRATION === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  /* if (!allowRegistration) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Account registration is disabled.
        </p>
      </div>
    );
  } */

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!allowRegistration && (
          <p className="text-red-500 text-sm mb-2">
            Account registration is disabled.
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!allowRegistration}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!allowRegistration}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
          disabled={!allowRegistration}
          formAction={signup}
        >
          Register
        </button>
        <a
          href="/auth/login"
          className="text-blue-600 hover:underline mt-2 block text-center"
        >
          Already have an account? Login Here
        </a>
      </form>
    </div>
  );
}
