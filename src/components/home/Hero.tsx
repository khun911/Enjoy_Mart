"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Zap,
  Lock,
  Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    subtitle: "OFFICIAL FLAGSHIP STORE • EST. 2026",
    title: "Discover Authentic Living & Modern Tech.",
    description:
      "Direct authorized partner for global brands. Every order is backed by genuine manufacturer warranty and tracked priority dispatch.",
    buttonText: "Explore Official Catalog",
    buttonHref: "#products",
    badge: "100% Certified Genuine",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Premium Headphones and Gadgets",
  },
  {
    subtitle: "INNOVATION & AUDIO • SPRING 2026",
    title: "Next-Gen Electronics & Smart Devices.",
    description:
      "Upgrade your workspace and mobile life with flagship acoustics, ultra-fast charging, and certified smart gear.",
    buttonText: "Browse Tech Division",
    buttonHref: "#products",
    badge: "New Release",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Smart Wearables",
  },
  {
    subtitle: "EXCLUSIVE VIP PROMOTIONS",
    title: "Up to 50% Off Verified Top Brands.",
    description:
      "Limited-allocation store discounts across high-performance laptops, designer apparel, and formal home luxury.",
    buttonText: "Access VIP Deals",
    buttonHref: "#deals",
    badge: "Limited Allocation",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Designer Watches & Goods",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-slate-700/80 shadow-md flex flex-col justify-between h-full min-h-[480px]">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Top Credentials Ribbon */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/50 mb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Official Flagship Store
          </span>
          <span className="text-[11px] text-slate-300 hidden sm:inline-block">
            Authorized Global Distributor • ISO 9001 Assured
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            4.9 / 5.0 (18,400+ Client Ratings)
          </span>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full relative z-10">
        {/* Left Column Text */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] font-black tracking-widest text-amber-300 uppercase bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
              {slide.subtitle}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {slide.badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {activeSlide === 0 ? t("heroTitle") : slide.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            {activeSlide === 0 ? t("heroSubtitle") : slide.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={slide.buttonHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>{activeSlide === 0 ? t("shopNow") : slide.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="#deals"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Warranty Info</span>
            </Link>
          </div>
        </div>

        {/* Right Column Showcase Image Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Elegant vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* In-Image Certification Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 text-xs text-white">
              <span className="font-bold text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Authentic Item
              </span>
              <span className="text-[10px] text-slate-300 font-mono">
                CODE: #EM-FLAGSHIP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Formal Metrics & Slide Pagination */}
      <div className="relative z-10 pt-6 mt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Verified Highlights */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Same-Day Priority Dispatch
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            2-Year Global Warranty
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            PCI-DSS Level 1 Encrypted
          </span>
        </div>

        {/* Slide Counter & Arrow Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">
            0{activeSlide + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
