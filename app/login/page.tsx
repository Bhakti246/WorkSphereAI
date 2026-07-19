"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const API = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to the server");
  }
};
  


  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#030712_50%,_#01040d_100%)] px-4 text-slate-100">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_0_90px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Secure access</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back to WorkSphere AI</h1>
          <p className="mt-3 text-sm leading-7 text-slate-400">Sign in and continue running your AI workforce operating system.</p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500"
          />
        </div>

        <button type="submit" className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(34,211,238,0.2)]">
          Enter workspace
        </button>
      </form>
    </div>
  );
}