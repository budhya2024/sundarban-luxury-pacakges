"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Trash2, AlertTriangle, Info, CheckCircle2, X } from "lucide-react";

export interface ConfirmOptions {
  title?: string;
  message: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  icon?: React.ReactNode;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
  confirmDelete: (itemName?: string, customMessage?: string) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions | string) => {
    return new Promise<boolean>((resolve) => {
      const parsedOptions: ConfirmOptions =
        typeof options === "string"
          ? { message: options, title: "Confirm Action", variant: "danger" }
          : options;

      setModalState({
        isOpen: true,
        options: parsedOptions,
        resolve,
      });
    });
  }, []);

  const confirmDelete = useCallback(
    (itemName?: string, customMessage?: string) => {
      return confirm({
        title: "Confirm Deletion",
        itemName: itemName,
        message:
          customMessage ||
          `Are you sure you want to delete ${
            itemName ? `"${itemName}"` : "this item"
          }? This action is permanent and cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "danger",
      });
    },
    [confirm]
  );

  const handleConfirm = () => {
    if (modalState) {
      modalState.resolve(true);
      setModalState(null);
    }
  };

  const handleCancel = () => {
    if (modalState) {
      modalState.resolve(false);
      setModalState(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalState?.isOpen) {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState]);

  return (
    <ConfirmContext.Provider value={{ confirm, confirmDelete }}>
      {children}

      {/* Professional Admin Confirmation Modal Overlay */}
      {modalState && modalState.isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
            onClick={handleCancel}
          />

          {/* Clean Admin Modal Window */}
          <div className="relative bg-white rounded-[4px] shadow-2xl border border-slate-300 max-w-md w-full overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    modalState.options.variant === "warning"
                      ? "bg-amber-500"
                      : modalState.options.variant === "info"
                      ? "bg-blue-500"
                      : modalState.options.variant === "success"
                      ? "bg-emerald-500"
                      : "bg-rose-600"
                  }`}
                />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {modalState.options.title || "Confirm Action"}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-[3px] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex items-start gap-4">
              {/* Icon Container */}
              <div
                className={`p-2.5 rounded-[4px] border shrink-0 ${
                  modalState.options.variant === "warning"
                    ? "bg-amber-50 text-amber-600 border-amber-200"
                    : modalState.options.variant === "info"
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : modalState.options.variant === "success"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-rose-50 text-rose-600 border-rose-200"
                }`}
              >
                {modalState.options.icon ? (
                  modalState.options.icon
                ) : modalState.options.variant === "warning" ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : modalState.options.variant === "info" ? (
                  <Info className="w-5 h-5" />
                ) : modalState.options.variant === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0">
                {modalState.options.itemName && (
                  <div className="mb-2 inline-block px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-[3px] text-xs font-bold text-slate-800 max-w-full truncate">
                    {modalState.options.itemName}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {modalState.options.message}
                </p>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-end gap-2 px-4 py-3 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-1.5 rounded-[3px] border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                {modalState.options.cancelText || "Cancel"}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={`px-4 py-1.5 rounded-[3px] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                  modalState.options.variant === "warning"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : modalState.options.variant === "info"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : modalState.options.variant === "success"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {modalState.options.variant === "danger" || !modalState.options.variant ? (
                  <Trash2 className="w-3.5 h-3.5" />
                ) : null}
                <span>{modalState.options.confirmText || "Confirm"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
