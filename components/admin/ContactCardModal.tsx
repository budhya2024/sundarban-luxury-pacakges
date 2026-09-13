"use client";

import React, { useState, useEffect } from "react";
import { AdminContactCard } from "@/lib/admin-data";
import { X, Building2, Save } from "lucide-react";

interface ContactCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Omit<AdminContactCard, "id">) => void;
  card: AdminContactCard | null;
}

export default function ContactCardModal({
  isOpen,
  onClose,
  onSave,
  card,
}: ContactCardModalProps) {
  const [formData, setFormData] = useState({
    iconKey: "location" as AdminContactCard["iconKey"],
    title: "",
    subtitle: "",
    details: "",
    actionType: "call" as AdminContactCard["actionType"],
    actionValue: "",
    isPrimary: false,
    status: "Active" as AdminContactCard["status"],
  });

  useEffect(() => {
    if (card) {
      setFormData({
        iconKey: card.iconKey || "location",
        title: card.title,
        subtitle: card.subtitle || "",
        details: card.details ? card.details.join("\n") : "",
        actionType: card.actionType || "call",
        actionValue: card.actionValue || "",
        isPrimary: !!card.isPrimary,
        status: card.status || "Active",
      });
    } else {
      setFormData({
        iconKey: "location",
        title: "",
        subtitle: "",
        details: "",
        actionType: "call",
        actionValue: "",
        isPrimary: false,
        status: "Active",
      });
    }
  }, [card, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      iconKey: formData.iconKey,
      title: formData.title,
      subtitle: formData.subtitle,
      details: formData.details
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
      actionType: formData.actionType,
      actionValue: formData.actionValue,
      isPrimary: formData.isPrimary,
      status: formData.status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[4px] shadow-2xl border border-slate-300 w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-[3px]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {card ? "Edit Office Contact Card" : "Add New Office Location"}
              </h2>
              <p className="text-xs text-slate-500">Public Contact Information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Office / Card Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kolkata Head Booking Office"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subtitle / Region Tag
              </label>
              <input
                type="text"
                placeholder="e.g. Central Kolkata • Main HQ"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Icon Representation
              </label>
              <select
                value={formData.iconKey}
                onChange={(e) => setFormData({ ...formData, iconKey: e.target.value as AdminContactCard["iconKey"] })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="location">Location / Office Building</option>
                <option value="phone">Phone & Hotline</option>
                <option value="email">Email Desk</option>
                <option value="clock">Operating Hours</option>
                <option value="support">Customer Support</option>
                <option value="building">Resort Hub</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Action Type
              </label>
              <select
                value={formData.actionType}
                onChange={(e) => setFormData({ ...formData, actionType: e.target.value as AdminContactCard["actionType"] })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="call">Click to Call</option>
                <option value="whatsapp">Click to WhatsApp</option>
                <option value="email">Click to Email</option>
                <option value="map">Google Maps Navigation</option>
                <option value="none">Information Only (None)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Action Value (Phone / Email / URL)
            </label>
            <input
              type="text"
              placeholder="e.g. +919830012345 or info@sundarbanluxury.com"
              value={formData.actionValue}
              onChange={(e) => setFormData({ ...formData, actionValue: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Contact Details / Lines (One per line) *
            </label>
            <textarea
              required
              rows={4}
              placeholder={"Park Street, Kolkata - 700016\nPhone: +91 98300 12345\nEmail: kolkata@sundarbanluxury.com\nHours: 9 AM - 9 PM"}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPrimary}
                  onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                  className="w-4 h-4 rounded-[2px] text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-slate-800">Highlight as Primary Office</span>
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Display Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminContactCard["status"] })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="Active">Active / Published</option>
                <option value="Inactive">Inactive / Hidden</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[3px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {card ? "Save Office Details" : "Create Office Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
