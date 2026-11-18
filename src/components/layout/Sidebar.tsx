"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { sidebarCategories, SidebarCategoryData } from "@/data/categories";

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<string>("electronics");
  const [hoveredCategory, setHoveredCategory] = useState<SidebarCategoryData | null>(null);

  if (!isOpen) return null;

  return (
    <div
      className="relative"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <aside className="w-64 bg-white border-x border-b border-gray-200/80 rounded-b-xl shadow-xs shrink-0 flex flex-col justify-between overflow-visible">
        <ul className="divide-y divide-gray-100/80 py-1">
          {sidebarCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            const isHovered = hoveredCategory?.id === cat.id;

            return (
              <li
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat)}
                className="relative"
              >
                <Link
                  href={cat.href}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-colors group ${
                    isSelected || isHovered
                      ? "bg-blue-50/80 text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isSelected || isHovered
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-blue-600"
                      }`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {cat.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          cat.badge === "Hot"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {cat.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isHovered
                          ? "text-blue-600 translate-x-0.5"
                          : "text-gray-300 opacity-60"
                      }`}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* View All Categories Link */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50">
          <Link
            href="#categories"
            className="flex items-center justify-between text-xs font-semibold text-gray-700 hover:text-blue-600 py-1.5 px-2 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
          </Link>
        </div>
      </aside>

      {/* Rich Flyout Mega Menu */}
      {hoveredCategory && (
        <div
          className="absolute left-full top-0 ml-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 flex flex-col justify-between animate-in fade-in slide-in-from-left-2 duration-150"
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <hoveredCategory.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  {hoveredCategory.name}
                </h3>
                <span className="text-xs text-gray-400 font-medium">
                  {hoveredCategory.count}
                </span>
              </div>
            </div>

            <Link
              href={hoveredCategory.href}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Subcategory Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {hoveredCategory.subgroups.map((group, idx) => (
              <div key={idx} className="space-y-2.5">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{group.title}</span>
                </h4>
                <ul className="space-y-1.5 pl-3">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={`#category-${hoveredCategory.id}`}
                        className="text-xs text-gray-600 hover:text-blue-600 hover:translate-x-1 inline-block transition-all"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Promo Card Banner */}
          {hoveredCategory.featuredPromo && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between">
              <div className="relative z-10 max-w-[260px] space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{hoveredCategory.featuredPromo.discount}</span>
                </span>
                <h5 className="text-sm font-bold leading-snug">
                  {hoveredCategory.featuredPromo.title}
                </h5>
                <p className="text-[11px] text-blue-200">
                  {hoveredCategory.featuredPromo.description}
                </p>
              </div>

              <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-md">
                <Image
                  src={hoveredCategory.featuredPromo.image}
                  alt={hoveredCategory.featuredPromo.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
