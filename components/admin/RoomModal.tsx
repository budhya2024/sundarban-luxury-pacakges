"use client";

import React, { useState, useEffect } from "react";
import { X, Building2 } from "lucide-react";
import { AdminHotelRoom } from "@/lib/admin-data";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (room: Omit<AdminHotelRoom, "id">) => void;
  initialRoom?: AdminHotelRoom | null;
}

export function RoomModal({
  isOpen,
  onClose,
  onSave,
  initialRoom,
}: RoomModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    pricePerNight: 5500,
    capacity: "2 Adults",
    bedType: "1 King Size Bed",
    totalRooms: 10,
    availableRooms: 6,
    status: "Available" as AdminHotelRoom["status"],
    image: "/assets/sonarbanglahotel.jpg",
    amenitiesText: "River View, AC, Buffet Breakfast, Swimming Pool, Jacuzzi",
  });

  useEffect(() => {
    if (initialRoom) {
      setFormData({
        name: initialRoom.name,
        code: initialRoom.code,
        pricePerNight: initialRoom.pricePerNight,
        capacity: initialRoom.capacity,
        bedType: initialRoom.bedType,
        totalRooms: initialRoom.totalRooms,
        availableRooms: initialRoom.availableRooms,
        status: initialRoom.status,
        image: initialRoom.image,
        amenitiesText: initialRoom.amenities.join(", "),
      });
    } else {
      setFormData({
        name: "",
        code: `HSB-${Math.floor(10 + Math.random() * 90)}`,
        pricePerNight: 5500,
        capacity: "2 Adults",
        bedType: "1 King Size Bed",
        totalRooms: 10,
        availableRooms: 6,
        status: "Available",
        image: "/assets/sonarbanglahotel.jpg",
        amenitiesText: "River View, AC, Buffet Breakfast, Swimming Pool, Jacuzzi",
      });
    }
  }, [initialRoom, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = formData.amenitiesText
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    onSave({
      name: formData.name,
      code: formData.code,
      pricePerNight: Number(formData.pricePerNight),
      capacity: formData.capacity,
      bedType: formData.bedType,
      totalRooms: Number(formData.totalRooms),
      availableRooms: Number(formData.availableRooms),
      status: formData.status,
      image: formData.image,
      amenities: amenities.length ? amenities : ["Resort Amenities"],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {initialRoom ? "Edit Hotel Room Category" : "Add Room Category"}
            </h3>
            <p className="text-xs text-slate-500">
              Hotel Sonar Bangla resort inventory &amp; tariffs
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Room Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Royal Sundarban Riverfront Suite"
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Room Code / SKU
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Rate / Night (₹) *
              </label>
              <input
                type="number"
                required
                min="1000"
                value={formData.pricePerNight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pricePerNight: Number(e.target.value),
                  })
                }
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Total Inventory
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalRooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalRooms: Number(e.target.value),
                  })
                }
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Available Rooms
              </label>
              <input
                type="number"
                min="0"
                value={formData.availableRooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableRooms: Number(e.target.value),
                  })
                }
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Guest Capacity
              </label>
              <input
                type="text"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g. 2 Adults + 1 Child"
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Bed Type
              </label>
              <input
                type="text"
                value={formData.bedType}
                onChange={(e) =>
                  setFormData({ ...formData, bedType: e.target.value })
                }
                placeholder="e.g. 1 King Size Bed"
                className="w-full h-9 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <ImageUploadDropzone
            value={formData.image}
            onChange={(newImage) =>
              setFormData({ ...formData, image: newImage })
            }
            label="Room Photo Upload"
            helperText="Drag & drop room image, browse computer file, or pick a resort preset"
            presets={[
              "/assets/sonarbanglahotel.jpg",
              "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-01.jpg",
              "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-03.jpg",
              "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-04.jpg",
              "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-05.jpg",
              "/assets/images/hotel/gallery/hotel-sonar-bangla-sundarban-06.jpg",
            ]}
            aspectRatio="wide"
          />

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Room Amenities (comma-separated)
            </label>
            <textarea
              rows={2}
              value={formData.amenitiesText}
              onChange={(e) =>
                setFormData({ ...formData, amenitiesText: e.target.value })
              }
              className="w-full p-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="block font-bold text-slate-700 mb-1">
              Availability Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as AdminHotelRoom["status"],
                })
              }
              className="w-full h-9 px-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
            >
              <option value="Available">Available for Booking</option>
              <option value="Sold Out">Sold Out</option>
              <option value="Maintenance">Under Maintenance</option>
            </select>
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
              {initialRoom ? "Update Room" : "Add Room Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
