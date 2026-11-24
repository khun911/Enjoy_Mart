"use client";

import React from "react";
import {
  Truck,
  ExternalLink,
} from "lucide-react";
import { mockOrders } from "@/data/orders";

interface ShipmentsTabProps {
  onTrackShipment: (trackingNumber: string) => void;
}

export default function ShipmentsTab({ onTrackShipment }: ShipmentsTabProps) {
  return (
    <div className="space-y-6">
      {/* 1. Header Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Truck className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Outbound Shipments & Carrier Logistics
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time parcel dispatch tracking via FedEx Express, DHL, and local courier networks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{mockOrders.length} Shipments In Route</span>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Active Manifests</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">{mockOrders.length} Parcels</div>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">100% Tracking Active</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Avg Delivery Time</span>
          <div className="text-2xl font-black text-emerald-600 mt-1.5">1.4 Days</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Express Transit</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">On-Time Dispatch Rate</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">99.1%</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Priority Fleet SLA</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs text-slate-400 font-semibold block">Shipping Value Insured</span>
          <div className="text-2xl font-black text-slate-900 mt-1.5">
            ${mockOrders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}
          </div>
          <span className="text-[11px] text-purple-600 font-bold mt-1 block">Full Coverage</span>
        </div>
      </div>

      {/* 3. Shipments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-slate-900">Active Outbound Orders</h4>
          <span className="text-xs text-slate-400">Click to track real-time milestones</span>
        </div>

        <div className="divide-y divide-slate-100">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 hover:bg-slate-50/70 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      Order #{order.id}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-semibold">{order.date}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Carrier: <strong className="text-slate-800">{order.carrier}</strong> |
                    Tracking:{" "}
                    <span className="font-mono text-blue-600 font-semibold">
                      {order.trackingNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "Delivered"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-base font-black text-slate-900">
                  ${order.total.toFixed(2)}
                </span>

                <button
                  type="button"
                  onClick={() => onTrackShipment(order.trackingNumber)}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Track Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
