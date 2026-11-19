"use client";

import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    {
      icon: Truck,
      title: t("freeShipping"),
      subtitle: t("freeShippingSub"),
    },
    {
      icon: ShieldCheck,
      title: t("securePayments"),
      subtitle: t("securePaymentsSub"),
    },
    {
      icon: RotateCcw,
      title: t("easyReturns"),
      subtitle: t("easyReturnsSub"),
    },
    {
      icon: Headphones,
      title: t("support247"),
      subtitle: t("support247Sub"),
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl py-6 px-6 sm:px-8 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {badge.title}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  {badge.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
