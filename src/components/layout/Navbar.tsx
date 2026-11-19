"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  X,
  Package as PackageIcon,
  Settings,
  LogOut,
  LogIn,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useIsClient } from "@/hooks/useIsClient";
import { allSearchableProducts } from "@/data/products";
import OrdersModal from "@/components/layout/OrdersModal";

export default function Navbar() {
  const { totalItems, setIsCartOpen, addToCart } = useCart();
  const isClient = useIsClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Account Popover States
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlistCount] = useState(3);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountContainerRef = useRef<HTMLDivElement>(null);
  const accountTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Smooth hover handlers for Account menu
  const handleAccountMouseEnter = () => {
    if (accountTimeoutRef.current) {
      clearTimeout(accountTimeoutRef.current);
    }
    setIsAccountOpen(true);
  };

  const handleAccountMouseLeave = () => {
    accountTimeoutRef.current = setTimeout(() => {
      setIsAccountOpen(false);
      setHoveredMenuItem(null);
    }, 250);
  };

  // Sign out / Sign in toggle
  const handleToggleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setIsAccountOpen(false);
      showToast("👋 You have signed out successfully.");
    } else {
      setIsLoggedIn(true);
      setIsAccountOpen(false);
      showToast("🎉 Welcome back, khun911!");
    }
  };

  // Filter products by search query
  const filteredProducts = searchQuery.trim()
    ? allSearchableProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        accountContainerRef.current &&
        !accountContainerRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
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
              <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
                Online Store
              </span>
            </div>
          </Link>

          {/* Live Search Bar with Instant Autocomplete */}
          <div
            ref={searchContainerRef}
            className="flex-1 max-w-2xl mx-auto relative hidden sm:block"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for products, brands, or categories..."
                className="w-full bg-gray-50/90 border border-gray-200 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {searchQuery.trim() === "" ? (
                  /* Trending Searches Data */
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Popular Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "MacBook M3",
                        "AirPods",
                        "Running Shoes",
                        "Smart Watch",
                        "Coffee Maker",
                        "Leather Jacket",
                      ].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            setSearchQuery(term);
                            setIsSearchFocused(true);
                          }}
                          className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-lg transition cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="p-2 divide-y divide-gray-50 max-h-80 overflow-y-auto">
                    <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Matching Products ({filteredProducts.length})
                    </div>
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-2.5 hover:bg-blue-50/60 rounded-xl transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition">
                              {product.name}
                            </h4>
                            <span className="text-[10px] text-gray-500">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-gray-900">
                            ${product.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                category: product.category,
                              });
                              setIsSearchFocused(false);
                            }}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[11px] font-bold hover:bg-blue-700 shadow-xs cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500 text-xs">
                    No products found for &quot;<strong>{searchQuery}</strong>&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions: Account, Wishlist, Cart */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            {/* Account Menu with Hover Detection & Rich Response */}
            <div
              ref={accountContainerRef}
              className="relative"
              onMouseEnter={handleAccountMouseEnter}
              onMouseLeave={handleAccountMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsAccountOpen((prev) => !prev)}
                className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                    isLoggedIn
                      ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium mt-0.5 truncate max-w-[56px]">
                  {isLoggedIn ? "Account" : "Sign In"}
                </span>
              </button>

              {/* Account Dropdown Popover */}
              {isAccountOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}
                >
                  {isLoggedIn ? (
                    <>
                      {/* Logged In User Profile Header */}
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900 text-sm">
                            khun911
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-full">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                            VIP Member
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 truncate mt-0.5">
                          khun911@users.noreply.github.com
                        </div>
                      </div>

                      {/* Interactive Menu List */}
                      <div className="py-2 space-y-1">
                        {/* My Orders with Hover Preview */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("orders")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsOrdersModalOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <PackageIcon className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600 transition" />
                            <div>
                              <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">
                                My Orders
                              </div>
                              <div className="text-[10px] text-gray-400 group-hover/item:text-blue-500">
                                {hoveredMenuItem === "orders"
                                  ? "3 orders • 1 In Transit"
                                  : "Track & manage orders"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              3
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />
                          </div>
                        </button>

                        {/* Saved Wishlist */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("wishlist")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsAccountOpen(false);
                            showToast(`❤️ Wishlist contains ${wishlistCount} saved items.`);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <Heart className="w-4 h-4 text-gray-400 group-hover/item:text-rose-500 transition" />
                            <div>
                              <div className="font-semibold text-gray-900 group-hover/item:text-rose-600">
                                Saved Wishlist
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {hoveredMenuItem === "wishlist"
                                  ? "MacBook, Leather Jacket & Watch"
                                  : "View your saved favorites"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {wishlistCount}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-rose-500 group-hover/item:translate-x-0.5 transition-all" />
                          </div>
                        </button>

                        {/* Account Settings */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("settings")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsAccountOpen(false);
                            showToast("⚙️ Account settings & preferences opened.");
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-2.5">
                            <Settings className="w-4 h-4 text-gray-400 group-hover/item:text-blue-600 transition" />
                            <div>
                              <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">
                                Account Settings
                              </div>
                              <div className="text-[10px] text-gray-400">
                                Addresses, security & payments
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />
                        </button>
                      </div>

                      {/* Sign Out with Interactive Alert State */}
                      <div className="pt-2 border-t border-gray-100 px-3">
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("signout")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={handleToggleAuth}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition cursor-pointer group/signout"
                        >
                          <div className="flex items-center gap-2">
                            <LogOut className="w-3.5 h-3.5 text-red-500 group-hover/signout:scale-110 transition-transform" />
                            <div className="text-left">
                              <span className="font-bold">Sign Out</span>
                              {hoveredMenuItem === "signout" && (
                                <div className="text-[10px] text-red-400">
                                  End session for khun911
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-[10px] text-red-400 opacity-80">
                            Session active
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Guest Mode Popover */
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900 text-sm">
                          Welcome, Shopper!
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Sign in to view your order history, manage wishlist, and get exclusive Enjoy-Mart VIP discounts.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <button
                          type="button"
                          onClick={handleToggleAuth}
                          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Sign In as khun911</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountOpen(false);
                            showToast("📝 Registration form opened.");
                          }}
                          className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl text-xs border border-gray-200 transition cursor-pointer text-center"
                        >
                          Create New Account
                        </button>
                      </div>

                      <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>100% Secure Checkout Guaranteed</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Button with Badge & Notification */}
            <div className="relative">
              <button
                type="button"
                onClick={() => showToast(`❤️ You have ${wishlistCount} saved items in your wishlist!`)}
                className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition relative cursor-pointer"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                </div>
                <span className="text-[11px] font-medium mt-1">Wishlist</span>
              </button>
            </div>

            {/* Cart Button with Total Items */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition relative cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                <span className="absolute -top-1.5 -right-2.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {isClient ? totalItems : 0}
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
              placeholder="Search products..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Toast Notification Floating Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span>{toastMessage}</span>
          </div>
        )}
      </header>

      {/* Orders History Modal */}
      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </>
  );
}
