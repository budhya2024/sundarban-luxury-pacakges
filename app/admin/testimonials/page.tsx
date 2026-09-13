"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  Filter,
  User,
  Sparkles,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminTestimonialItem } from "@/lib/admin-data";
import { TestimonialModal } from "@/components/admin/TestimonialModal";

export default function AdminTestimonialsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminTestimonialItem | null>(null);

  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesRating =
      ratingFilter === "All" || item.rating === Number(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminTestimonialItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleToggleStatus = (item: AdminTestimonialItem) => {
    const next = item.status === "Active" ? "Inactive" : "Active";
    updateTestimonial(item.id, { status: next });
  };

  const handleToggleFeatured = (item: AdminTestimonialItem) => {
    updateTestimonial(item.id, { featured: !item.featured });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete testimonial by "${name}"?`)) {
      deleteTestimonial(id);
    }
  };

  const handleSaveModal = (data: Omit<AdminTestimonialItem, "id">) => {
    if (editingItem) {
      updateTestimonial(editingItem.id, data);
    } else {
      addTestimonial(data);
    }
  };

  const total = testimonials.length;
  const activeCount = testimonials.filter((t) => t.status === "Active").length;
  const featuredCount = testimonials.filter((t) => t.featured).length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Client Reviews &amp; Testimonials Manager"
        subtitle="Manage verified guest reviews and star ratings displayed in the What Client Say carousel"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Total Reviews
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {total}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Active on Home
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {activeCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between col-span-2 sm:col-span-1">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Featured Highlights
              </span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">
                {featuredCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-blue-500" />
            </div>
          </div>
        </div>

        {/* Action & Filter Bar */}
        <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reviewer name, role, keywords..."
              className="w-full h-10 pl-9 pr-3 rounded border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">
              <Filter className="w-3.5 h-3.5" />
              <span>Rating:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="bg-transparent border-0 text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="All">All Stars</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>

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
              className="h-10 px-4 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded p-12 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-800">
                No testimonials found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No reviews match your current filters. Add a new client review using the button above.
              </p>
            </div>
          ) : (
            filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Top Bar: Reviewer Avatar, Name, Rating */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 ring-2 ring-amber-500/30 flex-shrink-0">
                        <Image
                          src={item.avatar || "/assets/images/avatars/andrew.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded border border-slate-100">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  {/* Tour Tag & Date */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200 truncate max-w-[180px]">
                      {item.tourPackage || "Sundarban Safari"}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Footer Toolbar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        item.featured
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Star className={`w-3 h-3 ${item.featured ? "fill-amber-600 text-amber-600" : ""}`} />
                      <span>{item.featured ? "Featured" : "Standard"}</span>
                    </button>

                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        item.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition-colors"
                      title="Edit Testimonial"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <TestimonialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        initialTestimonial={editingItem}
      />
    </div>
  );
}
