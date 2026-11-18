"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const featuredProducts = [
  {
    id: "fp-1",
    name: "MacBook Air M3",
    category: "Electronics",
    description: "Powerful laptop with M3 chip and all-day battery life",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-2",
    name: "AirPods Pro",
    category: "Electronics",
    description: "Wireless earbuds with active noise cancellation",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-3",
    name: "Nike Air Max",
    category: "Fashion",
    description: "Comfortable running shoes with breathable design",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-4",
    name: "Leather Jacket",
    category: "Fashion",
    description: "Classic premium genuine leather jacket for all seasons",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-5",
    name: "Coffee Maker",
    category: "Home",
    description: "Automatic coffee maker with programmable timer",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-6",
    name: "Wireless Headphones",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-7",
    name: "Smart Watch",
    category: "Electronics",
    description: "Fitness tracker with heart rate and sleep monitor",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fp-8",
    name: "Mechanical Keyboard",
    category: "Electronics",
    description: "Custom mechanical keyboard with RGB backlighting",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
];

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Home"];
  const filteredProducts =
    activeFilter === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Curated collection of premium products
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Image Container */}
            <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
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
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all duration-200"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
