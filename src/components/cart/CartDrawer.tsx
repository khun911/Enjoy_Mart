"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Coins,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { CURRENCIES, formatCurrency } from "@/utils/currency";
import Barcode from "@/components/common/Barcode";
import FormalCheckoutModal from "@/components/checkout/FormalCheckoutModal";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  const [currency, setCurrency] = useState("USD");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Free shipping threshold at $50
  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
            {/* Header with OFFICIAL WEBSITE LOGO */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                {/* Enjoy-Mart Official Website Logo Mark */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
                  <span className="font-extrabold text-xl tracking-tight">E</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xl tracking-tight text-blue-600 leading-none">
                      ENJOY<span className="text-gray-900">-MART</span>
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                      {cart.length} {cart.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                    Official Shopping Cart
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CLEAN COMPACT MONEY & CURRENCY SELECTOR */}
            <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-blue-50/90 px-4 py-2.5 border-b border-blue-100/80 shrink-0 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-blue-950 font-bold text-xs">
                <Coins className="w-4 h-4 text-blue-600" />
                <span>Payment Currency:</span>
              </div>

              {/* Clean Native Dropdown */}
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label="Select Payment Currency"
                  className="bg-white border border-blue-200 text-blue-900 font-bold text-xs py-1.5 pl-2.5 pr-8 rounded-lg shadow-2xs focus:outline-none focus:border-blue-600 cursor-pointer appearance-none"
                >
                  {Object.keys(CURRENCIES).map((cur) => (
                    <option key={cur} value={cur}>
                      {CURRENCIES[cur].flag} {cur} ({CURRENCIES[cur].symbol}) - {CURRENCIES[cur].name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Free Shipping Progress Indicator */}
            {cart.length > 0 && (
              <div className="p-3 bg-amber-50/60 border-b border-amber-100 text-xs shrink-0">
                <div className="flex items-center justify-between mb-1 text-[11px]">
                  <span className="flex items-center gap-1 font-semibold text-amber-900">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> You unlocked FREE Delivery!
                      </span>
                    ) : (
                      <>
                        Add <strong className="text-blue-600 font-bold">{formatCurrency(remainingForFreeShipping, currency)}</strong> more for Free Shipping
                      </>
                    )}
                  </span>
                  <span className="font-bold text-gray-500">{progressPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      remainingForFreeShipping === 0 ? "bg-emerald-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Coins className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">Your cart is empty</h3>
                  <p className="text-sm mt-1 text-gray-500 max-w-xs">
                    Browse our best sellers or new arrivals to add items to your cart.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50/80 border border-gray-100 rounded-2xl hover:border-blue-200 transition"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                      {item.category && (
                        <span className="text-[10px] text-blue-600 font-medium">
                          {item.category}
                        </span>
                      )}
                      <div className="text-xs font-extrabold text-blue-700 mt-1">
                        {formatCurrency(item.price, currency)}
                        {currency !== "USD" && (
                          <span className="text-[9px] text-gray-400 font-normal ml-1">
                            (${item.price.toFixed(2)})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition cursor-pointer p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-l-md cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-r-md cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Subtotal, Formal Checkout, Visa Card & Barcode */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/70 space-y-3.5 shrink-0">
                {/* 30-Day Easy Exchange Policy Guarantee */}
                <div className="flex items-center gap-2 text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200/90 p-2.5 rounded-xl">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>
                    <strong>30-Day Free Exchange:</strong> Return or exchange any item with official barcode receipt.
                  </span>
                </div>

                {/* Subtotal with Chosen Money Conversion */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-gray-900">Subtotal ({currency})</span>
                    <span className="block text-[10px] text-gray-400">Taxes calculated at checkout</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-gray-900">
                      {formatCurrency(totalPrice, currency)}
                    </span>
                    {currency !== "USD" && (
                      <span className="block text-[10px] text-gray-400">
                        ≈ ${totalPrice.toFixed(2)} USD
                      </span>
                    )}
                  </div>
                </div>

                {/* Formal Checkout Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Formal Card Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Accepted Payment Badges: Visa, Mastercard, AMEX, PayPal */}
                <div className="pt-1 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Accepted Formal Payment Cards:</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-blue-700 italic font-black">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-amber-600 font-black">
                      MC
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-blue-500 font-bold">
                      AMEX
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-blue-900 font-bold">
                      PayPal
                    </span>
                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-900 font-bold">
                       Pay
                    </span>
                  </div>
                </div>

                {/* In-Store Pickup Barcode */}
                <div className="pt-2 text-center border-t border-gray-200/80">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                    In-Store Scan & Exchange Barcode
                  </span>
                  <Barcode value="EM-CART-911" height={28} showText={false} />
                  <span className="text-[9px] font-mono text-gray-400 mt-0.5 block">
                    *EM-CART-911-ENJOY*
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-1 text-xs text-gray-400 hover:text-red-500 font-medium transition text-center cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Formal Card Checkout Modal */}
      <FormalCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        initialCurrency={currency}
        onOrderSuccess={() => {
          clearCart();
        }}
      />
    </>
  );
}
