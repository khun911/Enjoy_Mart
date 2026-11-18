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
  LucideIcon,
} from "lucide-react";

export interface SubCategoryGroup {
  title: string;
  items: string[];
}

export interface SidebarCategoryData {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  count: string;
  badge?: string;
  subgroups: SubCategoryGroup[];
  featuredPromo?: {
    title: string;
    description: string;
    discount: string;
    image: string;
  };
}

export const sidebarCategories: SidebarCategoryData[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    href: "#category-electronics",
    count: "1,420+ items",
    badge: "Hot",
    subgroups: [
      {
        title: "Phones & Tablets",
        items: ["Smartphones", "iPads & Tablets", "Phone Cases", "Fast Chargers", "Power Banks"],
      },
      {
        title: "Computers & Laptops",
        items: ["MacBooks", "Gaming Laptops", "Monitors & Screens", "Mechanical Keyboards", "Wireless Mice"],
      },
      {
        title: "Audio & Wearables",
        items: ["Wireless Earbuds", "Noise Cancelling Headphones", "Smart Watches", "Bluetooth Speakers"],
      },
    ],
    featuredPromo: {
      title: "Apple Ecosystem Deal",
      description: "Save up to $200 on MacBook & AirPods bundle",
      discount: "UP TO 30% OFF",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: Shirt,
    href: "#category-fashion",
    count: "2,350+ items",
    badge: "Sale",
    subgroups: [
      {
        title: "Men's Apparel",
        items: ["Hoodies & Sweatshirts", "Casual T-Shirts", "Denim Jackets", "Jeans & Trousers", "Suits & Blazers"],
      },
      {
        title: "Women's Collection",
        items: ["Dresses & Skirts", "Tops & Blouses", "Cardigans & Coats", "Activewear Sets", "Evening Wear"],
      },
      {
        title: "Footwear & Bags",
        items: ["Running Sneakers", "Leather Boots", "Backpacks & Totes", "Sunglasses & Belts"],
      },
    ],
    featuredPromo: {
      title: "Spring Wardrobe Drop",
      description: "Trending streetwear and essentials for everyday wear",
      discount: "NEW SEASON 2026",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "home",
    name: "Home & Living",
    icon: Home,
    href: "#category-home",
    count: "890+ items",
    subgroups: [
      {
        title: "Furniture & Decor",
        items: ["Living Room Sofas", "Ergonomic Chairs", "Coffee Tables", "Floor Lamps", "Wall Art & Frames"],
      },
      {
        title: "Kitchen & Dining",
        items: ["Espresso Machines", "Air Fryers & Blenders", "Cookware Sets", "Dinnerware", "Bar Accessories"],
      },
      {
        title: "Bedding & Bath",
        items: ["Cotton Bed Sheets", "Memory Foam Pillows", "Plush Bath Towels", "Scented Candles"],
      },
    ],
    featuredPromo: {
      title: "Cozy Living Refresh",
      description: "Modern furniture and warm lighting for your space",
      discount: "UP TO 40% OFF",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: Sparkles,
    href: "#category-beauty",
    count: "640+ items",
    subgroups: [
      {
        title: "Skincare",
        items: ["Serums & Essences", "Daily Moisturizers", "Sun Protection SPF", "Face Cleansers", "Night Creams"],
      },
      {
        title: "Hair & Body Care",
        items: ["Shampoos & Conditioners", "Hair Styling Oils", "Body Washes", "Organic Body Lotions"],
      },
      {
        title: "Fragrance & Makeup",
        items: ["Luxury Perfumes", "Lipsticks & Tints", "Foundation & Concealers", "Makeup Brushes"],
      },
    ],
    featuredPromo: {
      title: "Glow Essentials",
      description: "Dermatologist-approved formulas for radiant skin",
      discount: "SPECIAL BUY 1 GET 1",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: Dumbbell,
    href: "#category-sports",
    count: "780+ items",
    subgroups: [
      {
        title: "Fitness & Training",
        items: ["Adjustable Dumbbells", "Yoga Mats & Blocks", "Resistance Bands", "Jump Ropes", "Weight Benches"],
      },
      {
        title: "Outdoor Recreation",
        items: ["Camping Tents", "Hiking Backpacks", "Thermal Sleeping Bags", "Water Bottles & Hydration"],
      },
      {
        title: "Athletic Gear",
        items: ["Compression Shorts", "Moisture-wicking Tees", "Running Socks", "Gym Duffel Bags"],
      },
    ],
    featuredPromo: {
      title: "Peak Performance Gear",
      description: "Everything you need to crush your workout goals",
      discount: "EXTRA 20% OFF",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: Gamepad2,
    href: "#category-toys",
    count: "520+ items",
    subgroups: [
      {
        title: "Video Gaming",
        items: ["PlayStation & Xbox", "Nintendo Switch Consoles", "Gaming Headsets", "Controllers & Docks"],
      },
      {
        title: "Board & Tabletop",
        items: ["Family Board Games", "Strategy Games", "Puzzles (1000+ pcs)", "Card Games"],
      },
      {
        title: "Kids & Collectibles",
        items: ["Building Brick Sets", "Action Figures", "Plush Toys & Teddy Bears", "Educational STEM Kits"],
      },
    ],
    featuredPromo: {
      title: "Playtime Bonanza",
      description: "Top rated toys and games for all ages",
      discount: "BEST DEALS",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: Car,
    href: "#category-automotive",
    count: "410+ items",
    subgroups: [
      {
        title: "Car Electronics",
        items: ["Dash Cams (4K UHD)", "Car Phone Mounts", "Bluetooth FM Transmitters", "Car Jump Starters"],
      },
      {
        title: "Interior Accessories",
        items: ["All-Weather Floor Mats", "Seat Covers & Cushions", "Car Air Purifiers", "Organizers"],
      },
      {
        title: "Maintenance & Care",
        items: ["Car Wash & Ceramic Wax", "Microfiber Towels", "Tire Inflators & Pressure Gauges"],
      },
    ],
    featuredPromo: {
      title: "Road Trip Essentials",
      description: "Keep your car clean, smart, and safe on every journey",
      discount: "SAVE UP TO 25%",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "books",
    name: "Books & Stationery",
    icon: BookOpen,
    href: "#category-books",
    count: "950+ items",
    subgroups: [
      {
        title: "Literature & Fiction",
        items: ["Best-Selling Novels", "Sci-Fi & Fantasy", "Mystery & Thrillers", "Poetry & Classics"],
      },
      {
        title: "Non-Fiction & Growth",
        items: ["Business & Economics", "Self-Development", "Biographies & Memoirs", "Science & Tech"],
      },
      {
        title: "Stationery & Office",
        items: ["Leather Bound Journals", "Fountain Pens & Ink", "Planner Sets", "Desk Organizers"],
      },
    ],
    featuredPromo: {
      title: "Book of the Month",
      description: "Explore world-class titles and timeless bestsellers",
      discount: "BUY 2 GET 1 FREE",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: HeartPulse,
    href: "#category-health",
    count: "380+ items",
    subgroups: [
      {
        title: "Vitamins & Supplements",
        items: ["Multivitamins", "Omega-3 Fish Oil", "Whey Protein Powders", "Electrolyte Hydration"],
      },
      {
        title: "Personal Wellness",
        items: ["Massage Guns", "Blood Pressure Monitors", "Digital Thermometers", "Sleep Masks"],
      },
      {
        title: "Herbal & Organic",
        items: ["Green Tea & Matcha", "Essential Oil Diffusers", "Aromatherapy Oils", "Organic Snacks"],
      },
    ],
    featuredPromo: {
      title: "Daily Wellness Boost",
      description: "Premium nutrition and recovery tools for a healthier you",
      discount: "UP TO 35% OFF",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    },
  },
];

export const shopByCategoryCards = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80",
    href: "#category-electronics",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80",
    href: "#category-fashion",
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    href: "#category-home",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
    href: "#category-beauty",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    href: "#category-sports",
  },
  {
    name: "Toys & Games",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=400&q=80",
    href: "#category-toys",
  },
  {
    name: "Automotive",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80",
    href: "#category-automotive",
  },
  {
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    href: "#category-books",
  },
];
