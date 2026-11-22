"use client";

import React, { useState } from "react";
import { Layers, ChevronDown, ChevronUp, Flame, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryNavProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  onOpenOrders?: () => void;
  onOpenContact?: () => void;
  activeNavTab?: string;
  onSelectNavTab?: (tab: string) => void;
}

const navItems = [
  { name: "Home", key: "home", action: "home" },
  { name: "Shop", key: "shop", action: "shop" },
  { name: "Deals", key: "deals", action: "deals", badge: "HOT" },
  { name: "New Arrivals", key: "newArrivals", action: "new-arrivals", badge: "2026" },
  { name: "Best Sellers", key: "bestSellers", action: "best-sellers" },
  { name: "Track Order", key: "trackOrder", action: "track-order" },
  { name: "Contact Us", key: "contactUs", action: "contact" },
];

export default function CategoryNav({
  isSidebarOpen,
  toggleSidebar,
  onOpenOrders,
  onOpenContact,
  activeNavTab = "Home",
  onSelectNavTab,
}: CategoryNavProps) {
  const { t } = useLanguage();
  const [internalActive, setInternalActive] = useState("Home");
  const activeTab = onSelectNavTab ? activeNavTab : internalActive;

  const handleNavClick = (item: (typeof navItems)[number]) => {
    if (onSelectNavTab) {
      onSelectNavTab(item.name);
    } else {
      setInternalActive(item.name);
    }

    if (item.action === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item.action === "shop") {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (item.action === "deals") {
      const el = document.getElementById("deals");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (item.action === "new-arrivals") {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (item.action === "best-sellers") {
      const el = document.getElementById("best-sellers");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (item.action === "track-order") {
      if (onOpenOrders) onOpenOrders();
    } else if (item.action === "contact") {
      if (onOpenContact) onOpenContact();
    }
  };

  return (
    <div className="w-full bg-white border-b border-slate-200/80 sticky top-[73px] z-30 backdrop-blur-md bg-white/95 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Formal All Departments Toggle Button */}
          <div className="w-64 shrink-0 hidden lg:block">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              className={`w-full ${
                isSidebarOpen
                  ? "bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              } font-bold py-2.5 px-4 rounded-xl flex items-center justify-between transition-all shadow-xs border border-slate-800 cursor-pointer group`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase">
                  {t("browseCategories")}
                </span>
              </div>
              {isSidebarOpen ? (
                <ChevronUp className="w-4 h-4 text-amber-400 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform" />
              )}
            </button>
          </div>

          {/* Mobile categories button */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden flex items-center gap-2 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-lg my-2 cursor-pointer shadow-xs"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{t("browseCategories")}</span>
            {isSidebarOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            )}
          </button>

          {/* Main Navigation Links */}
          <nav className="flex items-center gap-6 sm:gap-7 overflow-x-auto no-scrollbar py-3 lg:py-0">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`relative py-3.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "text-blue-600 font-extrabold"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  <span>{t(item.key)}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        item.badge === "HOT"
                          ? "bg-rose-100 text-rose-600 flex items-center gap-0.5"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.badge === "HOT" && <Flame className="w-2.5 h-2.5" />}
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-150" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Quality Assurance Tag */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-500 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px]">Official Authorized Retail Store</span>
        </div>
      </div>
    </div>
  );
}
