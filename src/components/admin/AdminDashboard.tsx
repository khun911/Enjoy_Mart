"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Users,
  FileText,
  Truck,
  MapPin,
  BarChart3,
  DollarSign,
  UserCheck,
  Search,
  Bell,
  Filter,
  ChevronDown,
  Edit3,
  Plus,
  ArrowLeft,
  X,
  Menu,
  Trash2,
  Save,
} from "lucide-react";

// Inventory Item interface matching template
export interface InventoryProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  units: number;
  status: "In Stock" | "Low Stock" | "Out of stock";
  image?: string;
  price?: number;
}

const defaultProducts: InventoryProduct[] = [
  {
    id: "prod-1",
    name: "Wireless Headphones",
    sku: "HP-401",
    category: "Electronics",
    location: "Warehouse A",
    units: 1245,
    status: "Low Stock",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-2",
    name: "Women's Pleated Dress",
    sku: "HB-552",
    category: "Apparel",
    location: "Warehouse B",
    units: 346,
    status: "In Stock",
    price: 119.0,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-3",
    name: "Leather Handbag",
    sku: "WD-218",
    category: "Accessories",
    location: "Warehouse C",
    units: 102,
    status: "Out of stock",
    price: 149.0,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-4",
    name: "Graphic Sweatshirt",
    sku: "SW-309",
    category: "Apparel",
    location: "Warehouse D",
    units: 246,
    status: "In Stock",
    price: 59.0,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-5",
    name: "Kids Party Dress",
    sku: "KD-114",
    category: "Apparel",
    location: "Warehouse E",
    units: 708,
    status: "Low Stock",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-6",
    name: "Classic Leather Biker Jacket",
    sku: "JK-902",
    category: "Apparel",
    location: "Warehouse A",
    units: 48,
    status: "In Stock",
    price: 199.0,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-7",
    name: "Titanium Smart Watch Ultra",
    sku: "SW-880",
    category: "Electronics",
    location: "Warehouse B",
    units: 15,
    status: "Low Stock",
    price: 299.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "prod-8",
    name: "Espresso Artisan Coffee Maker",
    sku: "CF-104",
    category: "Home & Kitchen",
    location: "Warehouse C",
    units: 0,
    status: "Out of stock",
    price: 129.0,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=150&q=80",
  },
];

// Cash flow 12-month data
const cashFlowMonths = [
  { month: "Jan", income: 14200, expense: 4100, heightIncome: 45, heightExpense: 15 },
  { month: "Feb", income: 18500, expense: 5200, heightIncome: 55, heightExpense: 18 },
  { month: "Mar", income: 21000, expense: 6100, heightIncome: 65, heightExpense: 22 },
  { month: "Apr", income: 12900, expense: 3900, heightIncome: 42, heightExpense: 14 },
  { month: "May", income: 26000, expense: 7800, heightIncome: 80, heightExpense: 26 },
  { month: "Jun", income: 9800, expense: 3100, heightIncome: 30, heightExpense: 12 },
  { month: "Jul", income: 24400, expense: 3467, heightIncome: 75, heightExpense: 18, isFeatured: true },
  { month: "Aug", income: 16500, expense: 4800, heightIncome: 50, heightExpense: 17 },
  { month: "Sep", income: 15200, expense: 4200, heightIncome: 46, heightExpense: 15 },
  { month: "Oct", income: 13900, expense: 3800, heightIncome: 43, heightExpense: 14 },
  { month: "Nov", income: 20100, expense: 5900, heightIncome: 62, heightExpense: 20 },
  { month: "Dec", income: 19800, expense: 5400, heightIncome: 60, heightExpense: 19 },
];

