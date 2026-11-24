"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Eye,
  Warehouse,
  Copy,
  Check,
} from "lucide-react";
import { staticPurchaseOrders, PurchaseOrder } from "@/data/adminData";

interface PurchaseOrdersTabProps {
  onViewPo: (po: PurchaseOrder) => void;
}

export default function PurchaseOrdersTab({ onViewPo }: PurchaseOrdersTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalPoValue = staticPurchaseOrders.reduce((acc, po) => acc + po.totalAmount, 0);
  const inTransitCount = staticPurchaseOrders.filter((po) =>
    po.approvalStatus.includes("In Transit")
  ).length;
  const pendingReceiptCount = staticPurchaseOrders.filter((po) =>
    po.approvalStatus.includes("Pending")
  ).length;

  const handleCopyPo = (poNumber: string) => {
    navigator.clipboard.writeText(poNumber);
    setCopiedId(poNumber);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredOrders = staticPurchaseOrders.filter((po) => {
    const matchesSearch =
      po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      po.destinationWarehouse.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      po.approvalStatus.toLowerCase().includes(statusFilter.toLowerCase()) ||
      po.paymentStatus.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header & Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Inbound Procurement & Purchase Orders (PO)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Commercial purchase orders, vendor invoices, freight bills of lading, and automated receiving inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            {staticPurchaseOrders.length} Active Procurement Contracts
          </span>
        </div>
      </div>

      {/* 2. Procurement KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Total Active Value</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            ${totalPoValue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Across {staticPurchaseOrders.length} Inbound POs
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">In Transit Freight</span>
          <div className="text-2xl font-black text-blue-600 mt-1.5">{inTransitCount} Shipments</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Air & Ocean Freight</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Pending Warehouse Receipt</span>
          <div className="text-2xl font-black text-amber-500 mt-1.5">
            {pendingReceiptCount} Batches
          </div>
          <span className="text-[11px] text-amber-600 font-bold mt-1 block">Awaiting Bay Dock</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Quality Assurance</span>
          <div className="text-2xl font-black text-emerald-600 mt-1.5">100%</div>
          <span className="text-[11px] text-slate-400 mt-1 block">ISO 9001 Protocol</span>
        </div>
      </div>

      {/* 3. Search and Status Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search PO Code, Vendor, Warehouse..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
          {["All", "In Transit", "Customs", "Receipt", "Completed"].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                statusFilter === filter
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Purchase Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-6">PO Number</th>
                <th className="py-3.5 px-4">Vendor Supplier</th>
                <th className="py-3.5 px-4">Fulfillment Hub</th>
                <th className="py-3.5 px-4">Timeline</th>
                <th className="py-3.5 px-4">Line Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Approval Status</th>
                <th className="py-3.5 px-6 text-right">Invoice & Manifest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-slate-900 text-xs bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
                        {po.poNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPo(po.poNumber)}
                        className="text-slate-400 hover:text-blue-600 transition cursor-pointer"
                        title="Copy PO Code"
                      >
                        {copiedId === po.poNumber ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">
                        {po.supplierName}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                        {po.supplierCode}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <Warehouse className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{po.destinationWarehouse}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <span className="text-slate-500 text-[10px] block">
                        Ordered: <strong>{po.orderDate}</strong>
                      </span>
                      <span className="text-slate-800 font-semibold text-[11px] block mt-0.5">
                        ETA: {po.expectedDelivery}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">
                      {po.items.reduce((acc, i) => acc + i.quantity, 0)} Units
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {po.items.length} Product SKUs
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                    ${po.totalAmount.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        po.paymentStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : po.paymentStatus === "In Escrow"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {po.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        po.approvalStatus === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : po.approvalStatus.includes("In Transit")
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{po.approvalStatus}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onViewPo(po)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
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
