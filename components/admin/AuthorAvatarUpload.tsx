"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw, User, Loader2 } from "lucide-react";
import { compressImageClientSide } from "@/lib/image-compress";

interface AuthorAvatarUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function AuthorAvatarUpload({ value, onChange }: AuthorAvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previousUrl = value;
    setIsUploading(true);

    try {
      let fileToUpload = file;
      if (file.size > 500 * 1024) {
        try {
          fileToUpload = await compressImageClientSide(file, 800, 0.85);
        } catch {
          fileToUpload = file;
        }
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("folder", "authors");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data?.url) {
        onChange(data.url);
        setIsUploading(false);
        setErrorMessage(null);

        if (
          previousUrl &&
          previousUrl !== data.url &&
          (previousUrl.includes(".neon.tech") || previousUrl.includes("/uploads/"))
        ) {
          fetch(`/api/upload?url=${encodeURIComponent(previousUrl)}`, {
            method: "DELETE",
          }).catch(() => {});
        }
      } else {
        setErrorMessage(data?.error || "Failed to upload author photo.");
        setIsUploading(false);
      }
    } catch {
      setErrorMessage("Network connection error while uploading.");
      setIsUploading(false);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setErrorMessage(null);
    const toDelete = value;
    onChange("");
    if (
      toDelete &&
      (toDelete.includes(".neon.tech") || toDelete.includes("/uploads/"))
    ) {
      fetch(`/api/upload?url=${encodeURIComponent(toDelete)}`, {
        method: "DELETE",
      }).catch(() => {});
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center gap-3">
        {/* Circular Avatar Preview */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0 flex items-center justify-center shadow-xs">
          {value ? (
            <Image
              src={value}
              alt="Author Photo"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <User className="w-5 h-5 text-slate-400" />
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Action Buttons (NO image filename letters shown!) */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 rounded-[4px] border border-slate-300 hover:border-blue-600 bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Uploading...</span>
              </>
            ) : value ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Change Photo</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                <span>Upload Photo</span>
              </>
            )}
          </button>

          {value && !isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-2 py-1.5 rounded-[4px] border border-rose-200 hover:bg-rose-50 text-rose-600 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
              title="Remove author photo"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
}

export default AuthorAvatarUpload;
