"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

interface CategoryNavProps {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const navLinks = [
  { name: "Home", href: "/", active: true },
  { name: "Shop", href: "#products" },
  { name: "Deals", href: "#deals" },
  { name: "New Arrivals", href: "#new-arrivals" },
  { name: "Best Sellers", href: "#best-sellers" },
  { name: "Track Order", href: "#track-order" },
  { name: "Contact Us", href: "#contact" },
];

export default function CategoryNav({
  isSidebarOpen,
  toggleSidebar,
}: CategoryNavProps) {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
        {/* Browse Categories Button */}
        <div className="w-64 shrink-0 hidden lg:block">
          <button
            onClick={toggleSidebar}
            aria-expanded={isSidebarOpen}
            className={`w-full ${
              isSidebarOpen ? "bg-blue-600" : "bg-blue-700"
            } hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-t-xl flex items-center gap-3 transition-colors shadow-xs`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide">
              Browse Categories
            </span>
          </button>
        </div>

        {/* Mobile categories button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-lg my-2"
        >
          <Menu className="w-4 h-4" />
          <span>Categories</span>
        </button>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-3 lg:py-0">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
