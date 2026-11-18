"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, ChevronDown, Sparkles } from "lucide-react";

export default function TopBar() {
  const [currency, setCurrency] = useState("USD ($)");
  const [language, setLanguage] = useState("English");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="w-full bg-slate-900 text-gray-300 text-xs py-2 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Contact Info & Notice */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+1 (800) 123-4567</span>
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="mailto:support@enjoymart.com"
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>support@enjoymart.com</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-blue-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              Free delivery on all orders over $50! Use code{" "}
              <strong className="text-white font-bold bg-blue-600/60 px-1.5 py-0.5 rounded text-[11px]">
                ENJOY20
              </strong>
            </span>
          </div>
        </div>

        {/* Right: Quick Links, Language & Currency */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="hidden sm:flex items-center gap-4 text-gray-400">
            <Link href="#track-order" className="hover:text-white transition">
              Track Order
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="#faq" className="hover:text-white transition">
              Help Center
            </Link>
          </div>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 hover:text-white transition text-gray-300"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-1 z-50 text-xs">
                {["USD ($)", "EUR (€)", "GBP (£)", "CAD ($)"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition ${
                      currency === curr ? "font-bold text-blue-600" : ""
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center gap-1 hover:text-white transition text-gray-300"
            >
              <span>{language}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-1 z-50 text-xs">
                {["English", "Español", "Français", "Deutsch"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition ${
                      language === lang ? "font-bold text-blue-600" : ""
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
