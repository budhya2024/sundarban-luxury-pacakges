"use client";

import React, { useState, useEffect } from "react";

// Distinct WhatsApp / Google Contact style palette
const AVATAR_COLORS = [
  "bg-emerald-600 text-white",
  "bg-blue-600 text-white",
  "bg-amber-600 text-white",
  "bg-purple-600 text-white",
  "bg-teal-600 text-white",
  "bg-rose-600 text-white",
  "bg-indigo-600 text-white",
  "bg-sky-600 text-white",
  "bg-violet-600 text-white",
  "bg-emerald-700 text-white",
  "bg-orange-600 text-white",
  "bg-cyan-600 text-white",
];

function getAvatarColor(name: string): string {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

interface ReviewAvatarProps {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
  ringClass?: string;
}

export function ReviewAvatar({
  src,
  name,
  size = 48,
  className = "",
  ringClass = "ring-2 ring-amber-500/30",
}: ReviewAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // If src is empty, missing, or points to the old repeated stock photo andrew.jpg, treat as initial fallback
  const isStockOrEmpty =
    !src ||
    src.trim() === "" ||
    src.includes("andrew.jpg") ||
    src.includes("default-avatar");

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initial = (name || "Guest").trim().charAt(0).toUpperCase() || "G";
  const colorClass = getAvatarColor(name);

  if (isStockOrEmpty || hasError) {
    return (
      <div
        className={`flex-shrink-0 rounded-full flex items-center justify-center font-bold select-none shadow-xs ${ringClass} ${colorClass} ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: Math.max(14, Math.floor(size * 0.42)),
        }}
        aria-label={name}
        title={name}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-full ${ringClass} shadow-xs bg-slate-100 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src!}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
