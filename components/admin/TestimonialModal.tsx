"use client";

import React, { useState, useEffect } from "react";
import { X, MessageSquare, CheckCircle } from "lucide-react";
import { AdminTestimonialItem } from "@/lib/admin-data";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<AdminTestimonialItem, "id">) => void;
  initialTestimonial?: AdminTestimonialItem | null;
}

export function TestimonialModal({
  isOpen,
  onClose,
  onSave,
  initialTestimonial,
}: TestimonialModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Traveller");
  const [avatar, setAvatar] = useState("/assets/images/avatars/andrew.jpg");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [tourPackage, setTourPackage] = useState("Sundarban 2 Nights 3 Days Tour");
  const [date, setDate] = useState("2026-09-10");
  const [featured, setFeatured] = useState(true);
  const [status, setStatus] = useState<AdminTestimonialItem["status"]>("Active");

  useEffect(() => {
    if (initialTestimonial) {
      setName(initialTestimonial.name || "");
      setRole(initialTestimonial.role || "Traveller");
      setAvatar(initialTestimonial.avatar || "/assets/images/avatars/andrew.jpg");
      setRating(initialTestimonial.rating || 5);
      setText(initialTestimonial.text || "");
      setTourPackage(initialTestimonial.tourPackage || "Sundarban 2 Nights 3 Days Tour");
      setDate(initialTestimonial.date || "2026-09-10");
      setFeatured(!!initialTestimonial.featured);
      setStatus(initialTestimonial.status || "Active");
    } else {
      setName("");
      setRole("Wildlife Enthusiast, Kolkata");
      setAvatar("/assets/images/avatars/andrew.jpg");
      setRating(5);
      setText("");
      setTourPackage("1 Night 2 Days Luxury Cruise");
      setDate(new Date().toISOString().split("T")[0]);
      setFeatured(true);
      setStatus("Active");
    }
  }, [initialTestimonial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim(),
      role: role.trim(),
      avatar: avatar.trim() || "/assets/images/avatars/andrew.jpg",
      rating: Number(rating),
      text: text.trim(),
      tourPackage: tourPackage.trim() || "Sundarban Luxury Tour",
      date: date || new Date().toISOString().split("T")[0],
      featured,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-md shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-amber-600 flex items-center justify-center text-white">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                {initialTestimonial ? "Edit Client Review" : "Add Client Review"}
              </h3>
              <p className="text-[11px] text-slate-300">
                Manage traveler review shown on website
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Client / Guest Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Subir Ganguly"
                className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Role / Location
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Wildlife Enthusiast, Kolkata"
                className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Rating (1 to 5 Stars)
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600 text-xs"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              <option value={3}>⭐⭐⭐ (3 Stars)</option>
              <option value={2}>⭐⭐ (2 Stars)</option>
              <option value={1}>⭐ (1 Star)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Review Quote / Message *
            </label>
            <textarea
              rows={3}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did the client say about the experience, food, boat, guides, and safety..."
              className="w-full p-2.5 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600 leading-relaxed text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  id="featured-test"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 cursor-pointer"
                />
                <label htmlFor="featured-test" className="font-bold text-slate-800 cursor-pointer text-xs">
                  Featured
                </label>
              </div>

              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AdminTestimonialItem["status"])}
                  className="h-7 px-2 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600 text-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors shadow-xs flex items-center gap-1 text-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{initialTestimonial ? "Update Review" : "Save Review"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
