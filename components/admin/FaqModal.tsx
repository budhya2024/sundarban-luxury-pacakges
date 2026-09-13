"use client";

import React, { useState, useEffect } from "react";
import { X, HelpCircle, CheckCircle } from "lucide-react";
import { AdminFaqItem } from "@/lib/admin-data";

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: Omit<AdminFaqItem, "id">) => void;
  initialFaq?: AdminFaqItem | null;
}

export function FaqModal({
  isOpen,
  onClose,
  onSave,
  initialFaq,
}: FaqModalProps) {
  const [questionNumber, setQuestionNumber] = useState("Q1");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("Booking & Reservations");
  const [order, setOrder] = useState(1);
  const [status, setStatus] = useState<AdminFaqItem["status"]>("Active");

  useEffect(() => {
    if (initialFaq) {
      setQuestionNumber(initialFaq.questionNumber || "Q1");
      setQuestion(initialFaq.question || "");
      setAnswer(initialFaq.answer || "");
      setCategory(initialFaq.category || "Booking & Reservations");
      setOrder(initialFaq.order || 1);
      setStatus(initialFaq.status || "Active");
    } else {
      setQuestionNumber("Q1");
      setQuestion("");
      setAnswer("");
      setCategory("Booking & Reservations");
      setOrder(1);
      setStatus("Active");
    }
  }, [initialFaq, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      questionNumber: questionNumber || "Q",
      question: question.trim(),
      answer: answer.trim(),
      category,
      order: Number(order),
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-md shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {initialFaq ? "Edit FAQ Question" : "Create New FAQ Question"}
              </h3>
              <p className="text-xs text-slate-300">
                Manage questions shown on homepage FAQ accordion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Question Badge / No.
              </label>
              <input
                type="text"
                required
                value={questionNumber}
                onChange={(e) => setQuestionNumber(e.target.value)}
                placeholder="Q1, Q2, etc."
                className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Booking & Reservations">Booking &amp; Reservations</option>
                <option value="Wildlife & Safari">Wildlife &amp; Safari</option>
                <option value="Package Inclusions">Package Inclusions</option>
                <option value="Safety & Guidelines">Safety &amp; Guidelines</option>
                <option value="Preparation & Packing">Preparation &amp; Packing</option>
                <option value="General Information">General Information</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full h-9 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              FAQ Question *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How do I start the process of booking a luxury Sundarban tour package?"
              className="w-full h-10 px-3 rounded border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:border-blue-600 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              FAQ Answer *
            </label>
            <textarea
              rows={5}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a clear, helpful and thorough response to customer inquiry..."
              className="w-full p-3 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:outline-none focus:border-blue-600 leading-relaxed text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminFaqItem["status"])}
                className="h-8 px-2.5 rounded border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              >
                <option value="Active">Active (Visible)</option>
                <option value="Inactive">Inactive (Hidden)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{initialFaq ? "Update FAQ" : "Create FAQ"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
