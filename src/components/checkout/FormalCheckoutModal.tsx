"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  RefreshCw,
  Printer,
  Download,
  Truck,
  Sparkles,
  ArrowRight,
  QrCode,
  Tag,
} from "lucide-react";
import { CartItem } from "@/types";
import { CURRENCIES, formatCurrency } from "@/utils/currency";
import Barcode from "@/components/common/Barcode";

interface FormalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onOrderSuccess: (orderId: string) => void;
}

export default function FormalCheckoutModal({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onOrderSuccess,
}: FormalCheckoutModalProps) {
  // Currency exchange state
  const [currency, setCurrency] = useState("USD");

  // Client & Card form state
  const [cardHolder, setCardHolder] = useState("KHUN 911");
  const [cardNumber, setCardNumber] = useState("4532 8920 1840 9182");
  const [expiryDate, setExpiryDate] = useState("08/29");
  const [cvv, setCvv] = useState("892");
  const [clientEmail, setClientEmail] = useState("khun911@enjoy-mart.com");
  const [shippingAddress, setShippingAddress] = useState("No. 128, St. 2004, Phnom Penh, Cambodia");
  const [paymentMethod, setPaymentMethod] = useState<"visa" | "mastercard" | "paypal" | "applepay">("visa");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("ORD-2026-91184");

  // Format Card Number (space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted || "•••• •••• •••• ••••");

    // Auto switch logo
    if (raw.startsWith("5")) {
      setPaymentMethod("mastercard");
    } else if (raw.startsWith("4")) {
      setPaymentMethod("visa");
    }
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiryDate(raw || "MM/YY");
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "ENJOY20") {
      setDiscountPercent(0.2);
      setPromoMessage("20% VIP Discount Applied!");
    } else if (promoCode.trim().toUpperCase() === "WELCOME") {
      setDiscountPercent(0.1);
      setPromoMessage("10% Welcome Discount Applied!");
    } else {
      setPromoMessage("Invalid promo code. Try 'ENJOY20'");
    }
  };

  // Financial calculations
  const discountAmount = totalPrice * discountPercent;
  const shippingFee = totalPrice > 50 ? 0 : 9.99;
  const taxAmount = (totalPrice - discountAmount) * 0.08;
  const finalTotalUSD = Math.max(0, totalPrice - discountAmount + shippingFee + taxAmount);

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedId = `EM-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(generatedId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      onOrderSuccess(generatedId);
    }, 1400);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">Formal Card Checkout & Exchange</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 256-Bit SSL Secured
                </span>
              </div>
              <p className="text-xs text-blue-200">Official Enjoy-Mart Payment Gateway & Exchange Policy</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Exchange Banner Bar */}
        <div className="bg-blue-50/80 px-6 py-2.5 border-b border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-gray-700">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin-reverse" />
            <span className="font-semibold text-blue-900">Currency Exchange:</span>
            <span className="text-gray-600">
              1 USD = {CURRENCIES.KHR.rate.toLocaleString()} KHR | {CURRENCIES.EUR.rate} EUR | {CURRENCIES.GBP.rate} GBP
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-0.5 rounded-lg border border-blue-200 shadow-2xs">
            {Object.keys(CURRENCIES).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  currency === cur
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {CURRENCIES[cur].flag} {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isCompleted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Photorealistic Card Preview & Inputs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Photorealistic Metallic Visa Card */}
                <div className="relative w-full max-w-[380px] mx-auto aspect-[1.586] rounded-2xl p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-900 border border-white/20 select-none group">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Top: Chip & Contactless */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Realistic Gold EMV Chip */}
                      <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-500 shadow-inner p-1 flex flex-col justify-between">
                        <div className="w-full h-[1px] bg-amber-800/40" />
                        <div className="flex justify-between items-center h-full">
                          <div className="w-[1px] h-full bg-amber-800/40" />
                          <div className="w-4 h-2.5 rounded-sm border border-amber-800/50 bg-amber-300/30" />
                          <div className="w-[1px] h-full bg-amber-800/40" />
                        </div>
                        <div className="w-full h-[1px] bg-amber-800/40" />
                      </div>
                      {/* NFC Contactless Wave */}
                      <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.343 9.343a14.5 14.5 0 0121.314 0" />
                      </svg>
                    </div>

                    {/* Visa / Brand Logo */}
                    <div className="text-right">
                      {paymentMethod === "visa" ? (
                        <div className="font-extrabold italic text-2xl tracking-tighter text-white drop-shadow-md">
                          VISA
                        </div>
                      ) : paymentMethod === "mastercard" ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-red-500 opacity-90 shadow-sm" />
                          <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90 -ml-2.5 shadow-sm" />
                        </div>
                      ) : (
                        <span className="font-bold text-sm tracking-wider uppercase text-blue-200">
                          {paymentMethod}
                        </span>
                      )}
                      <span className="block text-[8px] font-mono tracking-widest text-blue-200/80 uppercase">
                        Platinum Debit
                      </span>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="relative z-10 my-3 font-mono text-xl sm:text-2xl tracking-[0.18em] font-medium text-white drop-shadow-md">
                    {cardNumber || "4532 8920 1840 9182"}
                  </div>

                  {/* Card Bottom: Holder Name & Valid Thru */}
                  <div className="relative z-10 flex items-end justify-between pt-2">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-blue-200/80 font-mono">
                        Cardholder Name
                      </div>
                      <div className="font-semibold text-xs sm:text-sm tracking-wider uppercase text-white truncate max-w-[200px]">
                        {cardHolder || "CUSTOMER NAME"}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-widest text-blue-200/80 font-mono">
                        Expires
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white">
                        {expiryDate || "12/29"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Payment Form */}
                <form id="checkout-form" onSubmit={handleProcessPayment} className="space-y-4">
                  {/* Payment Method Badges */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Formal Payment Method
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("visa")}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          paymentMethod === "visa"
                            ? "border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-xs"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="font-extrabold italic text-base text-blue-700">VISA</span>
                        <span className="text-[10px]">Visa Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("mastercard")}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          paymentMethod === "mastercard"
                            ? "border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-xs"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-red-500" />
                          <div className="w-4 h-4 rounded-full bg-amber-400 -ml-2" />
                        </div>
                        <span className="text-[10px]">Mastercard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          paymentMethod === "paypal"
                            ? "border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-xs"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="font-bold text-sm text-blue-900">PayPal</span>
                        <span className="text-[10px]">Express</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("applepay")}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                          paymentMethod === "applepay"
                            ? "border-blue-600 bg-blue-50/80 text-blue-700 font-bold shadow-xs"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="font-bold text-sm text-gray-900">Pay</span>
                        <span className="text-[10px]">Apple Pay</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Name on Visa / Card
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="e.g. KHUN 911"
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                        <span>Card Number</span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-emerald-500" /> Bank Level Security
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4532 8920 1840 9182"
                          maxLength={19}
                          className="w-full pl-3.5 pr-14 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 font-bold italic text-blue-700 text-xs">
                          {paymentMethod === "visa" ? "VISA" : "MC"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                          <span>CVV / CVC</span>
                          <span className="text-[10px] text-gray-400">3 Digits</span>
                        </label>
                        <input
                          type="password"
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    {/* Client Email & Shipping Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Notification Email
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="client@email.com"
                          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Address, City, Country"
                          className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                {/* 30-Day Easy Exchange Policy Guarantee Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      30-Day Official Exchange & Return Guarantee
                    </h4>
                    <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                      Every order comes with an authentic Enjoy-Mart Barcode Exchange Pass. Not satisfied? Enjoy fast 100% item replacement or full refund within 30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary, Barcode, Exchange Calculation */}
              <div className="lg:col-span-5 bg-gray-50/70 rounded-2xl p-5 border border-gray-200/80 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900">Order Summary ({cart.length} items)</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                      {currency}
                    </span>
                  </div>

                  {/* Cart Items List */}
                  <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 my-3 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                          <span className="text-[11px] text-gray-500">Qty: {item.quantity}</span>
                        </div>
                        <div className="text-xs font-bold text-gray-900">
                          {formatCurrency(item.price * item.quantity, currency)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-blue-600" /> Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try 'ENJOY20'"
                        className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] mt-1 font-medium ${discountPercent > 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {promoMessage}
                      </p>
                    )}
                  </div>

                  {/* Cost Calculation */}
                  <div className="mt-4 space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(totalPrice, currency)}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>VIP Discount ({(discountPercent * 100).toFixed(0)}%)</span>
                        <span>-{formatCurrency(discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-gray-400" /> Shipping
                      </span>
                      <span className="font-semibold text-gray-900">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-600 font-bold">FREE</span>
                        ) : (
                          formatCurrency(shippingFee, currency)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(taxAmount, currency)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-gray-300 flex justify-between items-baseline text-sm font-bold text-gray-900">
                      <span>Total Due</span>
                      <div className="text-right">
                        <div className="text-lg font-extrabold text-blue-600">
                          {formatCurrency(finalTotalUSD, currency)}
                        </div>
                        {currency !== "USD" && (
                          <div className="text-[10px] text-gray-400 font-normal">
                            ≈ ${finalTotalUSD.toFixed(2)} USD
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Authentic Barcode Preview for Checkout Docket */}
                  <div className="mt-5 p-3 bg-white rounded-xl border border-gray-200/90 text-center shadow-2xs">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block mb-1">
                      Scannable Order Barcode
                    </span>
                    <Barcode value="EM-2026-911-CHK" height={36} />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Authorizing Visa Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Authorize & Pay {formatCurrency(finalTotalUSD, currency)}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified by Visa & Mastercard Identity Check
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================================
               RESPONSE TO CLIENT: OFFICIAL ORDER CONFIRMATION & EXCHANGE RECEIPT
               ========================================================================= */
            <div className="max-w-2xl mx-auto py-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              {/* Success Badge */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Payment Authorized & Order Confirmed!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for shopping with <span className="font-bold text-blue-600">Enjoy-Mart</span>, {cardHolder}! Your official invoice and exchange barcode have been generated.
                </p>
              </div>

              {/* Formal Printed Receipt Paper Card */}
              <div id="printable-receipt" className="bg-gray-50/90 rounded-2xl p-6 border-2 border-dashed border-gray-300 relative shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Enjoy-Mart Official Invoice
                    </span>
                    <h4 className="text-base font-extrabold text-gray-900 mt-0.5">
                      Receipt #{confirmedOrderId}
                    </h4>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>Date: Nov 19, 2026</div>
                    <div className="text-emerald-600 font-bold">PAID IN FULL</div>
                  </div>
                </div>

                {/* Scannable Barcode & QR Code Section */}
                <div className="py-5 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-around gap-4 bg-white rounded-xl p-4 my-4 shadow-2xs">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Exchange & Warranty Barcode
                    </span>
                    <Barcode value={confirmedOrderId} height={48} />
                    <span className="text-[9px] text-gray-400 mt-0.5 block">
                      Present at any store for 30-Day Free Exchange
                    </span>
                  </div>

                  <div className="h-12 w-[1px] bg-gray-200 hidden sm:block" />

                  <div className="text-center flex flex-col items-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Mobile QR Verification
                    </span>
                    <div className="p-1.5 bg-gray-100 rounded-lg border border-gray-200">
                      <QrCode className="w-12 h-12 text-gray-900" />
                    </div>
                    <span className="text-[9px] text-gray-400 mt-0.5">Scan to Track</span>
                  </div>
                </div>

                {/* Receipt Details Breakdown */}
                <div className="space-y-2 text-xs text-gray-700 py-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client Name:</span>
                    <span className="font-bold text-gray-900">{cardHolder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Confirmation Sent To:</span>
                    <span className="font-semibold text-gray-800">{clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Address:</span>
                    <span className="font-semibold text-gray-800">{shippingAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Method:</span>
                    <span className="font-bold text-blue-700">
                      {paymentMethod.toUpperCase()} (ending in {cardNumber.slice(-4)})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Currency Exchange Applied:</span>
                    <span className="font-medium text-gray-800">
                      {currency} (Rate: {CURRENCIES[currency].rate})
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                    <span>Total Amount Charged:</span>
                    <span className="text-blue-600">{formatCurrency(finalTotalUSD, currency)}</span>
                  </div>
                </div>

                {/* 30-Day Exchange Guarantee Stamp */}
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2 text-amber-800 text-[11px] bg-amber-50/80 p-2.5 rounded-lg border border-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Official Exchange Policy:</strong> Items in this order qualify for 30-day return or exchange. Keep this receipt or barcode handy.
                  </span>
                </div>
              </div>

              {/* Receipt Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4" /> Print Formal Receipt
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer border border-blue-200"
                >
                  <Download className="w-4 h-4" /> Download PDF Invoice
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCompleted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
