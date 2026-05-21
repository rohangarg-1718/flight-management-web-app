"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setEmail(null);
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm">
      {email ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-slate-300">
            Logged in as <span className="text-cyan-400">{email}</span>
          </p>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:border-red-400"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-slate-400">You are not logged in.</p>
      )}
    </div>
  );
}