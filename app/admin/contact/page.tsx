"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { AdminContactCard, AdminContactGeneralInfo } from "@/lib/admin-data";
import ContactCardModal from "@/components/admin/ContactCardModal";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  PhoneCall,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Building2,
  Save,
  ExternalLink,
  MapPin,
  Mail,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function AdminContactManagerPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    contactCards,
    contactGeneralInfo,
    addContactCard,
    updateContactCard,
    deleteContactCard,
    updateContactGeneralInfo,
  } = useAdmin();

  // General info state
  const [generalForm, setGeneralForm] = useState<AdminContactGeneralInfo>({
    heroTitle: contactGeneralInfo.heroTitle,
    heroSubtitle: contactGeneralInfo.heroSubtitle,
    helpdeskPhone: contactGeneralInfo.helpdeskPhone,
    whatsappNumber: contactGeneralInfo.whatsappNumber,
    officialEmail: contactGeneralInfo.officialEmail,
    supportEmail: contactGeneralInfo.supportEmail,
    mainAddress: contactGeneralInfo.mainAddress,
    workingHours: contactGeneralInfo.workingHours,
    googleMapEmbedUrl: contactGeneralInfo.googleMapEmbedUrl,
    emergencyHotline: contactGeneralInfo.emergencyHotline,
  });

  // Sync when contactGeneralInfo is populated from DB
  React.useEffect(() => {
    if (contactGeneralInfo) {
      setGeneralForm({
        heroTitle: contactGeneralInfo.heroTitle || "",
        heroSubtitle: contactGeneralInfo.heroSubtitle || "",
        helpdeskPhone: contactGeneralInfo.helpdeskPhone || "",
        whatsappNumber: contactGeneralInfo.whatsappNumber || "",
        officialEmail: contactGeneralInfo.officialEmail || "",
        supportEmail: contactGeneralInfo.supportEmail || "",
        mainAddress: contactGeneralInfo.mainAddress || "",
        workingHours: contactGeneralInfo.workingHours || "",
        googleMapEmbedUrl: contactGeneralInfo.googleMapEmbedUrl || "",
        emergencyHotline: contactGeneralInfo.emergencyHotline || "",
      });
    }
  }, [contactGeneralInfo]);

  // Modal state
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCardToEdit, setActiveCardToEdit] = useState<AdminContactCard | null>(null);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactGeneralInfo(generalForm);
  };

  const handleOpenAddCard = () => {
    setActiveCardToEdit(null);
    setIsCardModalOpen(true);
  };

  const handleOpenEditCard = (card: AdminContactCard) => {
    setActiveCardToEdit(card);
    setIsCardModalOpen(true);
  };

  const handleSaveCard = (cardData: Omit<AdminContactCard, "id">) => {
    if (activeCardToEdit) {
      updateContactCard(activeCardToEdit.id, cardData);
    } else {
      addContactCard(cardData);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Contact Us Page Management"
        subtitle="Update hotlines, WhatsApp numbers, emergency support lines, and physical office location cards"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Global General Contact Information */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Primary Hotlines, WhatsApp & Support Emails
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Live Synchronized</span>
          </div>

          <form onSubmit={handleSaveGeneral} className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Helpdesk Phone *
                </label>
                <input
                  type="text"
                  required
                  value={generalForm.helpdeskPhone}
                  onChange={(e) => setGeneralForm({ ...generalForm, helpdeskPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Desk Number *
                </label>
                <input
                  type="text"
                  required
                  value={generalForm.whatsappNumber}
                  onChange={(e) => setGeneralForm({ ...generalForm, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  24x7 Emergency Line
                </label>
                <input
                  type="text"
                  value={generalForm.emergencyHotline}
                  onChange={(e) => setGeneralForm({ ...generalForm, emergencyHotline: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Office Working Hours
                </label>
                <input
                  type="text"
                  value={generalForm.workingHours}
                  onChange={(e) => setGeneralForm({ ...generalForm, workingHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Official Booking Email *
                </label>
                <input
                  type="email"
                  required
                  value={generalForm.officialEmail}
                  onChange={(e) => setGeneralForm({ ...generalForm, officialEmail: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Customer Support Email
                </label>
                <input
                  type="email"
                  value={generalForm.supportEmail}
                  onChange={(e) => setGeneralForm({ ...generalForm, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Main Central Address
              </label>
              <input
                type="text"
                value={generalForm.mainAddress}
                onChange={(e) => setGeneralForm({ ...generalForm, mainAddress: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                Save General Contact Info
              </button>
            </div>
          </form>
        </div>

        {/* Office Locations / Branch Cards */}
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Physical Office Cards & Pick-up Hubs ({contactCards.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                These cards appear on the Contact Us page for branch visits and local boarding.
              </p>
            </div>
            <button
              onClick={handleOpenAddCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Office Location
            </button>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactCards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 rounded-[4px] border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {card.isPrimary && (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 rounded-[2px] mb-1">
                            Primary HQ
                          </span>
                        )}
                        <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                        {card.subtitle && (
                          <p className="text-xs text-slate-500 font-medium">{card.subtitle}</p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${card.status === "Active" ? "bg-slate-100 text-slate-800" : "bg-slate-200 text-slate-500"
                          }`}
                      >
                        {card.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-600 font-mono bg-slate-50 p-2.5 rounded-[3px] border border-slate-200">
                      {card.details?.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Action: {card.actionType || "none"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditCard(card)}
                        className="p-1.5 text-blue-700 bg-blue-50 border border-blue-200 rounded-[3px] hover:bg-blue-100 transition-colors"
                        title="Edit Office Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete office card "${card.title}"?`)) {
                            deleteContactCard(card.id);
                          }
                        }}
                        className="p-1.5 text-red-700 bg-red-50 border border-red-200 rounded-[3px] hover:bg-red-100 transition-colors"
                        title="Delete Office"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ContactCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        onSave={handleSaveCard}
        card={activeCardToEdit}
      />
    </div>
  );
}
