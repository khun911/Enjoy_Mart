"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
} from "lucide-react";
import { PurchaseOrder } from "@/data/adminData";

interface PurchaseOrderModalProps {
  po: PurchaseOrder | null;
  onClose: () => void;
}

export default function PurchaseOrderModal({ po, onClose }: PurchaseOrderModalProps) {
  const [isExported, setIsExported] = useState(false);

  if (!po) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden space-y-6 animate-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-amber-300">
                  {po.poNumber}
                </span>
                <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase">
                  Official PO Manifest
                </span>
              </div>
              <span className="text-xs text-slate-300 mt-0.5 block">
                Enjoy-Mart Enterprise Supply Logistics Protocol
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PO Body Content */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Supplier & Warehouse Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                Vendor / Supplier
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">{po.supplierName}</h4>
              <span className="font-mono text-xs text-blue-600 font-bold block mt-0.5">
                {po.supplierCode}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Payment: <strong>{po.paymentStatus}</strong>
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                Receiving Fulfillment Hub
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">
                {po.destinationWarehouse}
              </h4>
              <span className="text-slate-500 text-[11px] block mt-1">
                Ordered: <strong>{po.orderDate}</strong>
              </span>
              <span className="text-slate-500 text-[11px] block">
                Estimated Dock: <strong>{po.expectedDelivery}</strong>
              </span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {po.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{item.name}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{item.sku}</td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-800">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${item.unitPrice}</td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-900">
                      ${item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals & Scannable Barcode */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Scannable Barcode */}
            <div className="text-center sm:text-left space-y-1">
              <div className="font-mono text-2xl tracking-[6px] text-slate-900 select-all font-bold">
                ||||||||||||||||||||||||||||||
              </div>
              <span className="font-mono text-[10px] text-slate-400 block tracking-widest uppercase">
                *{po.poNumber}-ENJOY-HUB*
              </span>
            </div>

            {/* Subtotal, Tax, Total */}
            <div className="w-full sm:w-60 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  ${po.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Standard Tax (8%)</span>
                <span>${po.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Freight & Insurance</span>
                <span>${po.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount Due</span>
                <span className="text-blue-600">${po.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          {po.notes && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-800 font-medium">
              <strong>Logistics Memo:</strong> {po.notes}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Approved by Super Admin Khun Phan
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PO</span>
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExported ? "Exported (PDF)!" : "Export Invoice"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
