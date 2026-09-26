"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, UtensilsCrossed, UploadCloud, Trash2, Check, RefreshCw } from "lucide-react";

export interface StaticMenuItem {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  photo: string;
}

interface StaticMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { name: string; tagline?: string; description?: string; photo: string }) => void;
  initialItem?: StaticMenuItem | null;
}

export function StaticMenuModal({
  isOpen,
  onClose,
  onSave,
  initialItem,
}: StaticMenuModalProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name || "");
      setTagline(initialItem.tagline || "");
      setDescription(initialItem.description || "");
      setPhoto(initialItem.photo || "");
      setFileName(null);
    } else {
      setName("");
      setTagline("");
      setDescription("");
      setPhoto("/assets/images/Punjabi-Mutton-Curry-5.jpg");
      setFileName(null);
    }
    setError(null);
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhoto(reader.result);
      }
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter the menu name");
      return;
    }
    if (!photo.trim()) {
      setError("Please upload a photo for the menu item");
      return;
    }

    onSave({
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      photo: photo.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Standard Light Admin Modal Header (No black background) */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-[3px]">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {initialItem ? "Edit Special Menu Item" : "Add Special Menu Item"}
              </h3>
              <p className="text-xs text-slate-500">
                Sundarban buffet cuisine and cruise dining item
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[3px] text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs flex-1">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-[3px] text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* 1. Menu Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">
              Menu Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Royal Mutton Kosha, Gold Prawn Malai Curry"
              className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
            />
          </div>

          {/* 2. Tagline */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">
              Tagline / Badge
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Royal Delicacy, Bengal Special, Fresh Catch"
              className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
            />
          </div>

          {/* 3. Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Tender goat meat slow-cooked with golden potatoes & authentic Bengali garam masala."
              className="w-full p-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600 text-xs leading-relaxed"
            />
          </div>

          {/* 4. Photo Upload Option */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-xs">
              Photo Upload <span className="text-rose-600">*</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* If no photo or want to replace */}
            {!photo ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-[4px] p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-colors text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-800 text-xs">
                  Click to upload menu photo
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Supports JPG, PNG, WebP
                </p>
              </div>
            ) : (
              /* Photo Uploaded Preview Box */
              <div className="space-y-2.5">
                <div className="relative h-36 w-full rounded-[4px] overflow-hidden bg-slate-100 border border-slate-300 group">
                  <Image
                    src={photo}
                    alt="Uploaded Menu Photo"
                    fill
                    className="object-cover"
                    unoptimized={photo.startsWith("data:")}
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-[3px] bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto("");
                        setFileName(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="px-3 py-1.5 rounded-[3px] bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-rose-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-[3px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-700 truncate">
                      {fileName || "Photo selected"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-blue-700 hover:underline shrink-0"
                  >
                    Upload different
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[3px] border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs text-xs flex items-center gap-1.5"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{initialItem ? "Update Dish" : "Add Dish"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
