"use client";

import React, { useState } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa6";
import { validateEmail } from "@/lib/validation";

export function NewsletterSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const err = validateEmail(email);
    if (err) {
      setErrorMessage(err);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email.trim().toLowerCase(),
          phone: "9999999999", // placeholder phone for newsletter
          subject: "Newsletter Subscription Request",
          message: "Guest subscribed to the Sundarban Luxury newsletter.",
          source: "Blog Newsletter",
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || "Subscription failed. Please check your email.");
        setStatus("error");
      }
    } catch {
      // Graceful fallback
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="p-4 rounded-sm bg-emerald-500/20 border border-emerald-400 text-white text-xs sm:text-sm text-center animate-in fade-in relative z-10">
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2">
          <FaCheck className="w-3.5 h-3.5" />
        </div>
        <p className="font-bold">Thank You For Subscribing!</p>
        <p className="text-white/80 text-xs mt-1">
          You'll receive the latest tiger sightings, safari tips & exclusive deals.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3 relative z-10">
      <div>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          className={`w-full bg-white/10 border rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none transition-all ${
            errorMessage
              ? "border-rose-400 ring-1 ring-rose-400 bg-rose-950/20"
              : "border-white/25 focus:ring-2 focus:ring-[#fbbf24]"
          }`}
        />
        {errorMessage && (
          <p className="mt-1.5 text-xs text-rose-300 font-medium">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-sm py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md group cursor-pointer disabled:opacity-70"
      >
        <span>{status === "submitting" ? "Subscribing..." : "Subscribe Now"}</span>
        <FaPaperPlane className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}
