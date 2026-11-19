"use client";

import React from "react";
import Image from "next/image";
import { X, Package, Truck, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { mockOrders, Order } from "@/data/orders";
import { useCart } from "@/context/CartContext";

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                My Orders
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Track your active shipments and view order history
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {mockOrders.map((order: Order) => (
            <div
              key={order.id}
              className="border border-gray-200/90 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white space-y-4"
            >
              {/* Order Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-gray-900 text-sm">
                    Order #{order.id}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {order.status === "Delivered" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Truck className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    )}
                    <span>{order.status}</span>
                  </span>

                  <span className="font-black text-sm text-gray-900 ml-2">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* In-Transit Banner */}
              {order.status === "In Transit" && (
                <div className="bg-blue-50/70 rounded-xl p-3 flex items-center justify-between text-xs text-blue-900">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      Estimated delivery:{" "}
                      <strong>{order.estimatedDelivery}</strong> via {order.carrier}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-blue-700 font-semibold bg-white px-2 py-0.5 rounded shadow-2xs">
                    {order.trackingNumber}
                  </span>
                </div>
              )}

              {/* Order Items */}
              <div className="divide-y divide-gray-50">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2.5 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg text-xs font-medium border border-gray-200 hover:border-blue-200 transition shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Buy Again</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Need help with an order? Contact 24/7 customer support.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
