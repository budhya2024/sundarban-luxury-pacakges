"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminMenuItem } from "@/lib/admin-data";
import { DishModal } from "@/components/admin/DishModal";

export default function AdminMenuPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);

  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useAdmin();

  const categories = [
    "All",
    "Bengali Non-Veg",
    "Bengali Fish & Seafood",
    "Bengali Veg",
    "Dessert & Beverage",
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminMenuItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSaveModal = (itemData: Omit<AdminMenuItem, "id">) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      deleteMenuItem(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Special Menu &amp; Bengali Cuisine"
        subtitle="Manage cruise buffet menu, chef specials, and traditional seafood delicacies"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Actions & Filters Bar */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dish name, seafood..."
              className="w-full h-10 pl-9 pr-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={handleOpenCreate}
              className="h-10 px-4 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Special Dish</span>
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-[4px] shadow-2xs overflow-hidden flex flex-col justify-between group hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="300px"
                  />
                  {item.isChefSpecial && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-[2px] bg-[#d97706] text-white font-bold text-[10px] uppercase">
                      Chef Special
                    </span>
                  )}
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-[2px] text-[10px] font-bold ${
                      item.status === "Active"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                  <div className="pt-2 text-xs font-bold text-slate-800">
                    {item.priceTag}
                  </div>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {item.tag}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-[3px] text-slate-600 hover:text-blue-700 hover:bg-white transition-colors"
                    title="Edit Dish"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-white transition-colors"
                    title="Delete Dish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Dish Modal */}
      <DishModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        initialItem={editingItem}
      />
    </div>
  );
}
