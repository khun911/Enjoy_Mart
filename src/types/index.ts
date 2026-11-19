export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  rating?: number;
  reviews?: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id?: string;
  name: string;
  image?: string;
  href: string;
  iconName?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
}

export interface ClientFeedback {
  id: string;
  clientName: string;
  clientEmail: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  status: "Published" | "Pending" | "Flagged";
}
