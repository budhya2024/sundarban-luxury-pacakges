"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Plus,
  Search,
  Edit2,
  Trash2,
  Users,
  Clock,
  Star,
  ExternalLink,
  Tag,
  CheckCircle,
  Copy,
  Layers,
  Utensils,
  Calendar,
  Sparkles,
  MapPin,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";
import { AdminTourPackage } from "@/lib/admin-data";
import { PackageModal } from "@/components/admin/PackageModal";

export default function AdminPackagesPage() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<AdminTourPackage | null>(null);

  const { packages, addPackage, updatePackage, deletePackage, showToast } = useAdmin();

  const statuses = ["All", "Active", "Draft", "Archived"];

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || pkg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Top Metrics
  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.status === "Active").length;
  const draftPackages = packages.filter((p) => p.status === "Draft").length;
  const featuredPackages = packages.filter((p) => p.featured).length;

  const handleOpenCreate = () => {
    router.push("/admin/packages/editor");
  };

  const handleOpenEdit = (pkg: AdminTourPackage) => {
    router.push(`/admin/packages/editor?id=${pkg.id}`);
  };

  const handleDuplicate = (pkg: AdminTourPackage) => {
    const duplicateData: Omit<AdminTourPackage, "id"> = {
      ...pkg,
      name: `${pkg.name} (Copy)`,
      slug: `${pkg.slug}-copy-${Math.floor(100 + Math.random() * 900)}`,
      status: "Draft",
      featured: false,
    };
    addPackage(duplicateData);
    showToast(`Package duplicated as draft: "${duplicateData.name}"`);
  };

  const handleToggleFeatured = (pkg: AdminTourPackage) => {
    updatePackage(pkg.id, { featured: !pkg.featured });
  };

  const handleToggleStatus = (pkg: AdminTourPackage) => {
    const nextStatus = pkg.status === "Active" ? "Draft" : "Active";
    updatePackage(pkg.id, { status: nextStatus });
  };

  const handleSaveModal = (pkgData: Omit<AdminTourPackage, "id">) => {
    if (editingPackage) {
      updatePackage(editingPackage.id, pkgData);
    } else {
      addPackage(pkgData);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deletePackage(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Tour Packages &amp; Itineraries Manager"
        subtitle="Create, edit, duplicate, and configure full day-wise itineraries, menus, and pricing"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Total Packages
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {totalPackages}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[3px] bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Active &amp; Live
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {activePackages}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[3px] bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Featured on Home
              </span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">
                {featuredPackages}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[3px] bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block">
                Draft / Staged
              </span>
              <span className="text-2xl font-black text-slate-700 mt-1 block">
                {draftPackages}
              </span>
            </div>
            <div className="w-10 h-10 rounded-[3px] bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Actions & Filters Bar */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search package name, duration, slug..."
              className="w-full h-10 pl-9 pr-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">


            {/* Status Filters */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 text-xs font-bold">
              {statuses.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    statusFilter === st
                      ? st === "Active"
                        ? "bg-emerald-600 text-white shadow-2xs font-extrabold"
                        : st === "Draft"
                        ? "bg-amber-500 text-white shadow-2xs font-extrabold"
                        : "bg-white text-blue-600 shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded border border-slate-200 text-xs font-bold text-slate-600">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-400 hover:text-slate-700"
                }`}
                title="List Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-400 hover:text-slate-700"
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleOpenCreate}
              className="h-10 px-4 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Tour Package</span>
            </button>
          </div>
        </div>

        {/* Packages List / Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded p-12 text-center space-y-3">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-800">
              No tour packages found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No packages match your search filter criteria. Try resetting filters or create a new package.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              className="px-3 py-1.5 rounded bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="bg-white border border-slate-200/90 rounded-[4px] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3 px-4">Package</th>
                    <th className="py-3 px-4">Duration &amp; Capacity</th>
                    <th className="py-3 px-4">Tariff / Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((pkg) => {
                    return (
                      <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-[3px] overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                              <Image
                                src={pkg.image}
                                alt={pkg.name}
                                fill
                                className="object-cover"
                                sizes="60px"
                              />
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                                <Link
                                  href={`/admin/packages/editor?id=${pkg.id}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {pkg.name}
                                </Link>
                                {pkg.featured && (
                                  <span title="Featured">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 block mt-0.5 truncate max-w-[200px]">
                                /tour/{pkg.slug}
                              </span>
                            </div>
                          </div>
                        </td>



                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-800">{pkg.duration}</div>
                          <div className="text-[10px] text-slate-500">Max {pkg.maxGuests} Guests</div>
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-black text-slate-900 text-xs">
                            ₹{pkg.price.toLocaleString()}
                          </div>
                          {pkg.originalPrice > pkg.price && (
                            <div className="text-[10px] text-slate-400 line-through">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(pkg)}
                            className="flex items-center gap-2 group cursor-pointer focus:outline-hidden select-none"
                            title={`Click to switch status to ${pkg.status === "Active" ? "Inactive" : "Active"}`}
                          >
                            <div
                              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                                pkg.status === "Active" ? "bg-blue-600" : "bg-slate-300"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full shadow-xs transform transition-transform duration-200 ease-in-out ${
                                  pkg.status === "Active" ? "translate-x-4" : "translate-x-0"
                                }`}
                              />
                            </div>
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider ${
                                pkg.status === "Active" ? "text-blue-700" : "text-slate-500"
                              }`}
                            >
                              {pkg.status === "Active" ? "Active" : "Inactive"}
                            </span>
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/tour/${pkg.slug}`}
                              target="_blank"
                              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors border border-slate-200"
                              title="View Live Public Page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                              href={`/admin/packages/editor?id=${pkg.id}`}
                              className="p-1.5 text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors border border-slate-200 font-bold"
                              title="Edit Package"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => handleDelete(pkg.id, pkg.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors border border-slate-200"
                              title="Delete Package"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => {
              const itineraryDaysCount = pkg.itinerary?.length || 0;
              const menuDaysCount = pkg.foodMenu?.length || 0;
              const inclusionsCount = pkg.inclusions?.length || 0;

              return (
                <div
                  key={pkg.id}
                  className="bg-white border border-slate-200/90 rounded-[4px] shadow-2xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-[2px] bg-slate-900/90 text-white font-bold text-[10px] uppercase backdrop-blur-xs">
                          {pkg.category}
                        </span>
                        {pkg.featured && (
                          <span className="px-2 py-0.5 rounded-[2px] bg-[#d97706] text-white font-bold text-[10px] uppercase flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-white" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(pkg)}
                        className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[2px] text-[10px] font-bold cursor-pointer transition-opacity hover:opacity-90 ${
                          pkg.status === "Active"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-800 text-slate-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {pkg.status}
                      </button>

                      {/* Bottom Image Overlay Info */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-semibold">
                        <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{pkg.duration}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <span>Max {pkg.maxGuests}</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {pkg.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                          /tour/{pkg.slug}
                        </span>
                      </div>

                      {/* Pricing Row */}
                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                            Tariff Per Person
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-slate-900">
                              ₹{pkg.price.toLocaleString()}
                            </span>
                            {pkg.originalPrice > pkg.price && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{pkg.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded border border-amber-200/60">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{pkg.rating}</span>
                          <span className="text-slate-400 font-normal">
                            ({pkg.reviewsCount})
                          </span>
                        </div>
                      </div>

                      {/* Rich Content Summary Badges */}
                      <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span>{itineraryDaysCount} Days Plan</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-emerald-500" />
                          <span>{menuDaysCount} Menu Days</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-slate-500" />
                          <span>{inclusionsCount} Inclusions</span>
                        </span>
                      </div>

                      {/* Departure Point */}
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate pt-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{pkg.departure}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/tour/${pkg.slug}`}
                      target="_blank"
                      className="text-[11px] font-extrabold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Public Page</span>
                    </Link>

                    <div className="flex items-center gap-1">
                      {/* Featured toggle */}
                      <button
                        onClick={() => handleToggleFeatured(pkg)}
                        className={`p-1.5 rounded-[3px] transition-colors ${
                          pkg.featured
                            ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
                            : "text-slate-400 hover:text-amber-500 hover:bg-white"
                        }`}
                        title={pkg.featured ? "Remove from Featured" : "Mark as Featured"}
                      >
                        <Star className={`w-3.5 h-3.5 ${pkg.featured ? "fill-amber-500" : ""}`} />
                      </button>

                      {/* Duplicate package */}
                      <button
                        onClick={() => handleDuplicate(pkg)}
                        className="p-1.5 rounded-[3px] text-slate-500 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                        title="Duplicate this package"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit full details */}
                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="p-1.5 rounded-[3px] text-slate-700 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors font-bold"
                        title="Edit Full Package Details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(pkg.id, pkg.name)}
                        className="p-1.5 rounded-[3px] text-slate-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Comprehensive 7-Tab Create / Edit Modal */}
      <PackageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        initialPackage={editingPackage}
      />
    </div>
  );
}
