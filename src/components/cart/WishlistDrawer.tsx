"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } =
    useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (item: (typeof wishlist)[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    removeFromWishlist(item.id);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      });
    });
    clearWishlist();
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const totalValue = wishlist.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Your Wishlist</h2>
              <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-gray-800">
                  Your wishlist is empty
                </h3>
                <p className="text-sm mt-1 text-gray-500">
                  Click the heart icon on any product to save your favorite items here.
                </p>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition cursor-pointer"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3.5 bg-gray-50/80 border border-gray-100 rounded-2xl hover:border-rose-200 transition group"
                >
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                      {item.category || "Popular"}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <div className="text-sm font-black text-gray-900 mt-1">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1 text-gray-400 hover:text-rose-600 transition cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveToCart(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer active:scale-95"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                <span>Total Wishlist Value</span>
                <span className="text-base text-rose-600 font-black">
                  ${totalValue.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Move All to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={clearWishlist}
                className="w-full py-1.5 text-xs text-gray-400 hover:text-red-500 font-medium transition cursor-pointer text-center"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
