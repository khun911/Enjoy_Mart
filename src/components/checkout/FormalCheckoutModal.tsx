"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  RefreshCw,
  Printer,
  Download,
  Truck,
  ArrowRight,
  QrCode,
  Tag,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Clock,
} from "lucide-react";
import { CartItem } from "@/types";
import { CURRENCIES, formatCurrency } from "@/utils/currency";
import Barcode from "@/components/common/Barcode";
import QRCode from "@/components/common/QRCode";

export type PaymentMethodType = "qr" | "visa" | "mastercard" | "paypal" | "applepay" | "cod";

interface FormalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  initialCurrency?: string;
  initialPaymentMethod?: PaymentMethodType;
  onOrderSuccess: (orderId: string) => void;
}

export default function FormalCheckoutModal({
  isOpen,
  onClose,
  cart,
  totalPrice,
  initialCurrency = "USD",
  initialPaymentMethod = "qr",
  onOrderSuccess,
}: FormalCheckoutModalProps) {
  // Currency exchange state
  const [currency, setCurrency] = useState(initialCurrency);

  // Selected Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(initialPaymentMethod);

  // Client & Card form state
  const [cardHolder, setCardHolder] = useState("KHUN 911");
  const [cardNumber, setCardNumber] = useState("4532 8920 1840 9182");
  const [expiryDate, setExpiryDate] = useState("08/29");
  const [cvv, setCvv] = useState("892");
  const [clientEmail, setClientEmail] = useState("khun911@enjoy-mart.com");
  const [shippingAddress, setShippingAddress] = useState("No. 128, St. 2004, Phnom Penh, Cambodia");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("ORD-2026-91184");

  // Selected Bank for QR
  const [selectedBank, setSelectedBank] = useState<string>("ABA Mobile");

  // QR Countdown Timer (15 minutes simulation)
  const [qrTimer, setQrTimer] = useState(899);

  // Sync state with props during render without useEffect setState
  const [prevMethodProp, setPrevMethodProp] = useState(initialPaymentMethod);
  const [prevCurrencyProp, setPrevCurrencyProp] = useState(initialCurrency);

  if (initialPaymentMethod !== prevMethodProp) {
    setPrevMethodProp(initialPaymentMethod);
    setPaymentMethod(initialPaymentMethod);
  }

  if (initialCurrency !== prevCurrencyProp) {
    setPrevCurrencyProp(initialCurrency);
    setCurrency(initialCurrency);
  }

  useEffect(() => {
    if (paymentMethod === "qr" && isOpen && !isCompleted) {
      const interval = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 900));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [paymentMethod, isOpen, isCompleted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
  const finalTotalUSD = totalPrice - discountAmount + shippingFee + taxAmount;

  // Process Payment submission
  const handleProcessPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `ORD-2026-${randomSuffix}`;

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setConfirmedOrderId(newOrderId);
      onOrderSuccess(newOrderId);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-extrabold text-xl shadow-inner border border-white/30">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight leading-none">
                  ENJOY<span className="text-blue-300">-MART</span>
                </span>
                <span className="text-white/80 text-xs font-semibold">| Multi-Option Payment Gateway</span>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 256-Bit SSL
                </span>
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5">
                Official Bank Gateway • Dynamic QR • Cards • Digital Wallets • 30-Day Free Exchange
              </p>
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

        {/* Currency & Exchange Rate Ribbon */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2 shrink-0">
          <div className="flex items-center gap-2 font-medium">
            <RefreshCw className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="text-slate-600 font-semibold">
              Live Rate: 1 USD = {CURRENCIES[currency]?.rate?.toLocaleString() || 1} {currency} ({CURRENCIES[currency]?.name || "US Dollar"})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-bold">Billing Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select Payment Currency"
              className="bg-white border border-slate-300 text-slate-900 font-bold text-xs py-1 px-3 rounded-lg shadow-2xs focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((cur) => (
                <option key={cur} value={cur} className="text-slate-900 bg-white">
                  {CURRENCIES[cur].flag} {cur} - {CURRENCIES[cur].name} ({CURRENCIES[cur].symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {!isCompleted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: MULTIPLE CHOICE PAYMENT SELECTOR & ACTIVE INTERFACE */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. MULTIPLE CHOICE PAYMENT METHOD SELECTOR */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Choose How to Pay:
                    </label>
                    <span className="text-[11px] text-blue-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> All methods 100% verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Choice 1: QR Code */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("qr")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer relative ${
                        paymentMethod === "qr"
                          ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/70 text-slate-700"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${paymentMethod === "qr" ? "bg-blue-600 text-white" : "bg-white text-blue-600 shadow-2xs"}`}>
                        <QrCode className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs">QR Code</span>
                      <span className="text-[10px] text-slate-500 font-medium">Scan & Pay</span>
                      {paymentMethod === "qr" && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>

                    {/* Choice 2: Visa / Mastercard */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("visa")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer relative ${
                        paymentMethod === "visa" || paymentMethod === "mastercard"
                          ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/70 text-slate-700"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${paymentMethod === "visa" || paymentMethod === "mastercard" ? "bg-blue-600 text-white" : "bg-white text-blue-600 shadow-2xs"}`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs">Visa / Card</span>
                      <span className="text-[10px] text-slate-500 font-medium">Debit / Credit</span>
                      {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>

                    {/* Choice 3: PayPal / Apple Pay */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer relative ${
                        paymentMethod === "paypal" || paymentMethod === "applepay"
                          ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/70 text-slate-700"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${paymentMethod === "paypal" || paymentMethod === "applepay" ? "bg-blue-600 text-white" : "bg-white text-blue-600 shadow-2xs"}`}>
                        <Wallet className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs">PayPal / Pay</span>
                      <span className="text-[10px] text-slate-500 font-medium">1-Click Express</span>
                      {(paymentMethod === "paypal" || paymentMethod === "applepay") && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>

                    {/* Choice 4: Cash on Delivery (COD) */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer relative ${
                        paymentMethod === "cod"
                          ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/70 text-slate-700"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${paymentMethod === "cod" ? "bg-blue-600 text-white" : "bg-white text-emerald-600 shadow-2xs"}`}>
                        <Banknote className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs">Cash on Delivery</span>
                      <span className="text-[10px] text-slate-500 font-medium">Pay on Arrival</span>
                      {paymentMethod === "cod" && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. DYNAMIC PAYMENT INTERFACE BASED ON CHOICE */}

                {/* ===================== OPTION 1: QR CODE SCAN & PAY ===================== */}
                {paymentMethod === "qr" && (
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/40 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                            Scan with Mobile Banking (KHQR / Global Scan)
                          </h4>
                          <span className="text-[10px] text-slate-500">
                            Merchant: ENJOY-MART OFFICIAL STORE • No Transaction Fee
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-300">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{formatTimer(qrTimer)}</span>
                      </div>
                    </div>

                    {/* QR Code Presentation */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                      <div className="flex flex-col items-center">
                        <QRCode
                          value={`khqr://enjoy-mart/pay?amt=${finalTotalUSD.toFixed(2)}&cur=${currency}&ref=${confirmedOrderId}`}
                          size={190}
                        />
                        <span className="text-[10px] font-mono font-bold text-slate-500 mt-2">
                          INVOICE: #{confirmedOrderId}
                        </span>
                      </div>

                      <div className="space-y-3 max-w-xs text-xs">
                        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
                          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                            Total Due in {currency}:
                          </span>
                          <div className="text-xl font-black text-blue-600">
                            {formatCurrency(finalTotalUSD, currency)}
                          </div>
                          {currency !== "USD" && (
                            <span className="text-[10px] text-slate-400 block">
                              ≈ ${finalTotalUSD.toFixed(2)} USD
                            </span>
                          )}
                        </div>

                        {/* Supported Banking Apps */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                            Supported Mobile Apps:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {["ABA Mobile", "Wing Bank", "ACLEDA", "Bakong", "PromptPay"].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setSelectedBank(bank)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                                  selectedBank === bank
                                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 leading-snug">
                          Open <strong>{selectedBank}</strong> or any banking app, tap <strong>Scan QR</strong>, and approve payment.
                        </p>
                      </div>
                    </div>

                    {/* Instant Scan Simulation Button */}
                    <button
                      type="button"
                      onClick={() => handleProcessPayment()}
                      disabled={isProcessing}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying Bank Network Payment...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Simulate App Scan & Pay {formatCurrency(finalTotalUSD, currency)}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* ===================== OPTION 2: VISA / MASTERCARD ===================== */}
                {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
                  <div className="space-y-4">
                    {/* Photorealistic Metallic Card Preview */}
                    <div className="relative w-full max-w-[360px] mx-auto aspect-[1.586] rounded-2xl p-5 text-white shadow-xl overflow-hidden bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-900 border border-white/20 select-none group">
                      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

                      {/* Card Top: Chip & Network */}
                      <div className="relative z-10 flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-500 p-1 flex flex-col justify-between shadow-inner">
                            <div className="w-full h-[1px] bg-amber-800/40" />
                            <div className="w-full h-[1px] bg-amber-800/40" />
                          </div>
                          <span className="text-[9px] font-mono tracking-widest text-blue-200 uppercase">
                            Formal Debit
                          </span>
                        </div>

                        <div className="text-right">
                          {paymentMethod === "mastercard" ? (
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-red-500" />
                              <div className="w-5 h-5 rounded-full bg-amber-400 -ml-2" />
                            </div>
                          ) : (
                            <span className="font-extrabold italic text-lg tracking-tight text-white">VISA</span>
                          )}
                        </div>
                      </div>

                      {/* Enjoy-Mart Official Brand */}
                      <div className="relative z-10 flex items-center gap-1.5 opacity-90 my-1">
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/95">
                          ENJOY-MART <span className="text-[8px] font-normal text-blue-200">PLATINUM VIP</span>
                        </span>
                      </div>

                      {/* Card Number */}
                      <div className="relative z-10 my-2 font-mono text-lg sm:text-xl tracking-[0.16em] font-medium text-white drop-shadow-md">
                        {cardNumber || "4532 8920 1840 9182"}
                      </div>

                      {/* Card Bottom */}
                      <div className="relative z-10 flex items-end justify-between pt-1">
                        <div>
                          <div className="text-[8px] uppercase tracking-widest text-blue-200/80 font-mono">
                            Cardholder
                          </div>
                          <div className="font-mono text-xs font-bold tracking-wider uppercase text-white truncate max-w-[170px]">
                            {cardHolder || "KHUN 911"}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[8px] uppercase tracking-widest text-blue-200/80 font-mono">
                            Expires
                          </div>
                          <div className="font-mono text-xs font-semibold tracking-wider text-white">
                            {expiryDate || "12/29"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Form Fields */}
                    <form id="card-checkout-form" onSubmit={handleProcessPayment} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="e.g. KHUN 911"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                          <span>Card Number</span>
                          <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                            <Lock className="w-3 h-3 text-emerald-600" /> Bank Level Security
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
                            className="w-full pl-3.5 pr-14 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 tracking-wider focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 font-black italic text-blue-700 text-xs">
                            {paymentMethod === "mastercard" ? "MC" : "VISA"}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Expiration (MM/YY)
                          </label>
                          <input
                            type="text"
                            required
                            value={expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                            <span>CVV / CVC</span>
                            <span className="text-[10px] text-slate-500 font-semibold">3 Digits</span>
                          </label>
                          <input
                            type="password"
                            required
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition shadow-2xs"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* ===================== OPTION 3: PAYPAL & APPLE PAY ===================== */}
                {(paymentMethod === "paypal" || paymentMethod === "applepay") && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                      <Wallet className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        Fast 1-Click Digital Wallet Checkout
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                        Authorize instantly with your saved PayPal account or Apple Pay biometric device. No card number typing needed.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                      <button
                        type="button"
                        onClick={() => handleProcessPayment()}
                        disabled={isProcessing}
                        className="py-3 px-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <span>🅿️ PayPal Express</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleProcessPayment()}
                        disabled={isProcessing}
                        className="py-3 px-4 bg-slate-900 hover:bg-black text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <span> Apple Pay</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2 pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Enjoy-Mart Buyer Protection Guarantee</span>
                    </div>
                  </div>
                )}

                {/* ===================== OPTION 4: CASH ON DELIVERY ===================== */}
                {paymentMethod === "cod" && (
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-amber-950 uppercase tracking-wide">
                          Cash on Delivery (COD) & In-Store Pickup
                        </h4>
                        <span className="text-[11px] text-amber-800">
                          Inspect products first, then pay in cash directly to our courier.
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>Courier Dispatch To:</span>
                        <span className="text-blue-600 text-[11px]">Cambodia Standard Dispatch</span>
                      </div>
                      <p className="text-slate-700 font-medium">
                        {shippingAddress}
                      </p>
                      <div className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                        💵 Please prepare exact cash of <strong>{formatCurrency(finalTotalUSD, currency)}</strong> upon arrival.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleProcessPayment()}
                      disabled={isProcessing}
                      className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Registering Cash Order...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Confirm Order with Cash on Delivery ({formatCurrency(finalTotalUSD, currency)})</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Shipping & Notification Fields (Shared) */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Recipient & Delivery Coordinates</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        Notification Email
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@email.com"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Address, City, Country"
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 30-Day Easy Exchange Policy Guarantee Box */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                  <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      30-Day Official Exchange Guarantee
                    </h4>
                    <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed">
                      Every order includes an authentic Enjoy-Mart Barcode Exchange Pass. Return or swap any product hassle-free within 30 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary, Barcode, Total Due & Submit */}
              <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-sm font-black text-slate-900">Order Summary ({cart.length} items)</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      {currency}
                    </span>
                  </div>

                  {/* Cart Items List */}
                  <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 my-3 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                          <span className="text-[11px] text-slate-500 font-semibold">Qty: {item.quantity}</span>
                        </div>
                        <div className="text-xs font-black text-slate-900">
                          {formatCurrency(item.price * item.quantity, currency)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-blue-600" /> Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try 'ENJOY20'"
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400 uppercase focus:outline-none focus:border-blue-600 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] mt-1 font-bold ${discountPercent > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {promoMessage}
                      </p>
                    )}
                  </div>

                  {/* Cost Calculation */}
                  <div className="mt-4 space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200 font-medium">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrency(totalPrice, currency)}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>VIP Discount ({(discountPercent * 100).toFixed(0)}%)</span>
                        <span>-{formatCurrency(discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        Shipping
                        {shippingFee === 0 && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 rounded">
                            FREE
                          </span>
                        )}
                      </span>
                      <span className="font-bold text-slate-900">
                        {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee, currency)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-bold text-slate-900">
                        {formatCurrency(taxAmount, currency)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                      <span>Total Due</span>
                      <div className="text-right">
                        <div className="text-lg font-black text-blue-700">
                          {formatCurrency(finalTotalUSD, currency)}
                        </div>
                        {currency !== "USD" && (
                          <div className="text-[10px] text-slate-400 font-normal">
                            ≈ ${finalTotalUSD.toFixed(2)} USD
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scannable Barcode Preview */}
                  <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                      Scannable Order Barcode
                    </span>
                    <Barcode value="EM-2026-911-CHK" height={32} />
                  </div>
                </div>

                {/* Submit Action Button for Card Method */}
                {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
                  <div>
                    <button
                      type="submit"
                      form="card-checkout-form"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Authorizing Card Payment...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Authorize & Pay {formatCurrency(finalTotalUSD, currency)}</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 3D Secure Identity Check Verified
                    </p>
                  </div>
                )}
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
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Payment Authorized & Order Confirmed!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for shopping with <strong className="text-blue-600">Enjoy-Mart</strong>! Your official invoice, barcode receipt, and exchange ticket have been generated.
                </p>
              </div>

              {/* Formal Printed Receipt Paper Card */}
              <div id="printable-receipt" className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300 relative shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                      E
                    </div>
                    <div>
                      <span className="font-black text-sm tracking-tight text-blue-600 leading-none block">
                        ENJOY<span className="text-slate-900">-MART</span>
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                        Receipt #{confirmedOrderId}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-600 font-semibold">
                    <div>Date: Nov 22, 2026</div>
                    <div className="text-emerald-600 font-bold uppercase">
                      {paymentMethod === "cod" ? "COD REGISTERED" : "PAID IN FULL"}
                    </div>
                  </div>
                </div>

                {/* Scannable Barcode & QR Code Section */}
                <div className="py-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-around gap-4 bg-white rounded-xl p-4 my-4 shadow-2xs">
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Exchange & Warranty Barcode
                    </span>
                    <Barcode value={confirmedOrderId} height={44} />
                    <span className="text-[9px] text-slate-400 mt-0.5 block">
                      Present at any store for 30-Day Free Exchange
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Digital Invoice QR
                    </span>
                    <QRCode value={`https://enjoy-mart.com/receipt/${confirmedOrderId}`} size={90} />
                    <span className="text-[9px] text-slate-400 mt-0.5 block">
                      Scan to track warranty
                    </span>
                  </div>
                </div>

                {/* Purchased Items List */}
                <div className="py-2 space-y-2">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Purchased Merchandise:
                  </h5>
                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.id} className="py-2 flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">x{item.quantity}</span>
                          <span className="text-slate-900 font-bold">{item.name}</span>
                        </div>
                        <span className="text-slate-900">
                          {formatCurrency(item.price * item.quantity, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Receipt Details Footer */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 font-medium">
                  <div>
                    <div><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</div>
                    <div><strong>Recipient:</strong> {cardHolder} ({clientEmail})</div>
                    <div><strong>Ship to:</strong> {shippingAddress}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">
                      Amount: {formatCurrency(finalTotalUSD, currency)}
                    </div>
                    <span className="text-emerald-700 text-[11px] font-bold">
                      ✓ 30-Day Return Warranty Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Post-Checkout Action Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    alert(`Invoice #${confirmedOrderId} downloaded successfully.`);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Download PDF Pass</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Done & Back to Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
