"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw, AlertCircle } from "lucide-react";
import { compressImageClientSide } from "@/lib/image-compress";

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  presets?: string[];
  aspectRatio?: "video" | "square" | "wide";
  folder?: string;
}

const MAX_IMAGE_SIZE_BYTES = 30 * 1024 * 1024; // 30 MB max before compression
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const DEFAULT_PRESETS = [
  "/assets/images/royal-bengal-tiger.jpg",
  "/assets/images/safari-boat.jpg",
  "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-01.jpg",
  "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-03.jpg",
  "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
];

export function ImageUploadDropzone({
  value,
  onChange,
  label = "Upload Photo",
  helperText = "Drag & drop your photo or choose a local file",
  aspectRatio = "video",
  folder = "uploads",
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("Uploading...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // 1. Validate MIME format
    const mimeType = file.type?.toLowerCase() || "";
    if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
      setErrorMessage(
        "Unsupported image format. Allowed formats: JPG, PNG, WebP, AVIF, and GIF."
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 2. Validate maximum initial file size (30 MB)
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMessage(
        `File size (${fileSizeMB} MB) exceeds the 30 MB maximum limit. Please choose a smaller photo.`
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previousUrl = value;
    setIsUploading(true);

    try {
      // Auto-compress large photos client-side in background before upload
      let fileToUpload = file;
      if (file.size > 500 * 1024) {
        setUploadStatus("Optimizing & compressing image...");
        try {
          fileToUpload = await compressImageClientSide(file);
        } catch (compressionErr) {
          console.warn("Client compression skipped:", compressionErr);
          fileToUpload = file;
        }
      }

      setUploadStatus("Uploading to cloud storage...");
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success && data?.url) {
        onChange(data.url);
        setIsUploading(false);
        setErrorMessage(null);

        // Delete old replaced image from Neon Object Storage if applicable
        if (
          previousUrl &&
          previousUrl !== data.url &&
          (previousUrl.includes(".neon.tech") || previousUrl.includes("/uploads/"))
        ) {
          fetch(`/api/upload?url=${encodeURIComponent(previousUrl)}`, {
            method: "DELETE",
          }).catch(() => {});
        }
        return;
      } else {
        // Server rejected upload with specific reason
        const errorDetail =
          data?.error ||
          (res.status === 413
            ? "File is too large for the server. Please try a smaller photo."
            : `Upload failed (Status ${res.status}). Please try again.`);
        setErrorMessage(errorDetail);
        setIsUploading(false);
        return;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Upload network connection error. Please try again.");
      setIsUploading(false);
      return;
    }
  };

  const handleRemove = async () => {
    setErrorMessage(null);
    const toDelete = value;
    onChange("");
    if (
      toDelete &&
      (toDelete.includes(".neon.tech") || toDelete.includes("/uploads/"))
    ) {
      try {
        await fetch(`/api/upload?url=${encodeURIComponent(toDelete)}`, {
          method: "DELETE",
        });
      } catch (e) {
        console.error("Failed to delete image from storage:", e);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };


  const heightClass =
    aspectRatio === "square" ? "h-40 w-40" : aspectRatio === "wide" ? "h-36 w-full" : "h-48 w-full";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}


      {/* Main Upload Dropzone & Live Preview */}
      {value ? (
        <div className="relative rounded-[4px] border-2 border-slate-200 overflow-hidden bg-slate-900 group shadow-xs">
          <div className={`relative ${heightClass}`}>
            <Image
              src={value}
              alt="Uploaded photo"
              fill
              className="object-cover"
              unoptimized={true}
            />
            {/* Overlay Gradient on hover */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded shadow-md flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Replace Photo</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-md flex items-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold truncate max-w-[280px]">
              {(() => {
                if (value.startsWith("data:")) return "✓ Local image uploaded";
                try {
                  const parts = value.split("/");
                  const last = parts[parts.length - 1]?.split("?")[0];
                  if (last && /\.(jpe?g|png|webp|gif|avif)$/i.test(last)) {
                    return `✓ ${decodeURIComponent(last.replace(/^\d+-/, ""))}`;
                  }
                } catch {}
                return "✓ Image selected";
              })()}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-bold text-blue-600 hover:underline shrink-0"
            >
              Change Photo
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-[4px] p-6 text-center cursor-pointer transition-all ${isDragging
            ? "border-blue-600 bg-blue-50/70 scale-[0.99]"
            : "border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100/80"
            }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-blue-600 animate-pulse">{uploadStatus}</p>
            </div>
          ) : (

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Click to browse photo <span className="text-slate-400 font-normal">or drag &amp; drop here</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>
              </div>
              <span className="inline-block px-2.5 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded">
                ⚡ Auto-compressed • JPG, PNG, WebP up to 30MB
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="flex items-start gap-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-700 font-bold ml-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />


    </div>
  );
}
