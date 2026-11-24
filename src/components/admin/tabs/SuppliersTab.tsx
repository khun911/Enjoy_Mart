"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Star,
  ShieldCheck,
} from "lucide-react";
import { staticSuppliers } from "@/data/adminData";

export default function SuppliersTab() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = [
    "All",
    "Consumer Audio & Visual",
    "Mobile & Computing",
    "Athletics & Footwear",
    "Home & Personal Care",
    "Displays & Appliances",
    "Charging & Smart Hardware",
  ];

  const filteredSuppliers = staticSuppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Global Suppliers & Manufacturing Partners
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified enterprise distributors, OEM manufacturers, and procurement SLA compliance directory.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            {staticSuppliers.length} Verified Global Partners
          </span>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Active Global Contracts</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">$9,850,000</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">100% Insured</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Average On-Time Delivery</span>
          <div className="text-2xl font-black text-blue-600 mt-1.5">98.6%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">SLA Exceeded</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Average Partner Rating</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5 flex items-center gap-1.5">
            <span>4.9</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[11px] text-amber-600 font-bold mt-1 block">Tier 1 Global Rating</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Primary Payment Terms</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">Net 30</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Escrow Protected</span>
        </div>
      </div>

      {/* 3. Search and Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Supplier, Contact, Country, or Code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-bold shrink-0">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Suppliers Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-6">Supplier Organization</th>
                <th className="py-3.5 px-4">Partner Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Country & Origin</th>
                <th className="py-3.5 px-4">Lead Contact</th>
                <th className="py-3.5 px-4">Performance</th>
                <th className="py-3.5 px-4">Payment Terms</th>
                <th className="py-3.5 px-6 text-right">Commitment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSuppliers.map((sup) => (
                <tr key={sup.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl ${sup.logoBg} text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0`}
                      >
                        {sup.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 leading-snug flex items-center gap-1.5">
                          <span>{sup.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold">
                          {sup.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{sup.code}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{sup.category}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{sup.country}</td>
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-bold text-slate-900 block">{sup.contactPerson}</span>
                      <span className="text-[10px] text-slate-400 block">{sup.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{sup.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        {sup.onTimeDeliveryRate} On-Time
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-700 text-[10px]">
                      {sup.paymentTerms}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="font-black text-slate-900 text-xs block">
                      {sup.activeContracts}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Active Contract</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