interface AdminDashboardProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function AdminDashboard({ onClose, isModal = false }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [products, setProducts] = useState<InventoryProduct[]>(defaultProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(cashFlowMonths[6]); // July default
  const [cashFlowPeriod, setCashFlowPeriod] = useState("Monthly");

  // Edit / Add Product State
  const [editingProduct, setEditingProduct] = useState<InventoryProduct | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<InventoryProduct>>({
    name: "",
    sku: "",
    category: "Electronics",
    location: "Warehouse A",
    units: 100,
    status: "In Stock",
    price: 99,
  });

  // Filtered Inventory list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProducts((prev) =>
      prev.map((item) => (item.id === editingProduct.id ? editingProduct : item))
    );
    setEditingProduct(null);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku) return;

    const item: InventoryProduct = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      sku: newProduct.sku.toUpperCase(),
      category: newProduct.category || "General",
      location: newProduct.location || "Warehouse A",
      units: Number(newProduct.units) || 0,
      status:
        Number(newProduct.units) === 0
          ? "Out of stock"
          : Number(newProduct.units) < 50
          ? "Low Stock"
          : "In Stock",
      price: Number(newProduct.price) || 50,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=150&q=80",
    };

    setProducts([item, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      category: "Electronics",
      location: "Warehouse A",
      units: 100,
      status: "In Stock",
      price: 99,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingProduct?.id === id) setEditingProduct(null);
  };

  return (
    <div className={`flex min-h-screen bg-[#f3f4f8] text-slate-800 antialiased font-sans ${isModal ? "p-0 rounded-3xl overflow-hidden" : ""}`}>
      {/* 1. LEFT SIDEBAR NAVIGATION (Matching Template) */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Purple/Blue Gradient Folded Cube Icon */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25">
                <div className="w-4 h-4 border-2 border-white/90 rotate-45 rounded-xs" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none block">
                  Invento
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Enjoy-Mart ERP
                </span>
              </div>
            </Link>

            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition"
              aria-label="Collapse menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-sm font-semibold">
            {[
              { name: "Dashboard", icon: LayoutDashboard },
              { name: "Inventory", icon: Package },
              { name: "Warehouses", icon: Warehouse },
              { name: "Suppliers", icon: Users },
              { name: "Purchase Orders", icon: FileText },
              { name: "Shipments", icon: Truck },
              { name: "Tracking", icon: MapPin },
              { name: "Reports", icon: BarChart3 },
              { name: "Cash Flow", icon: DollarSign },
              { name: "Customers", icon: UserCheck },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-bold shadow-2xs"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Admin User Profile Card */}
        <div className="p-4 border-t border-slate-100">
          <div className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center justify-between transition cursor-pointer border border-slate-200/60">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-300">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Rakib Kowshar</div>
                <span className="text-[10px] text-slate-400 font-medium">Admin</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Welcome Greeting */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Hey Rakib</span>
              <span className="text-2xl">👋</span>
              <span className="font-semibold text-slate-700">, welcome back!</span>
            </h1>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block w-64 lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products / SKU..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Return to storefront / close */}
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Portal</span>
              </button>
            ) : (
              <Link
                href="/"
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </Link>
            )}
          </div>
        </header>

        {/* Dashboard Body Container */}
        <div className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* =========================================================================
             ROW 1: 4 TOP KPI CARDS (Matching Template)
             ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Total Products */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Total Products</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-200">
                  +8.4%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {products.length + 13276}
              </div>
            </div>

            {/* Card 2: In Stock */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>In Stock</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] border border-emerald-200">
                  +3.2%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                1,102
              </div>
            </div>

            {/* Card 3: Low Stock */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Low Stock</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 font-bold text-[10px] border border-rose-200">
                  -2.8%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                2,496
              </div>
            </div>

            {/* Card 4: Out of Stock */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Out of Stock</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 font-bold text-[10px] border border-rose-200">
                  -1.6%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                345
              </div>
            </div>
          </div>

          {/* =========================================================================
             ROW 2: CASH FLOW BAR CHART & INVENTORY ALERTS DONUT CHART
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Cash Flow Interactive Bar Chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-extrabold text-slate-900">Cash Flow</h3>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8]" />
                    <span>Income</span>
                  </div>

                  {/* Period Selector Dropdown */}
                  <select
                    value={cashFlowPeriod}
                    onChange={(e) => setCashFlowPeriod(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 py-1 px-2.5 rounded-lg text-xs font-bold cursor-pointer focus:outline-none"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Bar Chart Canvas with Tooltip */}
              <div className="relative pt-6">
                {/* Floating Tooltip Box matching July in template */}
                <div
                  className="absolute z-20 pointer-events-none bg-slate-900/90 text-white rounded-xl p-2.5 shadow-xl text-[11px] font-semibold space-y-1 transition-all duration-200"
                  style={{ left: "54%", top: "-10px" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#818cf8]" />
                    <span>Income: <strong>${selectedMonth.income.toLocaleString()}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                    <span>Expense: <strong>${selectedMonth.expense.toLocaleString()}</strong></span>
                  </div>
                </div>

                {/* Horizontal dotted guide lines */}
                <div className="space-y-8 absolute inset-x-0 top-10 pointer-events-none opacity-30">
                  <div className="border-b border-dashed border-slate-300" />
                  <div className="border-b border-dashed border-slate-300" />
                  <div className="border-b border-dashed border-slate-300" />
                </div>

                {/* Bars Row (Jan to Dec) */}
                <div className="h-52 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-2 relative z-10">
                  {cashFlowMonths.map((item) => {
                    const isSelected = selectedMonth.month === item.month;

                    return (
                      <div
                        key={item.month}
                        onClick={() => setSelectedMonth(item)}
                        className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                      >
                        {/* Stacked Bar Container */}
                        <div className="w-full max-w-[28px] flex flex-col justify-end items-center rounded-t-md overflow-hidden transition-all duration-200 group-hover:scale-105">
                          {/* Expense Top Cap */}
                          <div
                            className={`w-full transition-colors ${
                              isSelected ? "bg-[#f43f5e]" : "bg-slate-200 group-hover:bg-[#f43f5e]/80"
                            }`}
                            style={{ height: `${item.heightExpense}px` }}
                          />
                          {/* Income Body */}
                          <div
                            className={`w-full transition-colors ${
                              isSelected ? "bg-[#818cf8]" : "bg-slate-200 group-hover:bg-[#818cf8]/80"
                            }`}
                            style={{ height: `${item.heightIncome}px` }}
                          />
                        </div>

                        {/* Month Label */}
                        <span
                          className={`text-[10px] mt-2 font-bold transition-colors ${
                            isSelected ? "text-purple-600" : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Inventory Alerts Donut Chart */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <h3 className="text-base font-extrabold text-slate-900 mb-2">Inventory Alerts</h3>

              {/* Donut Graphic */}
              <div className="relative flex items-center justify-center my-4">
                <svg viewBox="0 0 100 100" className="w-44 h-44 -rotate-90">
                  {/* In Stock (73%): Green stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#22c55e"
                    strokeWidth="14"
                    strokeDasharray="174 238"
                    strokeDashoffset="0"
                  />
                  {/* Low Stock (19%): Coral stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#fb7185"
                    strokeWidth="14"
                    strokeDasharray="45 238"
                    strokeDashoffset="-176"
                  />
                  {/* Out of Stock (8%): Gray stroke */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#94a3b8"
                    strokeWidth="14"
                    strokeDasharray="19 238"
                    strokeDashoffset="-223"
                  />
                </svg>

                {/* Percentage Labels Inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-xs font-black text-emerald-600">73%</span>
                  <span className="text-[9px] font-bold text-slate-400">Optimal</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In Stock</span>
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">2,880</div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>Low Stock</span>
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">510</div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Out of Stock</span>
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">374</div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
             ROW 3: PRODUCT INVENTORY TABLE (Matching Template)
             ========================================================================= */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-extrabold text-slate-900">Product Inventory</h3>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {filteredProducts.length} Items
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span>Filter: {statusFilter}</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-40 space-y-1 text-xs">
                      {["All", "In Stock", "Low Stock", "Out of stock"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg font-semibold transition ${
                            statusFilter === status
                              ? "bg-purple-50 text-purple-700 font-bold"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Product Button */}
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Name ↕</th>
                    <th className="px-6 py-3.5">SKU ↕</th>
                    <th className="px-6 py-3.5">Category ↕</th>
                    <th className="px-6 py-3.5">Location ↕</th>
                    <th className="px-6 py-3.5">Units ↕</th>
                    <th className="px-6 py-3.5">Status ↕</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/60 transition group">
                      {/* Name with Image Thumbnail */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {prod.image ? (
                            <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-[10px]">
                              {prod.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-slate-900 text-xs truncate max-w-[180px]">
                          {prod.name}
                        </span>
                      </td>

                      {/* SKU */}
                      <td className="px-6 py-4 font-mono font-bold text-slate-600">
                        {prod.sku}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-slate-600 font-semibold">
                        {prod.category}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4 text-slate-600 font-semibold">
                        {prod.location}
                      </td>

                      {/* Units */}
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {prod.units.toLocaleString()}
                      </td>

                      {/* Status Pill */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            prod.status === "In Stock"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : prod.status === "Low Stock"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-600 border border-rose-200"
                          }`}
                        >
                          {prod.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
              <button
                type="button"
                onClick={() => setStatusFilter("All")}
                className="font-bold text-purple-600 hover:text-purple-700 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
         EDIT PRODUCT MODAL
         ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-extrabold text-slate-900">Edit Inventory Item</h4>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.units}
                    onChange={(e) => {
                      const units = Number(e.target.value);
                      const status = units === 0 ? "Out of stock" : units < 50 ? "Low Stock" : "In Stock";
                      setEditingProduct({ ...editingProduct, units, status });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Location</label>
                  <select
                    value={editingProduct.location}
                    onChange={(e) => setEditingProduct({ ...editingProduct, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                    <option value="Warehouse D">Warehouse D</option>
                    <option value="Warehouse E">Warehouse E</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Status</label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as InventoryProduct["status"] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of stock">Out of stock</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
         ADD NEW PRODUCT MODAL
         ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-extrabold text-slate-900">Add New Inventory Product</h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Wireless Noise Canceling Headphones"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="e.g. HP-990"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 placeholder:text-slate-400 uppercase focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Initial Units</label>
                  <input
                    type="number"
                    required
                    value={newProduct.units}
                    onChange={(e) => setNewProduct({ ...newProduct, units: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Warehouse Location</label>
                  <select
                    value={newProduct.location}
                    onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                    <option value="Warehouse D">Warehouse D</option>
                    <option value="Warehouse E">Warehouse E</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
