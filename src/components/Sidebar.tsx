"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
  BookOpen,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

export const categories = [
  { name: "Electronics", icon: Smartphone, href: "#category-electronics" },
  { name: "Fashion", icon: Shirt, href: "#category-fashion" },
  { name: "Home & Living", icon: Home, href: "#category-home" },
  { name: "Beauty & Personal Care", icon: Sparkles, href: "#category-beauty" },
  { name: "Sports & Outdoors", icon: Dumbbell, href: "#category-sports" },
  { name: "Toys & Games", icon: Gamepad2, href: "#category-toys" },
  { name: "Automotive", icon: Car, href: "#category-automotive" },
  { name: "Books & Stationery", icon: BookOpen, href: "#category-books" },
  { name: "Health & Wellness", icon: HeartPulse, href: "#category-health" },
];

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-x border-b border-gray-200/80 rounded-b-xl shadow-xs shrink-0 flex flex-col justify-between overflow-hidden">
      <ul className="divide-y divide-gray-100/80 py-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="flex items-center gap-3.5 px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <span className="font-normal truncate">{cat.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* View All Categories Link */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        <Link
          href="#categories"
          className="flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-blue-600 py-1.5 px-2 transition-colors group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </Link>
      </div>
    </aside>
  );
}
