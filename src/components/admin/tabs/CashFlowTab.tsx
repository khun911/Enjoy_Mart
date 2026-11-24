"use client";

import React, { useState } from "react";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Building,
  TrendingUp,
} from "lucide-react";
import { staticCashFlowTransactions } from "@/data/adminData";

export default function CashFlowTab() {
  const [filterType, setFilterType] = useState<"all" | "inflow" | "outflow">("all");

  const totalInflows = staticCashFlowTransactions
    .filter((tx) => tx.type === "inflow")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalOutflows = staticCashFlowTransactions
    .filter((tx) => tx.type === "outflow")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const netCashFlow = totalInflows - totalOutflows;

  const filteredTransactions = staticCashFlowTransactions.filter((tx) => {
    if (filterType === "all") return true;
    return tx.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Corporate Treasury & Cash Flow Statement
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time merchant gateway settlements, supplier procurement payouts, and liquidity monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Treasury Status: Healthy Liquidity</span>
        </div>
      </div>

      {/* 2. Cash Flow Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Monthly Inflow</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            +${totalInflows.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Customer Store Receipts
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Monthly Outflow</span>
            <ArrowDownRight className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            -${totalOutflows.toLocaleString()}
          </div>
          <span className="text-[11px] text-rose-500 font-medium mt-1 block">
            Vendor POs & Operations
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Operating Reserves</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600 mt-1.5">$485,000</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Central Escrow Backing</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Net Operating Margin</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            +${netCashFlow.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            Positive Cash Velocity
          </span>
        </div>
      </div>

      {/* 3. Transaction Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">
              Live Treasury & Settlement Ledger
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated reconciliation with NBC Bakong switch and Visa merchant gateway.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            {(["all", "inflow", "outflow"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px] transition cursor-pointer ${
                  filterType === t
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-6">Transaction Code</th>
                <th className="py-3.5 px-4">Description & Context</th>
                <th className="py-3.5 px-4">Counterparty / Institution</th>
                <th className="py-3.5 px-4">Accounting Category</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Amount (USD)</th>
                <th className="py-3.5 px-6 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{tx.txCode}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{tx.description}</span>
                    {tx.referencePoOrOrder && (
                      <span className="text-[10px] font-mono text-blue-600 block">
                        Ref: {tx.referencePoOrOrder}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{tx.counterparty}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-[10px]">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {tx.timestamp}
                  </td>
                  <td
                    className={`py-3.5 px-4 text-right font-black text-sm ${
                      tx.type === "inflow" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {tx.type === "inflow" ? "+" : "-"}${tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {tx.status}
                    </span>
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
