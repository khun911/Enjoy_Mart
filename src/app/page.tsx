"use client";

import React, { useState } from "react";
// Layout Components
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import CategoryNav from "@/components/layout/CategoryNav";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import OrdersModal from "@/components/layout/OrdersModal";
import ContactModal from "@/components/layout/ContactModal";

// Home Page Section Components
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import DealsSection from "@/components/home/DealsSection";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellers from "@/components/home/BestSellers";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [activeNavTab, setActiveNavTab] = useState("Home");

  // Modals
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenOrders = () => {
    setActiveNavTab("Track Order");
    setIsOrdersModalOpen(true);
  };

  const handleOpenContact = () => {
    setActiveNavTab("Contact Us");
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Utility / Announcement TopBar */}
      <TopBar
        onOpenOrders={handleOpenOrders}
        onOpenContact={handleOpenContact}
      />

      {/* Main Navbar */}
      <Navbar />

      {/* Categories Navigation Bar with Live Interactive Responses */}
      <CategoryNav
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
        onOpenOrders={handleOpenOrders}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 sm:space-y-14">
        {/* Top Hero Row with Sidebar */}
        <section className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Left Category Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "block" : "hidden lg:hidden"
            }`}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Right Hero Banner */}
          <Hero />
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Daily Flash Deals Section (Anchored to 'Deals') */}
        <DealsSection />

        {/* Shop by Category */}
        <ShopByCategory />

        {/* Best Sellers Section (Anchored to 'Best Sellers') */}
        <BestSellers />

        {/* Featured Products / Shop Catalog (Anchored to 'Shop' & 'New Arrivals') */}
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => {
          setIsOrdersModalOpen(false);
          setActiveNavTab("Home");
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setActiveNavTab("Home");
        }}
      />
    </div>
  );
}
