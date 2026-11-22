"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  Phone,
  CheckCircle2,
  Award,
} from "lucide-react";
import { sidebarCategories, SidebarCategoryData } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";

const catIdMap: Record<string, string> = {
  electronics: "electronics",
  fashion: "fashion",
  home: "homeLiving",
  beauty: "beauty",
  sports: "sports",
  toys: "toys",
  automotive: "automotive",
  books: "books",
  health: "health",
};

const categoryBrandPartners: Record<string, string[]> = {
  electronics: ["Apple", "Sony", "Samsung", "Dell", "Bose", "Anker"],
  fashion: ["Nike", "Zara", "Adidas", "Levi's", "Calvin Klein", "Uniqlo"],
  home: ["Dyson", "IKEA", "Nespresso", "Philips", "KitchenAid"],
  beauty: ["L'Oréal", "Estée Lauder", "Dior", "La Roche-Posay", "The Ordinary"],
  sports: ["Nike Pro", "Under Armour", "Garmin", "The North Face", "Shimano"],
  toys: ["LEGO", "Nintendo", "Sony PS5", "Hasbro", "Bandai"],
  automotive: ["Bosch", "Michelin", "Pioneer", "Meguiar's", "Garmin Auto"],
  books: ["Penguin", "Oxford", "HarperCollins", "Moleskine"],
  health: ["Omron", "GNC", "Nature Made", "Philips Sonicare"],
};

interface SidebarProps {
  isOpen?: boolean;
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export default function Sidebar({
  isOpen = true,
  selectedCategory = "electronics",
  onSelectCategory,
}: SidebarProps) {
  const { t } = useLanguage();
  const [internalActive, setInternalActive] = useState<string>(selectedCategory);
  const [hoveredCategory, setHoveredCategory] = useState<SidebarCategoryData | null>(null);

  const activeId = onSelectCategory ? selectedCategory : internalActive;

  const handleSelect = (catId: string) => {
    setInternalActive(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="relative h-full flex flex-col"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <aside className="w-64 bg-white border border-slate-200/90 rounded-2xl shadow-sm shrink-0 flex flex-col justify-between overflow-visible h-full">
        {/* Formal Department Directory Header */}
        <div className="p-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-t-2xl flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider uppercase block leading-none">
                Official Catalog
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                Store Directory
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
            9 Divisions
          </span>
        </div>

        {/* Categories List */}
        <ul className="divide-y divide-slate-100 py-1 flex-1 flex flex-col justify-between">
          {sidebarCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = activeId === cat.id;
            const deptCode = `DEP-${String(idx + 1).padStart(2, "0")}`;

            return (
              <li
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat)}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(cat.id)}
                  className={`w-full text-left flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer relative group ${
                    isSelected
                      ? "bg-blue-50/80 text-blue-700 font-bold"
                      : "text-slate-800 hover:text-blue-600 hover:bg-slate-50/90 font-medium"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <span className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 rounded-r-md" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="truncate leading-tight font-semibold">
                        {catIdMap[cat.id] ? t(catIdMap[cat.id]) : cat.name}
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {deptCode} • {cat.count.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                    {cat.badge && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          cat.badge === "Hot"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {cat.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${
                        isSelected
                          ? "text-blue-600 translate-x-0.5"
                          : "text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* View All Departments Link */}
        <div className="p-2.5 border-t border-slate-100 bg-slate-50/70">
          <Link
            href="#categories"
            className="flex items-center justify-between text-[11px] font-bold text-slate-700 hover:text-blue-600 py-1 px-2 rounded-lg hover:bg-white transition-all group"
          >
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>{t("viewAllCategories")}</span>
            </span>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
          </Link>
        </div>

        {/* Formal Enterprise & Concierge Services Dock */}
        <div className="p-3 bg-gradient-to-b from-slate-50 to-slate-100/90 border-t border-slate-200/80 rounded-b-2xl space-y-2 text-[10px] text-slate-600">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Genuine Certified Brands</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Corporate B2B & Tax Invoicing</span>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Concierge: +855 12 345 678</span>
          </div>
        </div>
      </aside>

      {/* Formal Flyout Mega Menu */}
      {hoveredCategory && (
        <div
          className="absolute left-full top-0 ml-3 w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5 p-6 z-50 flex flex-col justify-between animate-in fade-in slide-in-from-left-2 duration-150"
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <hoveredCategory.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {hoveredCategory.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Authorized Store
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium mt-0.5 block">
                  {hoveredCategory.count} • Official Manufacturer Warranty Included
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                handleSelect(hoveredCategory.id);
                setHoveredCategory(null);
                const el = document.getElementById("products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>View Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subcategory Grid */}
          <div className="grid grid-cols-2 gap-6 mb-5">
            {hoveredCategory.subgroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{group.title}</span>
                </h4>
                <ul className="space-y-1 pl-2">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        onClick={() => {
                          handleSelect(hoveredCategory.id);
                          setHoveredCategory(null);
                          const el = document.getElementById("products");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-xs text-slate-600 hover:text-blue-600 hover:translate-x-1 inline-block transition-all text-left cursor-pointer font-medium py-0.5"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Authorized Brand Partners Bar */}
          {categoryBrandPartners[hoveredCategory.id] && (
            <div className="pt-3 pb-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Official Brand Partners:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {categoryBrandPartners[hoveredCategory.id].map((brand) => (
                  <span
                    key={brand}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Featured Official Promo / Assurance Card */}
          {hoveredCategory.featuredPromo && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 flex items-center justify-between shadow-sm">
              <div className="relative z-10 max-w-[280px] space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-400/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{hoveredCategory.featuredPromo.discount}</span>
                </span>
                <h5 className="text-sm font-bold leading-snug">
                  {hoveredCategory.featuredPromo.title}
                </h5>
                <p className="text-[11px] text-slate-300">
                  {hoveredCategory.featuredPromo.description}
                </p>
              </div>

              <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-white/20 shadow-md">
                <Image
                  src={hoveredCategory.featuredPromo.image}
                  alt={hoveredCategory.featuredPromo.title}
                  fill
                  sizes="96px"
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
