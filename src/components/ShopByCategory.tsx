"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const categoryCards = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80",
    href: "#category-electronics",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80",
    href: "#category-fashion",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    href: "#category-home",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    href: "#category-beauty",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    href: "#category-sports",
  },
  {
    name: "Toys & Games",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=400&q=80",
    href: "#category-toys",
  },
  {
    name: "Automotive",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80",
    href: "#category-automotive",
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    href: "#category-books",
  },
];

export default function ShopByCategory() {
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
          Shop by Category
        </h2>
        <Link
          href="#categories"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          View All
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {categoryCards.map((cat) => (
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
              <span className="text-xs font-semibold text-gray-800 group-hover/card:text-blue-600 transition-colors text-center truncate w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right arrow button */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
