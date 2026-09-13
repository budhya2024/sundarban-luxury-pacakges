"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X, Check, Link as LinkIcon, RefreshCw } from "lucide-react";

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  presets?: string[];
  aspectRatio?: "video" | "square" | "wide";
}

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
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WebP, etc.)");
      return;
    }

    // Convert to Data URL (Base64) for instant live local preview & persistence
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        onChange(base64Url);
      }
    };
    reader.readAsDataURL(file);
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

  const handleApplyUrl = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setUrlInputValue("");
      setShowUrlInput(false);
    }
  };

  const heightClass =
    aspectRatio === "square" ? "h-40 w-40" : aspectRatio === "wide" ? "h-36 w-full" : "h-48 w-full";

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? "Use File Upload" : "Or enter direct link"}</span>
          </button>
        </div>
      )}

      {/* Manual URL Input dropdown if toggled */}
      {showUrlInput ? (
        <div className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-[3px]">
          <input
            type="text"
            placeholder="Paste direct image URL (https://... or /assets/...)"
            value={urlInputValue || value}
            onChange={(e) => setUrlInputValue(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-600 font-mono bg-white"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors"
          >
            Set URL
          </button>
        </div>
      ) : null}

      {/* Main Upload Dropzone & Live Preview */}
      {value ? (
        <div className="relative rounded-[4px] border-2 border-slate-200 overflow-hidden bg-slate-900 group shadow-xs">
          <div className={`relative ${heightClass}`}>
            <Image
              src={value}
              alt="Uploaded photo"
              fill
              className="object-cover"
              unoptimized={value.startsWith("data:")}
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
                onClick={() => onChange("")}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded shadow-md flex items-center gap-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold truncate max-w-[280px]">
              {value.startsWith("data:") ? "✓ Local image uploaded" : value}
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
          className={`border-2 border-dashed rounded-[4px] p-6 text-center cursor-pointer transition-all ${isDragging
            ? "border-blue-600 bg-blue-50/70 scale-[0.99]"
            : "border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100/80"
            }`}
        >
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
              Supports JPG, PNG, WEBP, GIF
            </span>
          </div>
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
