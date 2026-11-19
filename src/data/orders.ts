export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
  trackingNumber: string;
  carrier: string;
  estimatedDelivery?: string;
  total: number;
  items: OrderItem[];
}

export const mockOrders: Order[] = [
  {
    id: "EM-84920",
    date: "Nov 16, 2026",
    status: "Delivered",
    trackingNumber: "TRK-982347102",
    carrier: "FedEx Express",
    total: 278.99,
    items: [
      {
        id: "fp-2",
        name: "AirPods Pro 2nd Gen",
        price: 249,
        image:
          "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
      },
      {
        id: "bs-1",
        name: "Wireless Earbuds Pro",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
      },
    ],
  },
  {
    id: "EM-84211",
    date: "Nov 12, 2026",
    status: "In Transit",
    trackingNumber: "TRK-109283741",
    carrier: "UPS Ground",
    estimatedDelivery: "Tomorrow by 5:00 PM",
    total: 49.99,
    items: [
      {
        id: "bs-2",
        name: "Smart Fitness Watch",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
      },
    ],
  },
  {
    id: "EM-83904",
    date: "Oct 28, 2026",
    status: "Delivered",
    trackingNumber: "TRK-776352410",
    carrier: "DHL Express",
    total: 129.0,
    items: [
      {
        id: "fp-5",
        name: "Nike Air Max 270",
        price: 129,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
      },
    ],
  },
];
