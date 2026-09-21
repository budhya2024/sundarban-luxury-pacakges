"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { AdminInquiry } from "@/lib/admin-data";
import InquiryModal from "@/components/admin/InquiryModal";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Send,
  Trash2,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { inquiries, addInquiry, updateInquiryStatus, deleteInquiry, convertInquiryToBooking, showToast } =
    useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // New Offline Lead Form state
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "2N/3D Wildlife Cruise Quote",
    message: "Called via phone inquiry regarding family booking for next month.",
    source: "Helpline Call" as AdminInquiry["source"],
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      (inq.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.phone || "").includes(searchTerm) ||
      ((inq.email || "").toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((inq.subject || "").toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenInquiry = (inquiry: AdminInquiry) => {
    setSelectedInquiry(inquiry);
    setIsInquiryModalOpen(true);
  };

  const handleCreateOfflineLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      alert("Name and phone number are required to log an offline lead.");
      return;
    }
    addInquiry({
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      subject: newLead.subject,
      message: newLead.message,
      status: "New",
      source: newLead.source || "Helpline Call",
    });
    setNewLead({
      name: "",
      email: "",
      phone: "",
      subject: "2N/3D Wildlife Cruise Quote",
      message: "",
      source: "Helpline Call",
    });
    setShowAddLead(false);
  };

  const exportInquiriesCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Subject", "Status", "Date", "Source"];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email || ""}"`,
      `"${i.subject || ""}"`,
      i.status,
      i.date,
      i.source || "Contact Form",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sundarban-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inquiries exported to CSV successfully.");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Booking Inquiries & Offline Leads"
        subtitle="Manage and respond to quote requests and custom tour inquiries"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Customer Inquiries &amp; Leads Ledger</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage incoming quote requests and convert leads into confirmed bookings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportInquiriesCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-[3px] hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowAddLead(!showAddLead)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddLead ? "Cancel Lead Entry" : "Log New Offline Lead"}</span>
            </button>
          </div>
        </div>

      {/* Manual Offline Lead Form */}
      {showAddLead && (
        <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              Log Direct / Phone Inquiry
            </h2>
            <button
              onClick={() => setShowAddLead(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleCreateOfflineLead} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashish Roy"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98300 12345"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. subhashish@example.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Package / Topic
                </label>
                <input
                  type="text"
                  value={newLead.subject}
                  onChange={(e) => setNewLead({ ...newLead, subject: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Lead Channel
                </label>
                <select
                  value={newLead.source}
                  onChange={(e) => setNewLead({ ...newLead, source: e.target.value as AdminInquiry["source"] })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] bg-white focus:outline-hidden focus:border-blue-600"
                >
                  <option value="Helpline Call">Helpline Call</option>
                  <option value="WhatsApp">WhatsApp Direct</option>
                  <option value="Contact Form">Contact Form</option>
                  <option value="Custom Request">Custom Request</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Internal Sales Notes / Requirements
              </label>
              <textarea
                rows={2}
                value={newLead.message}
                onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddLead(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-[3px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] shadow-xs"
              >
                Save Inquiry Lead
              </button>
            </div>
          </form>
        </div>
      )}

      {/* KPI Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px]">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Leads</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{inquiries.length}</div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px]">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">New Inbound</div>
          <div className="text-xl font-bold text-blue-600 mt-0.5">
            {inquiries.filter((i) => i.status === "New").length}
          </div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px]">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Contacted</div>
          <div className="text-xl font-bold text-amber-600 mt-0.5">
            {inquiries.filter((i) => i.status === "Contacted" || i.status === "In Progress").length}
          </div>
        </div>
        <div className="p-3.5 bg-white border border-slate-200 rounded-[4px]">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Converted Bookings</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5">
            {inquiries.filter((i) => i.status === "Converted").length}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 rounded-[4px] border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries by name, phone, package..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-[3px] focus:outline-hidden focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          <div className="flex gap-1">
            {["all", "New", "Contacted", "In Progress", "Converted", "Closed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors ${
                  statusFilter === st
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Inquiry Subject</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No booking inquiries match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {inq.phone}
                        </span>
                        {inq.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {inq.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{inq.subject || "General Inquiry"}</div>
                      {inq.message && (
                        <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                          &quot;{inq.message}&quot;
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{inq.date}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded-[2px] border border-slate-200">
                        {inq.source || "Contact Form"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                          inq.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : inq.status === "Contacted"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "Converted"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenInquiry(inq)}
                          className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-[3px] hover:bg-blue-100 transition-colors"
                        >
                          View & Reply
                        </button>
                        {inq.status !== "Converted" && (
                          <button
                            onClick={() => {
                              if (confirm(`Convert inquiry from ${inq.name} into a confirmed booking?`)) {
                                convertInquiryToBooking(inq.id);
                              }
                            }}
                            className="px-2 py-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-[3px] transition-colors"
                            title="Convert to Booking"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry from ${inq.name}?`)) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-[3px] transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </main>

      {/* Inquiry Detail Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        inquiry={selectedInquiry}
        onUpdateStatus={updateInquiryStatus}
        onConvertToBooking={convertInquiryToBooking}
      />
    </div>
  );
}
