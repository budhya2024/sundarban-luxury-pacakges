"use client";

import React, { useState, useEffect } from "react";
import { X, UtensilsCrossed } from "lucide-react";
import { AdminMenuItem } from "@/lib/admin-data";

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<AdminMenuItem, "id">) => void;
  initialItem?: AdminMenuItem | null;
}

export function DishModal({
  isOpen,
  onClose,
  onSave,
  initialItem,
}: DishModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Bengali Non-Veg" as AdminMenuItem["category"],
    priceTag: "Included in Package",
    tag: "Signature Dish",
    image: "/assets/images/menu/mutton-curry.jpg",
    description: "",
    isChefSpecial: true,
    status: "Active" as AdminMenuItem["status"],
  });

  useEffect(() => {
    if (initialItem) {
      setFormData({
        name: initialItem.name,
        category: initialItem.category,
        priceTag: initialItem.priceTag,
        tag: initialItem.tag,
        image: initialItem.image,
        description: initialItem.description,
        isChefSpecial: initialItem.isChefSpecial,
        status: initialItem.status,
      });
    } else {
      setFormData({
        name: "",
        category: "Bengali Non-Veg",
        priceTag: "Included in Package",
        tag: "Chef Special",
        image: "/assets/images/menu/mutton-curry.jpg",
        description: "",
        isChefSpecial: true,
        status: "Active",
      });
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {initialItem ? "Edit Special Dish" : "Add New Special Dish"}
            </h3>
            <p className="text-xs text-slate-500">
              Bengali cuisine buffet and on-cruise dining
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[3px] text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Dish Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Royal Bengali Mutton Kosha"
              className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as AdminMenuItem["category"],
                  })
                }
                className="w-full h-9 px-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Bengali Non-Veg">Bengali Non-Veg</option>
                <option value="Bengali Fish & Seafood">Bengali Fish & Seafood</option>
                <option value="Bengali Veg">Bengali Veg</option>
                <option value="Dessert & Beverage">Dessert & Beverage</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                placeholder="e.g. Signature Catch"
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pricing Note
              </label>
              <input
                type="text"
                value={formData.priceTag}
                onChange={(e) =>
                  setFormData({ ...formData, priceTag: e.target.value })
                }
                placeholder="e.g. Included in Package or ₹450 / portion"
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Image URL / Path
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Description &amp; Preparation Note
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="e.g. Fresh river bhetki cutlets simmered in mustard and fragrant panch phoron gravy..."
              className="w-full p-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Menu Availability
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as AdminMenuItem["status"],
                  })
                }
                className="w-full h-9 px-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Active">Active on Menu</option>
                <option value="Unavailable">Seasonal Unavailable</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isChefSpecial"
                checked={formData.isChefSpecial}
                onChange={(e) =>
                  setFormData({ ...formData, isChefSpecial: e.target.checked })
                }
                className="w-4 h-4 rounded-[2px] text-blue-600 focus:ring-0 border-slate-300"
              />
              <label
                htmlFor="isChefSpecial"
                className="font-bold text-slate-800 cursor-pointer"
              >
                Highlight as Chef&apos;s Special
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[3px] border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
            >
              {initialItem ? "Update Dish" : "Add Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
