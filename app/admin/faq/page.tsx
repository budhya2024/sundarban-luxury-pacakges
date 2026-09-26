"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminFaqItem } from "@/lib/admin-data";
import { FaqModal } from "@/components/admin/FaqModal";

export default function AdminFaqPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaqItem | null>(null);

  const { faqs, addFaq, updateFaq, deleteFaq } = useAdmin();

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.questionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || faq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: AdminFaqItem) => {
    setEditingFaq(faq);
    setModalOpen(true);
  };

  const handleToggleStatus = (faq: AdminFaqItem) => {
    const next = faq.status === "Active" ? "Inactive" : "Active";
    updateFaq(faq.id, { status: next });
  };

  const handleDelete = (id: string, question: string) => {
    if (confirm(`Are you sure you want to delete this FAQ: "${question}"?`)) {
      deleteFaq(id);
    }
  };

  const handleSaveModal = (data: Omit<AdminFaqItem, "id">) => {
    if (editingFaq) {
      updateFaq(editingFaq.id, data);
    } else {
      addFaq(data);
    }
  };

  const totalFaqs = faqs.length;
  const activeFaqs = faqs.filter((f) => f.status === "Active").length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="FAQ Questions Manager"
        subtitle="Manage frequently asked questions displayed on the public website and tour pages"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Total Questions
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {totalFaqs}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Active on Live Site
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {activeFaqs}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter & Action Bar */}
        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQ question, answer keywords..."
              className="w-full h-10 pl-9 pr-3 rounded border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-0 text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              onClick={handleOpenCreate}
              className="h-10 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Question</span>
            </button>
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded p-12 text-center space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-800">
                No FAQ questions found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No items match your search or filter. You can add a new question with the button above.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded p-5 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-extrabold text-xs">
                      {faq.questionNumber || `Q${idx + 1}`}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => handleToggleStatus(faq)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                        faq.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {faq.status}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 rounded text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                      title="Edit Question"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id, faq.question)}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <FaqModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        initialFaq={editingFaq}
      />
    </div>
  );
}
