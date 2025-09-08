"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
          formAction={login}
        >
          Login
        </button>
        <a
          href="/auth/register"
          className="text-blue-600 hover:underline  mt-2 block text-center"
        >
          Need an account? Register Here.
        </a>
      </form>
    </div>
  );
}
