"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  Phone,
  Mail,
  MapPin,
  Shield,
  Save,
  CheckCircle,
  CreditCard,
  Lock,
  KeyRound,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAdmin } from "@/context/AdminContext";

export default function AdminSettingsPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { showToast } = useAdmin();

  const [settings, setSettings] = useState({
    businessName: "Sundarban Luxury Package (Techshift)",
    helpline1: "+91 70014 03498",
    helpline2: "+91 70014 03498",
    whatsappNumber: "+91 70014 03498",
    bookingEmail: "sundarbanluxurypackage@gmail.com",
    supportEmail: "sundarbanluxurypackage@gmail.com",
    departurePoint: "Godkhali Ferry Ghat, Canning Town, South 24 Parganas, West Bengal 743329",
    currency: "INR (₹)",
    taxRate: 5,
    permitFeeIncluded: true,
    cashOnArrival: true,
    onlineUPI: true,
    bankTransfer: true,
    autoConfirmInstant: true,
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Business settings saved successfully.");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }

      setPasswordSuccess("Admin password updated successfully.");
      showToast("Admin password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordError(err?.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSendMagicLink = async () => {
    setMagicLinkLoading(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: settings.bookingEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch magic link");
      showToast("Magic login & reset instructions sent to " + settings.bookingEmail);
    } catch (err: any) {
      showToast(err?.message || "Failed to send magic link");
    } finally {
      setMagicLinkLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        onOpenMobile={() => setIsMobileOpen(true)}
        title="Settings &amp; Configuration"
        subtitle="Business contact channels, booking policies, and system preferences"
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Business Contact Channels Card */}
          <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Building className="w-5 h-5 text-blue-700" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Business &amp; Helpline Channels
                </h3>
                <p className="text-[11px] text-slate-500">
                  Displayed on public headers, footers, and booking vouchers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) =>
                    setSettings({ ...settings, businessName: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Primary Helpline
                </label>
                <input
                  type="text"
                  value={settings.helpline1}
                  onChange={(e) =>
                    setSettings({ ...settings, helpline1: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Booking Notification Email
                </label>
                <input
                  type="email"
                  value={settings.bookingEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, bookingEmail: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, supportEmail: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Primary Departure Point &amp; Ferry Ghat Address
                </label>
                <textarea
                  rows={2}
                  value={settings.departurePoint}
                  onChange={(e) =>
                    setSettings({ ...settings, departurePoint: e.target.value })
                  }
                  className="w-full p-2.5 rounded-[3px] border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Manual Payment & Financial Policies */}
          <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-blue-700" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Manual Payment Methods &amp; Policies
                </h3>
                <p className="text-[11px] text-slate-500">
                  Configure direct manual payment modes (No online gateway required).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cashOnArrival}
                    onChange={(e) =>
                      setSettings({ ...settings, cashOnArrival: e.target.checked })
                    }
                    className="w-4 h-4 rounded-[2px] text-blue-600 focus:ring-0 border-slate-300"
                  />
                  <span className="font-bold text-slate-800">
                    Cash Payment at Godkhali Boarding Point (Pay on Arrival)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.onlineUPI}
                    onChange={(e) =>
                      setSettings({ ...settings, onlineUPI: e.target.checked })
                    }
                    className="w-4 h-4 rounded-[2px] text-blue-600 focus:ring-0 border-slate-300"
                  />
                  <span className="font-bold text-slate-800">
                    Manual UPI QR Scan / Direct GooglePay / PhonePe Transfer
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.bankTransfer}
                    onChange={(e) =>
                      setSettings({ ...settings, bankTransfer: e.target.checked })
                    }
                    className="w-4 h-4 rounded-[2px] text-blue-600 focus:ring-0 border-slate-300"
                  />
                  <span className="font-bold text-slate-800">
                    Direct Bank NEFT / IMPS Transfer with Manual UTR Verification
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.permitFeeIncluded}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        permitFeeIncluded: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded-[2px] text-blue-600 focus:ring-0 border-slate-300"
                  />
                  <span className="font-bold text-slate-800">
                    Forest Department Wildlife Permits Included in Base Price
                  </span>
                </label>
              </div>

              <div className="p-3.5 rounded-[3px] bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">
                  Manual Verification Mode
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Online payment gateways are disabled. All reservations are verified manually by admin staff via Phone / WhatsApp confirmation.
                </p>
                <div className="pt-2 flex items-center gap-2 text-blue-700 font-bold text-[11px]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Manual Payment &amp; Permit Confirmation Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[3px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>

        {/* Security & Administrator Password Section */}
        <div className="bg-white border border-slate-200/90 rounded-[4px] p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Admin Security &amp; Password
                </h3>
                <p className="text-[11px] text-slate-500">
                  Update your super-admin password or dispatch a 1-click magic login link to your email.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendMagicLink}
              disabled={magicLinkLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-[3px] transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{magicLinkLoading ? "Sending Link..." : "Email Magic Login Link"}</span>
            </button>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {passwordError && (
              <div className="p-3 rounded-[3px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 rounded-[3px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 px-3 rounded-[3px] border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                disabled={passwordLoading}
                className="px-5 py-2 rounded-[3px] bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>{passwordLoading ? "Updating..." : "Update Password"}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
