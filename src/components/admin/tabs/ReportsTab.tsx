"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Printer,
} from "lucide-react";
import { staticMonthlyReports } from "@/data/adminData";

export default function ReportsTab() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCsv = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentMonth = staticMonthlyReports[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Executive Business Intelligence & Profitability Reports
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Audited financial revenue, Cost of Goods Sold (COGS), operating expenses, and monthly sales margins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloaded ? "Report Downloaded!" : "Export Financials (CSV)"}</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">MTD Gross Revenue</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            ${currentMonth.grossRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
            +12.4% vs Previous Cycle
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Net Operating Profit</span>
          <div className="text-2xl font-black text-emerald-600 mt-1.5">
            ${currentMonth.netProfit.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Margin: {currentMonth.profitMargin}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Orders Completed</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            {currentMonth.ordersProcessed.toLocaleString()}
          </div>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">99.8% Success Rate</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Average Order Value (AOV)</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            ${currentMonth.avgOrderValue.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Premium Basket Size</span>
        </div>
      </div>

      {/* 3. Monthly Financial Statement Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-900">
            2026 Monthly Income Statement & Operational Ledger
          </h4>
          <span className="text-xs font-bold text-slate-400">Audited Currency: USD ($)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-6">Accounting Month</th>
                <th className="py-3.5 px-4">Gross Revenue</th>
                <th className="py-3.5 px-4">COGS (Procurement)</th>
                <th className="py-3.5 px-4">OpEx & Logistics</th>
                <th className="py-3.5 px-4">Net Profit</th>
                <th className="py-3.5 px-4">Profit Margin</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-6 text-right">Avg Basket (AOV)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {staticMonthlyReports.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{row.month}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    ${row.grossRevenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">${row.cogs.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-500">
                    ${row.operatingExpenses.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-600">
                    ${row.netProfit.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                      {row.profitMargin}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {row.ordersProcessed.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right font-black text-slate-900">
                    ${row.avgOrderValue.toFixed(2)}
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
