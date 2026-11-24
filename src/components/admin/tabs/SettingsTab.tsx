"use client";

import React, { useState } from "react";
import {
  Settings,
  Store,
  CreditCard,
  Receipt,
  ShieldCheck,
  Bell,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function SettingsTab() {
  const [activeCategory, setActiveCategory] = useState<
    "general" | "payments" | "tax" | "security" | "notifications"
  >("general");

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [storeName, setStoreName] = useState("Enjoy-Mart Flagship Online Store");
  const [supportEmail, setSupportEmail] = useState("support@enjoymart.com");
  const [phoneHotline, setPhoneHotline] = useState("+855 12 345 678");
  const [currency, setCurrency] = useState("USD ($)");
  const [timezone, setTimezone] = useState("Asia/Phnom_Penh (UTC+07:00)");
  const [address, setAddress] = useState("No. 128, St. 2004, Sen Sok, Phnom Penh, Cambodia");

  // Payment Gateway states
  const [bakongEnabled, setBakongEnabled] = useState(true);
  const [visaEnabled, setVisaEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);

  // Tax states
  const [taxRate, setTaxRate] = useState("8%");
  const [taxId, setTaxId] = useState("KHM-2026-9118");
  const [autoInvoice, setAutoInvoice] = useState(true);

  // Security states
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30 mins");

  // Notification states
  const [stockAlerts, setStockAlerts] = useState(true);
  const [telegramWebhook, setTelegramWebhook] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Settings className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Enterprise Store Settings & ERP Configuration
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global store metadata, currency rules, NBC Bakong KHQR credentials, VAT rates, and system security.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? "Saved Successfully!" : "Save Configuration"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 font-bold animate-in fade-in duration-150">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>All system configurations and ERP parameter changes have been saved to live database.</span>
        </div>
      )}

      {/* 2. Category Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
        {[
          { id: "general", label: "General Store", icon: Store },
          { id: "payments", label: "Payment Gateways", icon: CreditCard },
          { id: "tax", label: "Taxes & Invoicing", icon: Receipt },
          { id: "security", label: "Security & Access", icon: ShieldCheck },
          { id: "notifications", label: "Notifications & Alerts", icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Settings Form Panels */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        {/* PANEL: GENERAL STORE */}
        {activeCategory === "general" && (
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            <h4 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              General Store & Business Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Official Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Corporate Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Customer Support Hotline</label>
                <input
                  type="text"
                  value={phoneHotline}
                  onChange={(e) => setPhoneHotline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Base System Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="USD ($)">USD ($) - United States Dollar (Default)</option>
                  <option value="KHR (៛)">KHR (៛) - Cambodian Riel (Fixed 4,100 KHR/USD)</option>
                  <option value="EUR (€)">EUR (€) - Eurozone Euro</option>
                  <option value="CNY (¥)">CNY (¥) - Chinese Yuan</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-800 mb-1.5">System Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-800 mb-1.5">Headquarters Logistics Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </form>
        )}

        {/* PANEL: PAYMENT GATEWAYS */}
        {activeCategory === "payments" && (
          <div className="space-y-6 text-xs">
            <h4 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              Payment Gateway Integrations & Merchant Routing
            </h4>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      NBC Bakong KHQR (National Bank of Cambodia)
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Zero Merchant Fee
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live dynamic EMVCo QR code generator supporting ABA, ACLEDA, Wing, and Sathapana.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={bakongEnabled}
                  onChange={(e) => setBakongEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      Visa & Mastercard Global Gateway (3D-Secure 2.0)
                    </span>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                      PCI-DSS Level 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Credit & debit card acquiring with real-time fraud scoring and tokenization.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={visaEnabled}
                  onChange={(e) => setVisaEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      PayPal Express & Apple Pay
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      Cross-Border
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Instant one-touch digital wallet checkout for international buyers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={paypalEnabled}
                  onChange={(e) => setPaypalEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      Cash on Delivery (COD) with Inspection Receipt
                    </span>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                      Domestic Courier
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Driver collects cash payment upon physical parcel inspection in Cambodia.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={codEnabled}
                  onChange={(e) => setCodEnabled(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: TAXES & INVOICING */}
        {activeCategory === "tax" && (
          <div className="space-y-6 text-xs">
            <h4 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              Tax Rates & Automated Invoicing Parameters
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Standard VAT / Sales Tax Rate</label>
                <input
                  type="text"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">General Dept of Taxation (GDT) Tax ID</label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">
                    Automated Digital PDF Invoicing with Scannable Barcode
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automatically issues and emails tax invoice upon order delivery and client signature.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoInvoice}
                  onChange={(e) => setAutoInvoice(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* PANEL: SECURITY & ACCESS */}
        {activeCategory === "security" && (
          <div className="space-y-6 text-xs">
            <h4 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              Security Protocol & Super Admin Access Control
            </h4>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      Two-Factor Authentication (2FA)
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enforces Google Authenticator or SMS OTP for all admin dashboard logins.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">
                    Idle Session Security Timeout
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automatically signs out admin dashboard after a period of user inactivity.
                  </p>
                </div>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="15 mins">15 Minutes</option>
                  <option value="30 mins">30 Minutes (Recommended)</option>
                  <option value="60 mins">60 Minutes</option>
                  <option value="Never">Never (Insecure)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* PANEL: NOTIFICATIONS & ALERTS */}
        {activeCategory === "notifications" && (
          <div className="space-y-6 text-xs">
            <h4 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100">
              Automated Notification Triggers & Webhooks
            </h4>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">
                    Low Inventory Alert Thresholds (&lt; 50 Units)
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sends instant notification banner when any warehouse product SKU drops below 50 units.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={stockAlerts}
                  onChange={(e) => setStockAlerts(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block">
                    Telegram Operations Bot Webhook
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Dispatches real-time order alerts and high-value cart checkout notifications to store management channel.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={telegramWebhook}
                  onChange={(e) => setTelegramWebhook(e.target.checked)}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
