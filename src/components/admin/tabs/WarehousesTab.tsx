"use client";

import React from "react";
import {
  Warehouse,
  MapPin,
  CheckCircle2,
  Thermometer,
  Droplets,
  Box,
  User,
} from "lucide-react";

export default function WarehousesTab() {
  const warehouses = [
    {
      name: "Warehouse A (Phnom Penh Central)",
      code: "WH-PP-01",
      location: "St. 2004, Sen Sok, Phnom Penh, Cambodia",
      capacity: "88% Full",
      capacityPercent: 88,
      items: "5,420 Items",
      activeDocks: "4 of 4 Docks Active",
      temperature: "21.5°C",
      humidity: "42% RH",
      manager: "Sokha Vong",
      phone: "+855 12 889 012",
      status: "Optimal Capacity",
      dockedTrailers: 3,
    },
    {
      name: "Warehouse B (Techo Express Air Hub)",
      code: "WH-AIR-02",
      location: "Techo International Cargo Zone, Terminal 1",
      capacity: "64% Full",
      capacityPercent: 64,
      items: "3,110 Items",
      activeDocks: "3 of 4 Docks Active",
      temperature: "20.0°C",
      humidity: "45% RH",
      manager: "Dara Kim",
      phone: "+855 77 109 443",
      status: "Optimal Capacity",
      dockedTrailers: 2,
    },
    {
      name: "Warehouse C (Sihanoukville Port Import Hub)",
      code: "WH-PORT-03",
      location: "Sihanoukville Autonomous Port Logistics Bay",
      capacity: "45% Full",
      capacityPercent: 45,
      items: "1,890 Items",
      activeDocks: "2 of 6 Docks Active",
      temperature: "23.0°C",
      humidity: "55% RH",
      manager: "Vannak Touch",
      phone: "+855 89 443 219",
      status: "High Capacity Ready",
      dockedTrailers: 4,
    },
    {
      name: "Warehouse D (National Road 4 Industrial Park)",
      code: "WH-NR4-04",
      location: "Phnom Penh SEZ, National Road 4 Hub",
      capacity: "72% Full",
      capacityPercent: 72,
      items: "850 Items",
      activeDocks: "2 of 3 Docks Active",
      temperature: "22.0°C",
      humidity: "48% RH",
      manager: "Chenda Mean",
      phone: "+855 92 654 321",
      status: "Optimal Capacity",
      dockedTrailers: 1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Warehouse className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Enjoy-Mart Fulfillment Centers & Strategic Warehouses
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global air logistics, sea port freight consolidation, and provincial distribution hubs across Cambodia.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>4 Active Facilities Online</span>
        </div>
      </div>

      {/* 2. Warehouse Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouses.map((wh, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                  {wh.code}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {wh.status}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">Hub #{idx + 1}</span>
            </div>

            {/* Warehouse title & address */}
            <div>
              <h4 className="font-black text-base text-slate-900">{wh.name}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{wh.location}</span>
              </p>
            </div>

            {/* Capacity Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Storage Utilization</span>
                <span className="text-blue-600">{wh.capacity}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    wh.capacityPercent > 80
                      ? "bg-amber-500"
                      : wh.capacityPercent > 60
                      ? "bg-blue-600"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${wh.capacityPercent}%` }}
                />
              </div>
            </div>

            {/* Sensor & Dock Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Box className="w-3 h-3 text-blue-500" /> Stock Units
                </span>
                <span className="font-black text-slate-900 block">{wh.items}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-500" /> Temp Control
                </span>
                <span className="font-black text-slate-900 block">{wh.temperature}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-500" /> Humidity
                </span>
                <span className="font-black text-slate-900 block">{wh.humidity}</span>
              </div>
            </div>

            {/* Facility Manager & Contact */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block leading-tight">{wh.manager}</span>
                  <span className="text-[10px] text-slate-400">Operations Director</span>
                </div>
              </div>
              <a
                href={`tel:${wh.phone}`}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg transition"
              >
                {wh.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
