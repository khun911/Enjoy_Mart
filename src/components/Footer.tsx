"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-20 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg">
                E
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                ENJOY<span className="text-blue-500">-MART</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your one-stop destination for premium electronics, trending
              fashion, home essentials, and lifestyle products. Discover quality
              and enjoyment in every purchase.
            </p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>123 Market Street, Tech City, CA 94103</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@enjoymart.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-blue-400 transition">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="#deals" className="hover:text-blue-400 transition">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link href="#best-sellers" className="hover:text-blue-400 transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="#new-arrivals" className="hover:text-blue-400 transition">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="#track" className="hover:text-blue-400 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="#returns" className="hover:text-blue-400 transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#shipping" className="hover:text-blue-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-blue-400 transition">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Newsletter
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Enjoy-Mart. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Enjoy-Mart Shoppers
          </p>
        </div>
      </div>
    </footer>
  );
}
