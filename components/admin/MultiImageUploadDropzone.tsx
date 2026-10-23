"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Plus,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Link as LinkIcon,
} from "lucide-react";
import { compressImageClientSide } from "@/lib/image-compress";

interface MultiImageUploadDropzoneProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  helperText?: string;
  folder?: string;
  maxFiles?: number;
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

export function MultiImageUploadDropzone({
  value = [],
  onChange,
  label = "Package Gallery Photos (Multiple Images - Optional)",
  helperText = "Select or drag multiple photos. These will appear in the package card image slider and tour gallery.",
  folder = "packages",
  maxFiles = 20,
}: MultiImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState<string>("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagesList = Array.isArray(value) ? value : [];

  const handleFiles = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const filesArray = Array.from(files);

    if (filesArray.length === 0) return;

    if (imagesList.length + filesArray.length > maxFiles) {
      setErrorMessage(
        `Maximum ${maxFiles} images allowed per package. You can add up to ${
          maxFiles - imagesList.length
        } more.`
      );
      return;
    }

    // Validate files
    for (const file of filesArray) {
      const mimeType = file.type?.toLowerCase() || "";
      if (!ALLOWED_IMAGE_TYPES.includes(mimeType)) {
        setErrorMessage(
          `"${file.name}" has an unsupported format. Allowed: JPG, PNG, WebP, AVIF, GIF.`
        );
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        const mb = (file.size / (1024 * 1024)).toFixed(1);
        setErrorMessage(
          `"${file.name}" (${mb} MB) exceeds the 30 MB limit.`
        );
        return;
      }
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        setUploadStatus(
          `Uploading ${i + 1} of ${filesArray.length}: ${file.name}...`
        );

        let fileToUpload = file;
        if (file.size > 500 * 1024) {
          try {
            fileToUpload = await compressImageClientSide(file);
          } catch (e) {
            console.warn("Client compression skipped for", file.name, e);
          }
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json().catch(() => null);

        if (res.ok && data?.success && data?.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(
            data?.error || `Failed to upload "${file.name}" (Status ${res.status})`
          );
        }
      }

      onChange([...imagesList, ...uploadedUrls]);
      setErrorMessage(null);
    } catch (err: any) {
      setErrorMessage(err?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index: number) => {
    const toRemove = imagesList[index];
    const updated = imagesList.filter((_, i) => i !== index);
    onChange(updated);

    // If uploaded to storage, attempt clean-up in background
    if (
      toRemove &&
      (toRemove.includes(".neon.tech") || toRemove.includes("/uploads/"))
    ) {
      fetch(`/api/upload?url=${encodeURIComponent(toRemove)}`, {
        method: "DELETE",
      }).catch(() => {});
    }
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= imagesList.length) return;

    const copy = [...imagesList];
    const item = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = item;
    onChange(copy);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const copy = [...imagesList];
    const [selected] = copy.splice(index, 1);
    copy.unshift(selected);
    onChange(copy);
  };

  const handleAddManualUrl = () => {
    const trimmed = manualUrl.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
      setErrorMessage("Please enter a valid image URL (starting with http://, https://, or /).");
      return;
    }
    if (imagesList.includes(trimmed)) {
      setErrorMessage("This image is already in the gallery.");
      return;
    }
    onChange([...imagesList, trimmed]);
    setManualUrl("");
    setErrorMessage(null);
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
            {label}
          </label>
          <p className="text-[11px] text-slate-500 mt-0.5">{helperText}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {imagesList.length} / {maxFiles} Selected
          </span>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 hover:border-blue-300 transition-colors"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? "Hide URL" : "+ Image URL"}</span>
          </button>
        </div>
      </div>

      {/* Manual URL Input Bar */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 bg-slate-50 rounded border border-slate-200 animate-in fade-in duration-150">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddManualUrl();
              }
            }}
            placeholder="Paste external image URL (e.g. https://... or /assets/images/...)"
            className="flex-1 h-8 px-2.5 rounded border border-slate-300 bg-white text-xs font-medium focus:outline-none focus:border-blue-600"
          />
          <button
            type="button"
            onClick={handleAddManualUrl}
            className="px-3 h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      )}

      {/* Dropzone for multi-file upload */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[4px] p-5 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-blue-600 bg-blue-50/70 scale-[0.99]"
            : "border-slate-300 hover:border-blue-500 bg-slate-50/80 hover:bg-slate-100/80"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-3">
            <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-blue-700 animate-pulse">
              {uploadStatus}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-1.5">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-2xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Click to browse multiple photos{" "}
                <span className="text-slate-500 font-normal">
                  or drag &amp; drop images here
                </span>
              </p>
              <p className="text-[11px] text-slate-500">
                Select multiple JPG, PNG, WebP files at once • Auto-compressed • Optional
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Error message */}
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



      {/* Uploaded Gallery Thumbnails Grid */}
      {imagesList.length > 0 ? (
        <div className="pt-2">
          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Package Gallery ({imagesList.length} photos)</span>
            <span className="text-slate-400 font-normal lowercase">
              First image is the default cover
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {imagesList.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="group relative rounded border border-slate-200 bg-slate-900 overflow-hidden shadow-xs flex flex-col"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-4/3 w-full bg-slate-800">
                  <Image
                    src={url}
                    alt={`Gallery photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                    unoptimized={url.startsWith("data:")}
                  />

                  {/* Photo Index Badge */}
                  <div className="absolute top-1.5 left-1.5 z-10">
                    {idx === 0 ? (
                      <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        <span>Cover</span>
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                        #{idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Remove Photo"
                    className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Controls Bar */}
                <div className="bg-white p-1.5 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "left")}
                      title="Move Left"
                      className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === imagesList.length - 1}
                      onClick={() => handleMove(idx, "right")}
                      title="Move Right"
                      className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(idx)}
                      className="font-bold text-blue-600 hover:text-blue-800 text-[10px] hover:underline"
                    >
                      Set Cover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 text-center bg-slate-50 border border-slate-200 rounded text-xs text-slate-500">
          No additional gallery photos added yet. (Optional - if left empty, the single thumbnail photo is used).
        </div>
      )}
    </div>
  );
}

export default MultiImageUploadDropzone;
