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
