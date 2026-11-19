"use client";

import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Truck,
      title: t("freeShipping"),
      subtitle: t("freeShippingSub"),
      guarantee: "Tracked Express Delivery",
    },
    {
      icon: ShieldCheck,
      title: t("securePayments"),
      subtitle: t("securePaymentsSub"),
      guarantee: "PCI-DSS Level 1 Banking Security",
    },
    {
      icon: RotateCcw,
      title: t("easyReturns"),
      subtitle: t("easyReturnsSub"),
      guarantee: "Official Barcode Receipt Exchange",
    },
    {
      icon: Headphones,
      title: t("support247"),
      subtitle: t("support247Sub"),
      guarantee: "Multilingual VIP Concierge Care",
    },
  ];

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl py-5 px-6 sm:px-8 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3.5 group p-2 rounded-xl hover:bg-slate-50/80 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs mt-0.5">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-slate-900 leading-tight">
                  {badge.title}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {badge.subtitle}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate">{badge.guarantee}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
