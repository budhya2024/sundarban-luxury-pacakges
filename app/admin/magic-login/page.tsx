"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, AlertCircle, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

function MagicLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No authentication token was provided in the magic link.");
      return;
    }

    let isMounted = true;

    async function verifyToken() {
      try {
        const res = await fetch("/api/admin/auth/verify-magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok) {
          throw new Error(data.error || "Magic link verification failed");
        }

        setStatus("success");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      } catch (err: any) {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(err?.message || "Failed to authenticate with magic link.");
      }
    }

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#fcf9f2] flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="relative z-10 w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-8 sm:p-9 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>1-Click Magic Login</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sundarban Admin
          </h1>
        </div>

        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="py-6 space-y-4">
            <div className="w-14 h-14 border-3 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-800">
                Verifying Magic Link...
              </h2>
              <p className="text-xs text-slate-500">
                Authenticating your administrator session securely.
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900">
                Authentication Successful!
              </h2>
              <p className="text-xs text-slate-500">
                Redirecting you to the management dashboard...
              </p>
            </div>
            <div className="w-36 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="py-4 space-y-4">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900">
                Magic Link Expired or Invalid
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                {errorMessage || "This magic link has already been used or has expired."}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/admin/login"
                className="w-full h-11 rounded-sm bg-[#057a28] hover:bg-[#046320] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Request New Link</span>
              </Link>
              <Link
                href="/admin/login"
                className="w-full h-11 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MagicLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fcf9f2] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      }
    >
      <MagicLoginContent />
    </Suspense>
  );
}
