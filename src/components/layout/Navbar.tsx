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
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Star,
  Award,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useIsClient } from "@/hooks/useIsClient";
import { allSearchableProducts } from "@/data/products";
import { initialFeedbacks } from "@/data/feedback";
import { ClientFeedback } from "@/types";
import OrdersModal from "@/components/layout/OrdersModal";
import AuthModal from "@/components/layout/AuthModal";
import ClientFeedbackModal from "@/components/feedback/ClientFeedbackModal";
import AdminFeedbackDashboard from "@/components/admin/AdminFeedbackDashboard";
import ProfileModal from "@/components/layout/ProfileModal";
import { useLanguage, SUPPORTED_LANGUAGES, LanguageInfo } from "@/context/LanguageContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen, addToCart } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const isClient = useIsClient();
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Language dropdown state
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // User State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "khun911",
    email: "khun911@users.noreply.github.com",
    isVip: true,
  });

  // Modals & Popovers
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");

  // Feedback & Admin Watchtower States
  const [feedbacks, setFeedbacks] = useState<ClientFeedback[]>(initialFeedbacks);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Open Auth Modal
  const openAuth = (mode: "signin" | "signup") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsAccountOpen(false);
  };

  // Sign out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsAccountOpen(false);
    showToast("👋 You have signed out successfully.");
  };

  // Login success from AuthModal
  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setCurrentUser({
      name: user.name,
      email: user.email,
      isVip: true,
    });
    setIsLoggedIn(true);
    showToast(`🎉 Welcome back, ${user.name}!`);
  };

  // Add new feedback from client
  const handleAddFeedback = (newFeedback: ClientFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
    showToast("⭐ Thank you! Your verified feedback has been shared with the manager.");
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
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLangOpen(false);
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
                placeholder={t("searchPlaceholder")}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition cursor-pointer"
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

          {/* Right Actions: Manager Button, Account, Wishlist, Cart */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Store Manager Watchtower Trigger Button */}
            <button
              type="button"
              onClick={() => setIsAdminDashboardOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold shadow-xs transition cursor-pointer"
              title="Store Manager Dashboard"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("managerPortal")}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
            </button>

            {/* Account Menu with Standard E-Commerce Structure */}
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
                <span className="text-[11px] font-medium mt-0.5 truncate max-w-[62px]">
                  {isLoggedIn ? t("account") : "Sign In"}
                </span>
              </button>

              {/* Account Dropdown Popover */}
              {isAccountOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}
                >
                  {isLoggedIn ? (
                    <>
                      {/* Signed-In Customer Header & Profile Shortcut */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileModalOpen(true);
                          setIsAccountOpen(false);
                        }}
                        className="w-full text-left px-5 pb-3.5 border-b border-gray-100 flex items-center justify-between gap-3 hover:bg-blue-50/50 transition cursor-pointer group/prof"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0 group-hover/prof:scale-105 transition-transform">
                            {currentUser.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-gray-900 text-sm truncate group-hover/prof:text-blue-600 transition">
                                {currentUser.name}
                              </span>
                              {currentUser.isVip && (
                                <span className="inline-flex items-center gap-0.5 px-2 py-0.2 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded-full shrink-0">
                                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                                  VIP
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-500 truncate mt-0.5">
                              {currentUser.email}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md shrink-0">
                          Profile
                        </span>
                      </button>

                      {/* Interactive Customer Navigation */}
                      <div className="py-2 space-y-1">
                        {/* My Orders with live hover status */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("orders")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsOrdersModalOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-5 py-2.5 hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-blue-100/60 flex items-center justify-center text-gray-500 group-hover/item:text-blue-600 transition">
                              <PackageIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 group-hover/item:text-blue-600 text-xs">
                                My Orders
                              </div>
                              <div className="text-[10px] text-gray-400 group-hover/item:text-blue-500">
                                {hoveredMenuItem === "orders"
                                  ? "3 orders • 1 In Transit"
                                  : "Track shipments & buy again"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              3
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />
                          </div>
                        </button>

                        {/* Saved Wishlist Drawer Trigger */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("wishlist")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsWishlistOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-5 py-2.5 hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-rose-100/60 flex items-center justify-center text-gray-500 group-hover/item:text-rose-600 transition">
                              <Heart className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 group-hover/item:text-rose-600 text-xs">
                                Saved Wishlist
                              </div>
                              <div className="text-[10px] text-gray-400">
                                {hoveredMenuItem === "wishlist"
                                  ? `${totalWishlistItems} items in your wishlist`
                                  : "View your saved favorites"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {isClient ? totalWishlistItems : 0}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-rose-500 group-hover/item:translate-x-0.5 transition-all" />
                          </div>
                        </button>

                        {/* Leave Product Feedback */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("feedback")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsFeedbackModalOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-5 py-2.5 hover:bg-amber-50/80 text-gray-700 hover:text-amber-700 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-amber-100/60 flex items-center justify-center text-gray-500 group-hover/item:text-amber-600 transition">
                              <Star className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 group-hover/item:text-amber-700 text-xs">
                                Review Ordered Products
                              </div>
                              <div className="text-[10px] text-gray-400">
                                Send feedback to store manager
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-amber-600 group-hover/item:translate-x-0.5 transition-all" />
                        </button>

                        {/* Admin Watchtower Shortcut */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("admin")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsAdminDashboardOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-5 py-2.5 hover:bg-slate-100 text-gray-700 hover:text-slate-900 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 transition">
                              <Award className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-xs">
                                Manager Feedback Watchtower
                              </div>
                              <div className="text-[10px] text-gray-400">
                                View client names & ordered items
                              </div>
                            </div>
                          </div>
                          <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        </button>

                        {/* Client Profile & Settings */}
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("settings")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={() => {
                            setIsProfileModalOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-5 py-2.5 hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 font-medium transition flex items-center justify-between cursor-pointer group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-blue-100/60 flex items-center justify-center text-gray-500 group-hover/item:text-blue-600 transition">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 group-hover/item:text-blue-600 text-xs">
                                Client Profile & Addresses
                              </div>
                              <div className="text-[10px] text-gray-400">
                                Personal details, cards & addresses
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />
                        </button>
                      </div>

                      {/* Sign Out Button */}
                      <div className="pt-2 border-t border-gray-100 px-4">
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredMenuItem("signout")}
                          onMouseLeave={() => setHoveredMenuItem(null)}
                          onClick={handleSignOut}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition cursor-pointer group/signout"
                        >
                          <div className="flex items-center gap-2">
                            <LogOut className="w-3.5 h-3.5 text-red-500 group-hover/signout:scale-110 transition-transform" />
                            <span>Sign Out</span>
                          </div>
                          <span className="text-[10px] text-red-400 font-normal">
                            Active Session
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Standard Professional Guest Mode Menu */
                    <div className="p-5 space-y-4">
                      {/* Header with Standard E-commerce Branding */}
                      <div className="space-y-1">
                        <div className="font-bold text-gray-900 text-sm flex items-center justify-between">
                          <span>Welcome to Enjoy-Mart</span>
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                            Guest
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          Sign in to manage orders, track deliveries, and access member-only deals.
                        </p>
                      </div>

                      {/* Standard Primary Sign In & Register Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => openAuth("signin")}
                          className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Sign In</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openAuth("signup")}
                          className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold rounded-xl text-xs border border-gray-200 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-gray-500" />
                          <span>Register</span>
                        </button>
                      </div>

                      {/* Standard Guest Service Shortcuts */}
                      <div className="pt-3 border-t border-gray-100 space-y-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
                          Quick Services
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsOrdersModalOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center justify-between text-xs font-medium cursor-pointer transition"
                        >
                          <div className="flex items-center gap-2">
                            <PackageIcon className="w-3.5 h-3.5 text-gray-400" />
                            <span>Track an Order</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsAdminDashboardOpen(true);
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-800 flex items-center justify-between text-xs font-bold cursor-pointer transition"
                        >
                          <div className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>Manager Feedback Watchtower</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsAccountOpen(false);
                            showToast("📞 Customer Support: +1 (800) 123-4567 (24/7)");
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center justify-between text-xs font-medium cursor-pointer transition"
                        >
                          <div className="flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                            <span>Help Center & FAQ</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-gray-300" />
                        </button>
                      </div>

                      {/* 1-Click Demo VIP Login Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentUser({
                            name: "khun911",
                            email: "khun911@users.noreply.github.com",
                            isVip: true,
                          });
                          setIsLoggedIn(true);
                          setIsAccountOpen(false);
                          showToast("🎉 Welcome back, khun911!");
                        }}
                        className="w-full py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 border border-blue-200 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>1-Click Demo Login (khun911)</span>
                      </button>

                      {/* Standard Security Footer */}
                      <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>256-bit SSL Encrypted Shopping</span>
                      </div>
                    </div>
                  )}
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
              <span className="text-[11px] font-medium mt-1">{t("cart")}</span>
            </button>

            {/* Language Selector (Moved to after Cart on TopBar) */}
            <div ref={langDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex flex-col items-center group text-gray-700 hover:text-blue-600 transition relative cursor-pointer"
                title="Select Language"
              >
                <div className="relative flex items-center justify-center h-5">
                  <span className="text-lg leading-none select-none">{currentLanguage.flag}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[11px] font-semibold mt-1 text-gray-700 group-hover:text-blue-600">
                  <span>{currentLanguage.code.toUpperCase()}</span>
                  <ChevronDown className={`w-2.5 h-2.5 text-gray-400 group-hover:text-blue-600 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Language Dropdown Menu with Multiple Languages */}
              {isLangOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                      <Globe className="w-3.5 h-3.5 text-blue-600" /> Choose Language
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                      {SUPPORTED_LANGUAGES.length} Languages
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-gray-50">
                    {SUPPORTED_LANGUAGES.map((lang: LanguageInfo) => {
                      const isSelected = currentLanguage.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang);
                            setIsLangOpen(false);
                            showToast(`🌐 Language set to ${lang.native} (${lang.name})`);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-blue-50/80 transition cursor-pointer text-xs ${
                            isSelected ? "bg-blue-50/70 text-blue-700 font-bold" : "text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{lang.flag}</span>
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">{lang.native}</span>
                              <span className="text-[10px] text-gray-400">{lang.name}</span>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
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

      {/* Standard E-Commerce Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Client Feedback Review Modal (Reviewed Products from Orders) */}
      <ClientFeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        clientName={currentUser.name}
        clientEmail={currentUser.email}
        onAddFeedback={handleAddFeedback}
      />

      {/* Admin / Store Manager Feedback Watchtower Dashboard */}
      <AdminFeedbackDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        feedbacks={feedbacks}
      />

      {/* Client Profile & Account Settings Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updated) => {
          setCurrentUser((prev) => ({ ...prev, ...updated }));
          showToast(`👤 Client Profile updated: ${updated.name}`);
        }}
      />
    </>
  );
}
