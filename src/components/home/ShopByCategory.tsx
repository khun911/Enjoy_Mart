"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { shopByCategoryCards } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";

const catKeyMap: Record<string, string> = {
  Electronics: "electronics",
  Fashion: "fashion",
  "Home & Living": "homeLiving",
  Beauty: "beauty",
  Sports: "sports",
  "Toys & Games": "toys",
  Automotive: "automotive",
  Books: "books",
};

export default function ShopByCategory() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("shopByCategory")}
        </h2>
        <Link
          href="#categories"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {shopByCategoryCards.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all duration-200 shrink-0 w-32 sm:w-36 group/card"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-1 group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center truncate w-full group-hover/card:text-blue-600 transition-colors">
                {catKeyMap[cat.name] ? t(catKeyMap[cat.name]) : cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Next Scroll Arrow Button */}
        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer hidden sm:flex"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
