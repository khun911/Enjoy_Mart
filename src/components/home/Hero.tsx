"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    subtitle: "WELCOME TO ENJOY-MART",
    title: "Discover. Shop. Enjoy.",
    description:
      "Find the best products at the best prices. Fast delivery. Easy returns.",
    buttonText: "Shop Now",
    buttonHref: "#products",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Premium Headphones and Gadgets",
  },
  {
    subtitle: "NEW ARRIVALS 2026",
    title: "Next-Gen Tech & Gear.",
    description:
      "Upgrade your lifestyle with cutting-edge electronics and smart accessories.",
    buttonText: "Explore Now",
    buttonHref: "#products",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Smart Wearables",
  },
  {
    subtitle: "SPECIAL SEASON DEALS",
    title: "Up to 50% Off Top Brands.",
    description:
      "Limited-time discounts across premium tech, fashion, and home essentials.",
    buttonText: "Grab Deals",
    buttonHref: "#deals",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Designer Watches & Goods",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  // Dynamic translated texts for slide 0 (Main Hero)
  const currentSubtitle = activeSlide === 0 ? t("welcome") : slide.subtitle;
  const currentTitle = activeSlide === 0 ? t("heroTitle") : slide.title;
  const currentDescription = activeSlide === 0 ? t("heroSubtitle") : slide.description;
  const currentButtonText = activeSlide === 0 ? t("shopNow") : slide.buttonText;

  return (
    <div className="flex-1 bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/50 rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-blue-100/50 flex flex-col justify-between shadow-xs min-h-[380px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        {/* Left Column Text */}
        <div className="lg:col-span-7 flex flex-col items-start z-10 space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 uppercase">
            {currentSubtitle}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {currentTitle}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
            {currentDescription}
          </p>

          <div className="pt-2">
            <Link
              href={slide.buttonHref}
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.98]"
            >
              {currentButtonText}
            </Link>
          </div>
        </div>

        {/* Right Column Showcase Image */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[240px] sm:min-h-[280px]">
          <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex items-center justify-end gap-2 pt-4 lg:pt-0 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              activeSlide === idx
                ? "bg-blue-600 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
