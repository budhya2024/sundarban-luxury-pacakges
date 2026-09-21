"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Successful login
      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#051c10] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle Atmospheric Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#057a28]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/20 via-[#051c10]/80 to-[#020b06] pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Card Header with Brand Branding */}
        <div className="bg-[#052e16] p-6 sm:p-8 text-center text-white border-b border-[#057a28]/30 relative">
          <Link href="/" className="inline-block mb-3">
            <Image
              src="/assets/images/brand-logo.png"
              alt="Sundarban Luxury Package"
              width={160}
              height={45}
              priority
              className="h-9 sm:h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Admin Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Operations Login
          </h2>
          <p className="text-xs text-white/70 mt-1 max-w-xs mx-auto">
            Manage tour packages, blog articles, and live customer inquiries.
          </p>
        </div>

        {/* Card Body & Form */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="admin or admin@sundarban.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-[#057a28] focus:ring-2 focus:ring-[#057a28]/15 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-[#057a28] focus:ring-2 focus:ring-[#057a28]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 rounded-lg bg-[#057a28] hover:bg-[#046320] text-white font-extrabold text-sm tracking-wide shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>Authorized Personnel Only</span>
            <Link
              href="/"
              className="text-[#d97706] hover:underline font-bold transition-colors"
            >
              ← Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#051c10] flex items-center justify-center text-white text-sm">
          Loading login portal...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
