"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  MapPin,
  Maximize2,
  Layers,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminGalleryItem } from "@/lib/admin-data";
import { GalleryModal } from "@/components/admin/GalleryModal";

export default function AdminGalleryPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [columnFilter, setColumnFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminGalleryItem | null>(null);

  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();

  const categories = [
    "All",
    "Wildlife",
    "Boat Safari",
    "Resort Stay",
    "Watchtower",
    "Landscape",
    "Cruises",
  ];

  const columns = [
    { value: "All", label: "All Columns" },
    { value: "col1", label: "Column 1 (Left Square)" },
    { value: "col2", label: "Column 2 (Stacked Top/Bottom)" },
    { value: "col3", label: "Column 3 (Center Tall)" },
    { value: "col4", label: "Column 4 (Stacked Top/Bottom)" },
    { value: "col5", label: "Column 5 (Right Square)" },
  ];

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesColumn =
      columnFilter === "All" || item.column === columnFilter;
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesColumn && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminGalleryItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleToggleStatus = (item: AdminGalleryItem) => {
    const next = item.status === "Active" ? "Inactive" : "Active";
    updateGalleryItem(item.id, { status: next });
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove photo "${title}" from the gallery?`)) {
      deleteGalleryItem(id);
    }
  };

  const handleSaveModal = (data: Omit<AdminGalleryItem, "id">) => {
    if (editingItem) {
      updateGalleryItem(editingItem.id, data);
    } else {
      addGalleryItem(data);
    }
  };

  const total = galleryItems.length;
  const activeCount = galleryItems.filter((g) => g.status === "Active").length;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Photo Gallery Manager"
        subtitle="Manage gallery images, titles, locations, and 5-column layout positions on the homepage"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Total Photos
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {total}
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Active in Gallery
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
                Grid Columns
              </span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">
                5 Columns
              </span>
            </div>
            <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
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
              placeholder="Search photo title, location, tag..."
              className="w-full h-10 pl-9 pr-3 rounded border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent border-0 text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-600">
              <span>Column:</span>
              <select
                value={columnFilter}
                onChange={(e) => setColumnFilter(e.target.value)}
                className="bg-transparent border-0 text-slate-900 font-bold focus:outline-none cursor-pointer text-xs"
              >
                {columns.map((col) => (
                  <option key={col.value} value={col.value}>
                    {col.label}
                  </option>
                ))}
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
              className="h-10 px-4 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo to Gallery</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full bg-white border border-slate-200 rounded p-12 text-center space-y-3">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-800">
                No gallery photos found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No items match your filter criteria. Add a new image using the button above.
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Photo Preview */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900/90 text-white font-bold text-[10px] uppercase">
                        {item.column.toUpperCase()}
                      </span>
                      {item.category && (
                        <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-[10px] uppercase">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === "Active"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {item.status}
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate font-mono">
                      {item.src}
                    </p>
                  </div>
                </div>

                {/* Footer Toolbar */}
                <div className="px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">
                    Order: #{item.order || 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 rounded text-slate-600 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                      title="Edit Photo Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        initialGalleryItem={editingItem}
      />
    </div>
  );
}
