"use client";

import React, { useState } from "react";
import { AdminInquiry } from "@/lib/admin-data";
import { X, Mail, Phone, Calendar, MessageSquare, Send, CheckCircle } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: AdminInquiry | null;
  onUpdateStatus: (id: string, status: AdminInquiry["status"]) => void;
  onConvertToBooking: (inquiryId: string) => void;
}

export default function InquiryModal({
  isOpen,
  onClose,
  inquiry,
  onUpdateStatus,
  onConvertToBooking,
}: InquiryModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "whatsapp">("details");
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState("");

  if (!isOpen || !inquiry) return null;

  const defaultMsg = `Hello ${inquiry.name}, Greetings from Sundarban Luxury Safari & Hotel Sonar Bangla! We received your inquiry regarding "${inquiry.subject || "Sundarban Tour Package"}". Our booking executive is ready to assist you with customized boat safari itineraries and luxury cottage reservations. Please let us know your preferred travel dates.`;

  const handleSendWhatsApp = () => {
    const textToSend = customWhatsAppMsg || defaultMsg;
    const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(textToSend)}`, "_blank");
  };

  const handleConvert = () => {
    if (confirm(`Convert inquiry from ${inquiry.name} into a confirmed booking record?`)) {
      onConvertToBooking(inquiry.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[4px] shadow-2xl border border-slate-300 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-[2px] border border-blue-200">
                INQUIRY #{inquiry.id.slice(-6).toUpperCase()}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                  inquiry.status === "New"
                    ? "bg-blue-100 text-blue-800"
                    : inquiry.status === "Contacted"
                    ? "bg-amber-100 text-amber-800"
                    : inquiry.status === "Converted"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {inquiry.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">{inquiry.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-[3px] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Inquiry Information
          </button>
          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "whatsapp"
                ? "border-blue-600 text-blue-700 bg-white"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            WhatsApp Quick Reply
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === "details" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-[3px] border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 mt-0.5 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {inquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {inquiry.email || "Not Provided"}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                    Inquiry Subject
                  </span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {inquiry.subject || "General Inquiry"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                    Lead Date & Channel
                  </span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {inquiry.date} • {inquiry.source}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Customer Inquiry Message
                </label>
                <div className="p-3 bg-white border border-slate-200 rounded-[3px] text-xs text-slate-700 leading-relaxed min-h-[80px]">
                  {inquiry.message || "No specific message provided. Customer requested quotation callback."}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Update Lead Stage Status
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(["New", "Contacted", "In Progress", "Converted", "Closed"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(inquiry.id, st)}
                      className={`py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider rounded-[3px] border transition-colors ${
                        inquiry.status === st
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Quotation Template
                </label>
                <textarea
                  rows={6}
                  value={customWhatsAppMsg || defaultMsg}
                  onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 leading-relaxed font-sans"
                />
              </div>
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-[3px] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                Launch WhatsApp Chat with {inquiry.phone}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-[3px] transition-colors"
          >
            Close
          </button>
          {inquiry.status !== "Converted" && (
            <button
              type="button"
              onClick={handleConvert}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Convert to Confirmed Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
