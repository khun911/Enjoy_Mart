"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  ShieldCheck,
  Package,
  Search,
  Filter,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import { ClientFeedback } from "@/types";

interface AdminFeedbackDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: ClientFeedback[];
}

export default function AdminFeedbackDashboard({
  isOpen,
  onClose,
  feedbacks,
}: AdminFeedbackDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<number | "All">("All");

  if (!isOpen) return null;

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchesSearch =
      fb.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = filterRating === "All" ? true : fb.rating === filterRating;

    return matchesSearch && matchesRating;
  });

  const totalReviews = feedbacks.length;
  const avgRating =
    totalReviews > 0
      ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / totalReviews).toFixed(1)
      : "5.0";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold leading-tight">
                  Manager & Admin Feedback Watchtower
                </h2>
                <span className="bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                  Store Manager Portal
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Real-time monitor of client feedback, ordered products, and verified reviews
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Manager KPI Summary Cards */}
        <div className="p-6 bg-slate-50 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">Average Customer Rating</div>
              <div className="text-xl font-black text-gray-900">{avgRating} / 5.0</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">Total Customer Reviews</div>
              <div className="text-xl font-black text-gray-900">{totalReviews} Feedbacks</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">Verified Order Status</div>
              <div className="text-xl font-black text-emerald-600">100% Authentic</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client name, product, or order ID..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 font-semibold">Filter Rating:</span>
            {["All", 5, 4].map((rate) => (
              <button
                key={String(rate)}
                type="button"
                onClick={() => setFilterRating(rate as number | "All")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  filterRating === rate
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {rate === "All" ? "All" : `${rate} ★`}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Records List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              No client feedbacks match your search query.
            </div>
          ) : (
            filteredFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4 hover:border-blue-300 transition"
              >
                {/* Top Row: Client Info & Order Number */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {fb.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">
                          {fb.clientName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified Client
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {fb.clientEmail} • {fb.date}
                      </div>
                    </div>
                  </div>

                  {/* Order Number Badge */}
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-700">
                    <Package className="w-3.5 h-3.5 text-blue-600" />
                    <span>Order #{fb.orderId}</span>
                  </div>
                </div>

                {/* Ordered Product Card */}
                <div className="flex items-center gap-3 p-3 bg-blue-50/40 rounded-xl border border-blue-100/60">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                    <Image
                      src={fb.productImage}
                      alt={fb.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      Product Purchased
                    </div>
                    <div className="font-bold text-xs text-gray-900 truncate">
                      {fb.productName}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gray-100">
                    <div className="flex items-center text-amber-400">
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-gray-800 ml-1">
                      {fb.rating}.0
                    </span>
                  </div>
                </div>

                {/* Feedback Comment */}
                <div className="text-xs text-gray-700 leading-relaxed bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 italic">
                  &ldquo;{fb.comment}&rdquo;
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500">
          <span>
            Manager Portal automatically records all verified client feedback and order associations.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
}
