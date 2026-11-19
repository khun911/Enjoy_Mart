"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";

interface CategoryNavProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  onOpenOrders?: () => void;
  onOpenContact?: () => void;
  activeNavTab?: string;
  onSelectNavTab?: (tab: string) => void;
}

const navItems = [
  { name: "Home", action: "home" },
  { name: "Shop", action: "shop" },
  { name: "Deals", action: "deals" },
  { name: "New Arrivals", action: "new-arrivals" },
  { name: "Best Sellers", action: "best-sellers" },
  { name: "Track Order", action: "track-order" },
  { name: "Contact Us", action: "contact" },
];

export default function CategoryNav({
  isSidebarOpen,
  toggleSidebar,
  onOpenOrders,
  onOpenContact,
  activeNavTab = "Home",
  onSelectNavTab,
}: CategoryNavProps) {
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
    <div className="w-full bg-white border-b border-gray-100 sticky top-[73px] z-30 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
        {/* Browse Categories Button */}
        <div className="w-64 shrink-0 hidden lg:block">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-expanded={isSidebarOpen}
            className={`w-full ${
              isSidebarOpen ? "bg-blue-600" : "bg-blue-700"
            } hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-t-xl flex items-center gap-3 transition-colors shadow-xs cursor-pointer`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide">
              Browse Categories
            </span>
          </button>
        </div>

        {/* Mobile categories button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-lg my-2 cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span>Categories</span>
        </button>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-3 lg:py-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-3.5 text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in duration-150" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
