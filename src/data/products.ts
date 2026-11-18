import { Product } from "@/types";

export const bestSellerProducts: Product[] = [
  {
    id: "bs-1",
    name: "Wireless Earbuds",
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
    name: "Smart Watch",
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
    name: "Laptop Backpack",
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
    name: "Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 64,
    price: 59.99,
    category: "Sports",
    isBestSeller: true,
  },
  {
    id: "bs-5",
    name: "Digital Camera",
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
  {
    id: "fp-1",
    name: "MacBook Air M3",
    category: "Electronics",
    description: "Powerful laptop with M3 chip and all-day battery life",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-2",
    name: "AirPods Pro",
    category: "Electronics",
    description: "Wireless earbuds with active noise cancellation",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-3",
    name: "Nike Air Max",
    category: "Fashion",
    description: "Comfortable running shoes with breathable design",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-4",
    name: "Leather Jacket",
    category: "Fashion",
    description: "Classic premium genuine leather jacket for all seasons",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-5",
    name: "Coffee Maker",
    category: "Home",
    description: "Automatic coffee maker with programmable timer",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-6",
    name: "Wireless Headphones",
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    price: 179,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-7",
    name: "Smart Watch",
    category: "Electronics",
    description: "Fitness tracker with heart rate and sleep monitor",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
  {
    id: "fp-8",
    name: "Mechanical Keyboard",
    category: "Electronics",
    description: "Custom mechanical keyboard with RGB backlighting",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    isFeatured: true,
  },
];

export const allSearchableProducts: Product[] = [
  ...featuredProducts,
  ...bestSellerProducts,
];
