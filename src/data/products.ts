import { Product } from "@/types";

export const bestSellerProducts: Product[] = [
  {
    id: "bs-1",
    name: "Wireless Earbuds Pro",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 128,
    price: 29.99,
    category: "Electronics",
    isBestSeller: true,
  },
  {
    id: "bs-2",
    name: "Smart Fitness Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 96,
    price: 49.99,
    category: "Electronics",
    isBestSeller: true,
  },
  {
    id: "bs-3",
    name: "Laptop Travel Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 78,
    price: 39.99,
    category: "Fashion",
    isBestSeller: true,
  },
  {
    id: "bs-4",
    name: "Air Cushion Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 64,
    price: 59.99,
    category: "Sports & Outdoors",
    isBestSeller: true,
  },
  {
    id: "bs-5",
    name: "4K Digital Mirrorless Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 112,
    price: 199.99,
    category: "Electronics",
    isBestSeller: true,
  },
];

export const featuredProducts: Product[] = [
  // Electronics
  {
    id: "fp-1",
    name: "MacBook Air M3 15-inch",
    category: "Electronics",
    description: "Powerful laptop with M3 chip, Liquid Retina display and 18-hour battery",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-2",
    name: "AirPods Pro 2nd Gen",
    category: "Electronics",
    description: "Wireless earbuds with active noise cancellation and spatial audio",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-3",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    description: "Industry leading noise-cancelling headphones with crystal clear hands-free calling",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-4",
    name: "Apple Watch Series 9",
    category: "Electronics",
    description: "Smarter, brighter display with advanced health sensors and ECG",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Fashion
  {
    id: "fp-5",
    name: "Nike Air Max 270",
    category: "Fashion",
    description: "Iconic lifestyle sneakers engineered for all-day comfort and breathability",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-6",
    name: "Classic Leather Biker Jacket",
    category: "Fashion",
    description: "Handcrafted genuine leather jacket with asymmetric zip and quilted lining",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-7",
    name: "Oversized Fleece Pullover Hoodie",
    category: "Fashion",
    description: "Heavyweight premium cotton fleece hoodie with kangaroo pocket",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Home & Living
  {
    id: "fp-8",
    name: "Barista Touch Espresso Machine",
    category: "Home & Living",
    description: "Automated touchscreen espresso maker with built-in conical grinder",
    price: 289,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-9",
    name: "Modern Scandinavian Sofa",
    category: "Home & Living",
    description: "Minimalist 3-seater sofa with high density foam and solid wood legs",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Beauty & Personal Care
  {
    id: "fp-10",
    name: "Hydrating Vitamin C Radiance Serum",
    category: "Beauty & Personal Care",
    description: "Brightening antioxidant serum with pure hyaluronic acid and ferulic acid",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Sports & Outdoors
  {
    id: "fp-11",
    name: "Adjustable Quick-Select Dumbbell Set",
    category: "Sports & Outdoors",
    description: "Rapid weight adjustment from 5 to 52.5 lbs for full home workout routines",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Toys & Games
  {
    id: "fp-12",
    name: "Pro Wireless Gaming Controller",
    category: "Toys & Games",
    description: "Zero-latency wireless gamepad with programmable back paddles and RGB",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Automotive
  {
    id: "fp-13",
    name: "Ultra HD 4K Dual Dash Cam",
    category: "Automotive",
    description: "Front & rear night vision recording with built-in GPS and Wi-Fi transfer",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Books & Stationery
  {
    id: "fp-14",
    name: "Vintage Refillable Leather Journal",
    category: "Books & Stationery",
    description: "Genuine rustic leather binding with premium bleed-proof unlined paper",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },

  // Health & Wellness
  {
    id: "fp-15",
    name: "Deep Tissue Percussion Massage Gun",
    category: "Health & Wellness",
    description: "Quiet glide motor with 6 interchangeable heads for post-workout muscle recovery",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
];

export const allSearchableProducts: Product[] = [
  ...featuredProducts,
  ...bestSellerProducts,
];
