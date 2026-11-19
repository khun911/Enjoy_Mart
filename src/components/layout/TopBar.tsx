"use client";

import React from "react";
import { Phone, Mail, Sparkles } from "lucide-react";

interface TopBarProps {
  onOpenOrders?: () => void;
  onOpenContact?: () => void;
}

export default function TopBar({ onOpenOrders, onOpenContact }: TopBarProps) {
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
            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 hover:text-white transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>support@enjoymart.com</span>
            </button>
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

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-gray-400">
          <button
            type="button"
            onClick={onOpenOrders}
            className="hover:text-white transition cursor-pointer"
          >
            Track Order
          </button>
          <span className="text-gray-700">|</span>
          <button
            type="button"
            onClick={onOpenContact}
            className="hover:text-white transition cursor-pointer"
          >
            Help Center
          </button>
        </div>
      </div>
    </div>
  );
}
