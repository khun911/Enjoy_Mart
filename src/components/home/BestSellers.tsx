"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { useIsClient } from "@/hooks/useIsClient";
import { bestSellerProducts } from "@/data/products";

export default function BestSellers() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isClient = useIsClient();

  return (
    <section id="best-sellers" className="w-full space-y-4 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("bestSellersTitle")}
        </h2>
        <Link
          href="#products"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          {t("viewAll")}
        </Link>
      </div>

      {/* Grid of Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {bestSellerProducts.map((product) => {
          const isFavorited = isClient ? isInWishlist(product.id) : false;

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-200 group relative"
            >
              {/* Floating Heart Button */}
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
                className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                  isFavorited
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 text-gray-400 hover:text-rose-500 hover:scale-110"
                }`}
                aria-label="Save to wishlist"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isFavorited ? "fill-white" : ""}`}
                />
              </button>

              {/* Image */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(product.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    ({product.reviews || 0})
                  </span>
                </div>
              </div>

              {/* Price & Cart Button */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-50">
                <span className="text-base font-bold text-gray-900">
                  ${product.price.toFixed(2)}
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
                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200 shadow-xs active:scale-95 cursor-pointer"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
