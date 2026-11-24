"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  User,
} from "lucide-react";
import { staticTrackingShipments, TrackingShipment } from "@/data/adminData";

interface TrackingTabProps {
  initialTrackingCode?: string;
}

export default function TrackingTab({ initialTrackingCode }: TrackingTabProps) {
  const [selectedCode, setSelectedCode] = useState(
    initialTrackingCode || staticTrackingShipments[0].trackingCode
  );
  const [searchInput, setSearchInput] = useState("");

  const currentShipment: TrackingShipment =
    staticTrackingShipments.find((s) => s.trackingCode === selectedCode) ||
    staticTrackingShipments[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = staticTrackingShipments.find(
      (s) =>
        s.trackingCode.toLowerCase().includes(searchInput.toLowerCase()) ||
        s.orderId.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (found) {
      setSelectedCode(found.trackingCode);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Live Indicator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <MapPin className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Real-Time Cargo & Parcel GPS Tracking
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Live satellite courier tracking, waypoint checkpoints, customs status, and delivery signature records.
          </p>
        </div>

        {/* Search Bar & Quick Selection Pills */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Tracking or Order #..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Quick Selection Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
            {staticTrackingShipments.map((s) => (
              <button
                key={s.trackingCode}
                type="button"
                onClick={() => setSelectedCode(s.trackingCode)}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition cursor-pointer text-xs ${
                  selectedCode === s.trackingCode
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:text-blue-600"
                }`}
              >
                {s.orderId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Active Shipment Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-6 rounded-3xl shadow-lg border border-slate-700/80 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-black text-amber-300">
                {currentShipment.trackingCode}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{currentShipment.currentStatus}</span>
              </span>
            </div>
            <span className="text-xs text-slate-300 mt-1 block">
              Carrier: <strong>{currentShipment.carrier}</strong> • Order #{currentShipment.orderId}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
              Estimated Delivery
            </span>
            <span className="text-sm font-extrabold text-white">
              {currentShipment.estimatedArrival}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Route Progress</span>
            <span className="text-amber-400 font-bold font-mono">
              {currentShipment.progressPercentage}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${currentShipment.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Origin to Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Origin Fulfillment Center
            </span>
            <span className="font-bold text-white block">{currentShipment.origin}</span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Destination Delivery Address
            </span>
            <span className="font-bold text-white block">{currentShipment.destination}</span>
            <span className="text-[11px] text-slate-300 block">
              Recipient: {currentShipment.customerName} ({currentShipment.customerPhone})
            </span>
          </div>
        </div>
      </div>

      {/* 3. Visual Timeline Milestones & Courier Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Stepper */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Live Waypoint Milestone History
          </h4>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {currentShipment.milestones.map((milestone, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Dot / Check Icon */}
                <div
                  className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                    milestone.completed
                      ? milestone.active
                        ? "bg-amber-500"
                        : "bg-emerald-600"
                      : "bg-slate-300"
                  }`}
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                </div>

                {/* Milestone Details */}
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-extrabold ${
                        milestone.active ? "text-blue-600" : "text-slate-900"
                      }`}
                    >
                      {milestone.step}
                    </span>
                    {milestone.active && (
                      <span className="text-[9px] font-black uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Current Checkpoint
                      </span>
                    )}
                  </div>
                  <span className="text-slate-500 block font-medium">{milestone.location}</span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    {milestone.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Assigned Courier & Cargo Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h4 className="font-extrabold text-sm text-slate-900 pb-2 border-b border-slate-100">
            Assigned Delivery Personnel
          </h4>

          {currentShipment.driverName ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-900">
                    {currentShipment.driverName}
                  </h5>
                  <span className="text-xs text-slate-400 font-medium">
                    Vehicle: {currentShipment.vehicleNumber}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Last GPS Ping</span>
                  <span className="font-bold text-slate-900">2 mins ago</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Contact Route Van</span>
                  <span className="font-bold text-blue-600">+855 12 990 128</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Courier Dispatch</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              Courier van handover in progress.
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
            <span className="font-bold text-slate-900 block">Official Security Protocol</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every parcel dispatched by Enjoy-Mart features tamper-evident QR security tape and requires a recipient digital signature upon handover.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
