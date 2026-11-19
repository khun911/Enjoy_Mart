"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Flame, Clock, ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

const flashDeals = [
  {
    id: "deal-1",
    name: "Sony WH-1000XM5 Noise-Cancelling",
    category: "Electronics",
    originalPrice: 399,
    discountPrice: 249,
    discountPercent: 38,
    claimedPercent: 78,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-2",
    name: "Barista Touch Espresso Machine",
    category: "Home & Living",
    originalPrice: 349,
    discountPrice: 199,
    discountPercent: 43,
    claimedPercent: 85,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-3",
    name: "Classic Leather Biker Jacket",
    category: "Fashion",
    originalPrice: 269,
    discountPrice: 149,
    discountPercent: 45,
    claimedPercent: 62,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "deal-4",
    name: "Pro Wireless Gaming Controller",
    category: "Toys & Games",
    originalPrice: 99,
    discountPrice: 49,
    discountPercent: 50,
    claimedPercent: 92,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
  },
];

export default function DealsSection() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deals" className="w-full space-y-6 scroll-mt-24">
      {/* Banner Header with Timer */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Limited Time Flash Sale</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Crazy Daily Deals — Up to 50% Off!
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-md">
            Grab exclusive savings on top electronics, home appliances, and trending styles before stock runs out.
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
          <Clock className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-xs font-semibold mr-1">Ends in:</span>
          <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
            <span className="bg-white/20 px-2 py-1 rounded-lg">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded-lg">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded-lg text-amber-300">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>

      {/* Deals Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:border-pink-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Image Container with Badge */}
            <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden mb-3">
              <Image
                src={deal.image}
                alt={deal.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>-{deal.discountPercent}% OFF</span>
              </span>
            </div>

            {/* Info */}
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {deal.category}
              </span>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                {deal.name}
              </h3>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-black text-rose-600">
                  ${deal.discountPrice}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ${deal.originalPrice}
                </span>
              </div>

              {/* Claimed Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-gray-500">
                  <span>Claimed</span>
                  <span className="font-bold text-gray-800">
                    {deal.claimedPercent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${deal.claimedPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Add to Cart button */}
            <div className="pt-4 mt-2 border-t border-gray-50">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: deal.id,
                    name: deal.name,
                    price: deal.discountPrice,
                    image: deal.image,
                    category: deal.category,
                  })
                }
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Claim Deal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
