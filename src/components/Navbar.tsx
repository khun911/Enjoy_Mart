"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tight">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tight text-blue-600 leading-none">
              ENJOY<span className="text-gray-900">-MART</span>
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto hidden sm:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-gray-50/80 border border-gray-200/90 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
            />
            <button
              type="button"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Actions: Account, Wishlist, Cart */}
        <div className="flex items-center gap-5 sm:gap-7 shrink-0">
          {/* Account */}
          <button className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition">
            <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
            <span className="text-[11px] font-medium mt-1">Account</span>
          </button>

          {/* Wishlist */}
          <button className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition relative">
            <Heart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
            <span className="text-[11px] font-medium mt-1">Wishlist</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
              <span className="absolute -top-1.5 -right-2.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </div>
            <span className="text-[11px] font-medium mt-1">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
