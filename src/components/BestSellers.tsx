"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const bestSellers = [
  {
    id: "bs-1",
    name: "Wireless Earbuds",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 128,
    price: 29.99,
    category: "Electronics",
  },
  {
    id: "bs-2",
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 96,
    price: 49.99,
    category: "Electronics",
  },
  {
    id: "bs-3",
    name: "Laptop Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 78,
    price: 39.99,
    category: "Fashion",
  },
  {
    id: "bs-4",
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 64,
    price: 59.99,
    category: "Sports",
  },
  {
    id: "bs-5",
    name: "Digital Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 112,
    price: 199.99,
    category: "Electronics",
  },
];

export default function BestSellers() {
  const { addToCart } = useCart();

  return (
    <section id="best-sellers" className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Best Sellers
        </h2>
        <Link
          href="#products"
          className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          View All
        </Link>
      </div>

      {/* Grid of Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
          >
            {/* Image */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
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
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Price & Cart Button */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-50">
              <span className="text-base font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                  })
                }
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200 shadow-2xs active:scale-95"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
