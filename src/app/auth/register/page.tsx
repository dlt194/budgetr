"use client";

import { useState } from "react";
import { signup } from "./actions";

export default function RegisterPage() {
  const allowRegistration =
    process.env.NEXT_PUBLIC_ALLOW_REGISTRATION === "true";

  const [error, setError] = useState<string | null>(null);

  if (!allowRegistration) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Account registration is disabled.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600/10 grid place-items-center">
              <span className="text-blue-700 text-xl font-bold">B</span>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-slate-800">
              Register for Budgetr
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track your expected vs actual spending
            </p>
          </div>

          {/* Form */}
          <form className="px-6 pb-6 space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              formAction={signup}
            >
              Register
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              or
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Secondary actions (adjust later if you add providers) */}
            <a
              href="/auth/login"
              className="block text-center text-sm font-medium text-blue-700 hover:underline"
            >
              Have an account? Sign in here
            </a>
          </form>
        </div>

        {/* Footer note */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By continuing you agree to the Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
