"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, ArrowLeft, Terminal, Sparkles } from "lucide-react";
import { ParticleBackground } from "@/components/3d/ParticleBackground";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@keerthan.dev" && password === "admin123") {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid administrator credentials. Demo: admin@keerthan.dev / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <main className="relative min-h-screen bg-[#030308] text-slate-100 flex items-center justify-center p-4">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Main Portfolio
        </Link>

        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-[1px] mx-auto shadow-xl shadow-cyan-500/20">
              <div className="w-full h-full bg-black/90 rounded-[15px] flex items-center justify-center">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Control Center</h1>
            <p className="text-xs text-zinc-400">Authenticate to manage projects, feedback & analytics</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@keerthan.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Secret Key / Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-semibold text-sm hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <span className="text-[11px] text-zinc-500 font-mono">
              Demo Access: admin@keerthan.dev • pass: admin123
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
