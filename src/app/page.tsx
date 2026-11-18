"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CategoryNav from "@/components/CategoryNav";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ShopByCategory from "@/components/ShopByCategory";
import BestSellers from "@/components/BestSellers";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Categories Navigation Bar */}
      <CategoryNav
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 sm:space-y-12">
        {/* Top Hero Row with Sidebar */}
        <section className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left Category Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden lg:hidden"
            }`}
          >
            <Sidebar isOpen={isSidebarOpen} />
          </div>

          {/* Right Hero Banner */}
          <Hero />
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Shop by Category */}
        <ShopByCategory />

        {/* Best Sellers */}
        <BestSellers />

        {/* Featured Products */}
        <FeaturedProducts />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
