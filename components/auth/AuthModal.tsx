"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful. Please check your email.");
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful.");
    window.location.reload();
  }

  return (
    <div  id="auth"
     className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-2 text-2xl font-semibold">User Authentication</h2>

      <p className="mb-6 text-slate-400">
        Sign up or login to manage flight bookings.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="email"
          placeholder="Email address"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSignup}
          className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400"
        >
          Sign Up
        </button>

        <button
          onClick={handleLogin}
          className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black"
        >
          Login
        </button>
      </div>
    </div>
  );
}