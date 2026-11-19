"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { featuredProducts } from "@/data/products";

const categoryMap: Record<string, string> = {
  electronics: "Electronics",
  fashion: "Fashion",
  home: "Home & Living",
  beauty: "Beauty & Personal Care",
  sports: "Sports & Outdoors",
  toys: "Toys & Games",
  automotive: "Automotive",
  books: "Books & Stationery",
  health: "Health & Wellness",
};

interface FeaturedProductsProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function FeaturedProducts({
  selectedCategory = "electronics",
  onSelectCategory,
}: FeaturedProductsProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [userFilter, setUserFilter] = useState<string | null>(null);

  // Derive active filter cleanly without useEffect
  const activeFilter =
    userFilter !== null
      ? userFilter
      : categoryMap[selectedCategory] || "All";

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Automotive",
    "Books & Stationery",
    "Health & Wellness",
  ];

  const handleFilterClick = (cat: string) => {
    setUserFilter(cat);
    if (onSelectCategory) {
      const foundEntry = Object.entries(categoryMap).find(
        ([, val]) => val === cat
      );
      if (foundEntry) {
        onSelectCategory(foundEntry[0]);
      }
    }
  };

  const filteredProducts =
    activeFilter === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="w-full space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {t("featuredProductsTitle")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Curated collection of premium products {activeFilter !== "All" && `in ${activeFilter}`}
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterClick(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
          {activeFilter !== "All" && !categories.slice(0, 5).includes(activeFilter) && (
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs whitespace-nowrap"
            >
              {activeFilter}
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isFavorited = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative"
            >
              {/* Image Container with Floating Wishlist Heart */}
              <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist Heart Toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      rating: product.rating || 5,
                    });
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer ${
                    isFavorited
                      ? "bg-rose-500 text-white scale-110"
                      : "bg-white/90 text-gray-400 hover:text-rose-500 hover:scale-110 backdrop-blur-xs"
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorited ? "fill-white" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xl font-black text-gray-900">
                    ${product.price}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t("addToCart")}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
