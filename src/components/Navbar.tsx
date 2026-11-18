"use client";

import React, { useState, useRef, useEffect, useSyncExternalStore } from "react";
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
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Sample searchable product catalog data
const searchableProducts = [
  {
    id: "fp-1",
    name: "MacBook Air M3",
    category: "Electronics",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-2",
    name: "AirPods Pro 2nd Gen",
    category: "Electronics",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-3",
    name: "Nike Air Max 270",
    category: "Fashion",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-4",
    name: "Premium Leather Jacket",
    category: "Fashion",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-5",
    name: "Espresso Coffee Maker",
    category: "Home & Living",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-6",
    name: "Sony Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "fp-7",
    name: "Apple Watch Series 9",
    category: "Electronics",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Navbar() {
  const { totalItems, setIsCartOpen, addToCart } = useCart();
  const isClient = useIsClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [wishlistCount] = useState(3);
  const [showWishlistNotification, setShowWishlistNotification] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Filter products by search query
  const filteredProducts = searchQuery.trim()
    ? searchableProducts.filter(
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
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {/* Account Menu with Real Profile Data */}
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium mt-0.5">Account</span>
            </button>

            {/* Account Popover */}
            {isAccountOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 text-xs">
                {/* User Info Header */}
                <div className="px-4 pb-3 border-b border-gray-100">
                  <div className="font-bold text-gray-900 text-sm">khun911</div>
                  <div className="text-[11px] text-gray-500 truncate">
                    khun911@users.noreply.github.com
                  </div>
                  <div className="mt-1.5 inline-block px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-full">
                    Enjoy-Mart VIP Member
                  </div>
                </div>

                {/* Account Links */}
                <div className="py-2 space-y-0.5">
                  <Link
                    href="#orders"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition"
                  >
                    <PackageIcon className="w-4 h-4 text-gray-400" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    href="#wishlist"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Saved Wishlist</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  </Link>
                  <Link
                    href="#settings"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium transition"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-gray-100 px-4">
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium py-1 transition w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button with Badge & Notification */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowWishlistNotification(true);
                setTimeout(() => setShowWishlistNotification(false), 3000);
              }}
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

            {/* Wishlist Toast */}
            {showWishlistNotification && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white text-[11px] p-2.5 rounded-xl shadow-xl z-50">
                ❤️ You have {wishlistCount} saved items in your wishlist!
              </div>
            )}
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
    </header>
  );
}
