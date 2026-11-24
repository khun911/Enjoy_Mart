"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Package,
  Search,
  Plus,
  Edit3,
  Trash2,
  Warehouse,
  Tag,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { InventoryProduct } from "../AdminDashboard";

interface InventoryTabProps {
  products: InventoryProduct[];
  onEditProduct: (p: InventoryProduct) => void;
  onDeleteProduct: (id: string) => void;
  onOpenAddModal: () => void;
}

export default function InventoryTab({
  products,
  onEditProduct,
  onDeleteProduct,
  onOpenAddModal,
}: InventoryTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [locationFilter, setLocationFilter] = useState<string>("All");

  const totalStockUnits = products.reduce((acc, p) => acc + p.units, 0);
  const inStockCount = products.filter((p) => p.status === "In Stock").length;
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
  const outOfStockCount = products.filter((p) => p.status === "Out of stock").length;
  const totalValuation = products.reduce((acc, p) => acc + p.price * p.units, 0);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesLocation = locationFilter === "All" || p.location.includes(locationFilter);

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Package className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Enjoy-Mart Inventory & Stock Valuation
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock units, SKU catalog management, and automated fulfillment routing across all warehouses.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product SKU</span>
        </button>
      </div>

      {/* 2. Top Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total SKUs</span>
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{products.length} Items</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Active Catalog</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Stock Valuation</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            ${totalValuation.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Combined Warehouse Assets</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Units in Stock</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {totalStockUnits.toLocaleString()} Units
          </div>
          <span className="text-[11px] text-blue-600 font-medium mt-1 block">
            {inStockCount} SKUs Optimal
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Low / Out Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {lowStockCount + outOfStockCount} SKUs
          </div>
          <span className="text-[11px] text-rose-500 font-medium mt-1 block">
            {outOfStockCount} Depleted • {lowStockCount} Need Restock
          </span>
        </div>
      </div>

      {/* 3. Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Product Name, SKU, Category..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Pills */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            {["All", "In Stock", "Low Stock", "Out of stock"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  statusFilter === status
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Location Selector */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Warehouse A">Warehouse A (Central)</option>
            <option value="Warehouse B">Warehouse B (Express Hub)</option>
            <option value="Warehouse C">Warehouse C (Global Imports)</option>
            <option value="Warehouse D">Warehouse D (Depot Hub)</option>
          </select>
        </div>
      </div>

      {/* 4. Full Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-6">Product Item</th>
                <th className="py-3.5 px-4">SKU Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Fulfillment Hub</th>
                <th className="py-3.5 px-4">Stock Units</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-slate-900 leading-snug">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{p.sku}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{p.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Warehouse className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.location}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-black text-slate-900">{p.units}</span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            p.units === 0
                              ? "bg-rose-500 w-0"
                              : p.units < 50
                              ? "bg-amber-500 w-1/3"
                              : "bg-emerald-500 w-full"
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">${p.price}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        p.status === "In Stock"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "Low Stock"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
