"use client";

import React, { useState } from "react";
import {
  Users,
  Star,
  ShieldCheck,
  Search,
} from "lucide-react";
import { staticCustomers } from "@/data/adminData";
import { initialFeedbacks } from "@/data/feedback";

export default function CustomersTab() {
  const [activeSubTab, setActiveSubTab] = useState<"crm" | "reviews">("crm");
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const filteredCustomers = staticCustomers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchesTier = tierFilter === "All" || c.tier.includes(tierFilter);
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Sub-Tab Switcher */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Customer CRM Directory & Verified Reviews Watchtower
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            VIP member accounts, lifetime spend (LTV), order frequency, and verified client satisfaction ratings.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveSubTab("crm")}
            className={`px-4 py-1.5 rounded-xl font-bold transition cursor-pointer ${
              activeSubTab === "crm"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Customer CRM ({staticCustomers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("reviews")}
            className={`px-4 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "reviews"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Reviews ({initialFeedbacks.length})</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB: CRM DIRECTORY */}
      {activeSubTab === "crm" && (
        <div className="space-y-6">
          {/* KPI Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-400 font-semibold block">Total Registered VIPs</span>
              <div className="text-2xl font-black text-slate-900 mt-1.5">
                {staticCustomers.length} Clients
              </div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                100% Identity Verified
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-400 font-semibold block">Cumulative Spend (LTV)</span>
              <div className="text-2xl font-black text-blue-600 mt-1.5">
                ${staticCustomers.reduce((acc, c) => acc + c.lifetimeSpend, 0).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Average LTV: $4,550</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-400 font-semibold block">Total Completed Orders</span>
              <div className="text-2xl font-black text-slate-900 mt-1.5">
                {staticCustomers.reduce((acc, c) => acc + c.totalOrders, 0)} Orders
              </div>
              <span className="text-[11px] text-purple-600 font-bold mt-1 block">
                High Repeat Velocity
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-400 font-semibold block">Net Satisfaction Score</span>
              <div className="text-2xl font-black text-amber-500 mt-1.5 flex items-center gap-1.5">
                <span>4.95</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                Tier 1 NPS Rating
              </span>
            </div>
          </div>

          {/* Search & Tier Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Client Name, Customer ID, Email..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Tier:</span>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Tiers</option>
                <option value="Platinum">VIP Platinum</option>
                <option value="Gold">VIP Gold</option>
                <option value="Corporate">Corporate Business</option>
                <option value="Silver">Silver Member</option>
              </select>
            </div>
          </div>

          {/* CRM Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <th className="py-3.5 px-6">Customer Profile</th>
                    <th className="py-3.5 px-4">Customer ID</th>
                    <th className="py-3.5 px-4">Membership Tier</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Lifetime Spend</th>
                    <th className="py-3.5 px-4">Total Orders</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-6 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {c.fullName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-900 block leading-tight">
                              {c.fullName}
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              {c.address.split(",")[0]}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                        {c.customerCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            c.tier === "VIP Platinum"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : c.tier === "Corporate Business"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : c.tier === "VIP Gold"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {c.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block text-[11px]">
                          {c.phone}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{c.email}</span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        ${c.lifetimeSpend.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {c.totalOrders} Orders
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {c.lastActive}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified Client
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-TAB: REVIEWS WATCHTOWER */}
      {activeSubTab === "reviews" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                Verified Customer Feedback Watchtower
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentic testimonials submitted after order delivery barcode verification.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {initialFeedbacks.length} Verified Reviews
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {initialFeedbacks.map((fb) => (
              <div key={fb.id} className="p-6 hover:bg-slate-50/70 transition space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
                      {fb.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                        <span>{fb.clientName}</span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" /> Verified Client
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{fb.clientEmail}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                  &quot;{fb.comment}&quot;
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>
                    Reviewed Product: <strong>{fb.productName}</strong>
                  </span>
                  <span>•</span>
                  <span>Order #{fb.orderId}</span>
                  <span>•</span>
                  <span>{fb.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
