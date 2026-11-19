"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { mockOrders } from "@/data/orders";
import { ClientFeedback } from "@/types";

interface ClientFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientEmail: string;
  onAddFeedback: (feedback: ClientFeedback) => void;
}

let feedbackCounter = 100;
function createNewFeedbackId(): string {
  feedbackCounter += 1;
  return `fb-${feedbackCounter}`;
}

export default function ClientFeedbackModal({
  isOpen,
  onClose,
  clientName,
  clientEmail,
  onAddFeedback,
}: ClientFeedbackModalProps) {
  // Extract all products from client's mock orders
  const orderedProducts = mockOrders.flatMap((order) =>
    order.items.map((item) => ({
      orderId: order.id,
      product: item,
    }))
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentSelection = orderedProducts[selectedItemIndex] || orderedProducts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFeedback: ClientFeedback = {
      id: createNewFeedbackId(),
      clientName: clientName || "khun911",
      clientEmail: clientEmail || "khun911@users.noreply.github.com",
      orderId: currentSelection.orderId,
      productId: currentSelection.product.id,
      productName: currentSelection.product.name,
      productImage: currentSelection.product.image,
      rating,
      comment,
      date: "Just now",
      verifiedPurchase: true,
      status: "Published",
    };

    onAddFeedback(newFeedback);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setComment("");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">
                Review Your Ordered Products
              </h2>
              <p className="text-xs text-amber-100 mt-0.5">
                Share your verified customer feedback with Enjoy-Mart
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">
                Feedback Submitted!
              </h3>
              <p className="text-xs text-emerald-700">
                Your feedback has been recorded and is now viewable by the store manager.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Selector from Orders */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Select Product from Your Orders:
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                  {orderedProducts.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedItemIndex(idx)}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                        selectedItemIndex === idx
                          ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-600"
                          : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                      }`}
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-gray-900 truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-2">
                          <span>Order #{item.orderId}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Star Rating Interactive Input */}
              <div className="space-y-1 text-center py-2 bg-gray-50/80 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-700">
                  Your Overall Rating:
                </span>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(rating)}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 stroke-amber-400"
                            : "stroke-gray-300 text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-amber-600">
                  {rating === 5 && "⭐ Outstanding experience!"}
                  {rating === 4 && "👍 Very good product"}
                  {rating === 3 && "👌 Average / Acceptable"}
                  {rating === 2 && "👎 Below expectations"}
                  {rating === 1 && "⚠️ Poor quality"}
                </span>
              </div>

              {/* Feedback text */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">
                  Your Review & Comments:
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like about this product? How was the delivery and packaging?"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback to Website Manager</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
