"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, CheckCircle } from "lucide-react";
import { AdminGalleryItem } from "@/lib/admin-data";

import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<AdminGalleryItem, "id">) => void;
  initialGalleryItem?: AdminGalleryItem | null;
}

export function GalleryModal({
  isOpen,
  onClose,
  onSave,
  initialGalleryItem,
}: GalleryModalProps) {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Sundarban Tiger Reserve");
  const [column, setColumn] = useState<AdminGalleryItem["column"]>("col3");
  const [category, setCategory] = useState("Wildlife");
  const [order, setOrder] = useState(1);
  const [status, setStatus] = useState<AdminGalleryItem["status"]>("Active");

  useEffect(() => {
    if (initialGalleryItem) {
      setSrc(initialGalleryItem.src || "");
      setAlt(initialGalleryItem.alt || "");
      setTitle(initialGalleryItem.title || "");
      setLocation(initialGalleryItem.location || "Sundarban Tiger Reserve");
      setColumn(initialGalleryItem.column || "col3");
      setCategory(initialGalleryItem.category || "Wildlife");
      setOrder(initialGalleryItem.order || 1);
      setStatus(initialGalleryItem.status || "Active");
    } else {
      setSrc("/assets/images/royal-bengal-tiger.jpg");
      setAlt("Sundarban mangrove wildlife");
      setTitle("");
      setLocation("Sundarban Tiger Reserve");
      setColumn("col3");
      setCategory("Wildlife");
      setOrder(1);
      setStatus("Active");
    }
  }, [initialGalleryItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      src: src.trim(),
      alt: alt.trim() || title.trim(),
      title: title.trim(),
      location: location.trim(),
      column,
      category,
      order: Number(order),
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-md shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center text-white">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {initialGalleryItem ? "Edit Photo Gallery Item" : "Add Photo to Gallery"}
              </h3>
              <p className="text-xs text-slate-300">
                Configure photos, captions, and grid placement in Recent Gallery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <ImageUploadDropzone
              value={src}
              onChange={(newVal) => setSrc(newVal)}
              label="Photo Image File / Upload *"
              helperText="Upload your JPG, PNG, or WebP photo, or select from presets"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Photo Title / Heading *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Royal Bengal Tiger"
                className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Location / Tag *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Dobanki Watch Tower"
                className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Wildlife">Wildlife</option>
                <option value="Boat Safari">Boat Safari</option>
                <option value="Resort Stay">Resort Stay</option>
                <option value="Watchtower">Watchtower</option>
                <option value="Landscape">Landscape &amp; Sunset</option>
                <option value="Cruises">Cruises</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminGalleryItem["status"])}
                className="h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Active">Active (Visible)</option>
                <option value="Inactive">Inactive (Hidden)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{initialGalleryItem ? "Update Photo" : "Add to Gallery"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
