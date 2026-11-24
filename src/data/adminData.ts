// =========================================================================
// ENJOY-MART ENTERPRISE ERP - STATIC DATA SUITE
// Professional, standard mock datasets for all 10 Admin Dashboard views
// =========================================================================

export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  rating: number;
  onTimeDeliveryRate: string;
  activeContracts: string;
  paymentTerms: "Net 15" | "Net 30" | "Net 60";
  status: "Verified Partner" | "Preferred Partner" | "Under Review";
  logoBg: string;
}

export interface PurchaseOrderItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  supplierCode: string;
  destinationWarehouse: string;
  orderDate: string;
  expectedDelivery: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Pending Net 30" | "In Escrow" | "Partial";
  approvalStatus: "Approved & In Transit" | "Pending Warehouse Receipt" | "Customs Clearance" | "Completed" | "Draft";
  notes?: string;
}

export interface TrackingMilestone {
  step: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active?: boolean;
}

export interface TrackingShipment {
  trackingCode: string;
  orderId: string;
  carrier: string;
  origin: string;
  destination: string;
  customerName: string;
  customerPhone: string;
  estimatedArrival: string;
  currentStatus: "Out for Delivery" | "In Transit" | "Customs Cleared" | "Manifest Created" | "Delivered";
  progressPercentage: number;
  driverName?: string;
  vehicleNumber?: string;
  lastCheckpoint: string;
  milestones: TrackingMilestone[];
}

export interface MonthlyFinancialReport {
  month: string;
  grossRevenue: number;
  cogs: number; // Cost of goods sold
  operatingExpenses: number;
  netProfit: number;
  profitMargin: string;
  ordersProcessed: number;
  avgOrderValue: number;
}

export interface CashFlowTransaction {
  id: string;
  txCode: string;
  description: string;
  counterparty: string;
  category: "Merchandise Sales" | "Supplier Settlement" | "Freight & Customs" | "Operations & Cloud" | "Corporate B2B";
  type: "inflow" | "outflow";
  amount: number;
  timestamp: string;
  status: "Settled" | "Processing" | "Cleared";
  referencePoOrOrder?: string;
}

export interface AdminCustomer {
  id: string;
  customerCode: string;
  fullName: string;
  email: string;
  phone: string;
  tier: "VIP Platinum" | "VIP Gold" | "Corporate Business" | "Silver Member";
  lifetimeSpend: number;
  totalOrders: number;
  lastActive: string;
  address: string;
  ratingGiven: number;
  verifiedAccount: boolean;
  status: "Active" | "High Value" | "New";
}

// -------------------------------------------------------------------------
// 1. SUPPLIERS DATA (8 Global Partners)
// -------------------------------------------------------------------------
export const staticSuppliers: Supplier[] = [
  {
    id: "sup-01",
    name: "Sony Global Electronics Corp",
    code: "SUP-SNY-01",
    category: "Consumer Audio & Visual",
    contactPerson: "Kenji Sato",
    email: "procurement@sony.global.com",
    phone: "+81 3-6748-2111",
    country: "Japan (Tokyo)",
    rating: 4.9,
    onTimeDeliveryRate: "99.2%",
    activeContracts: "$1,450,000",
    paymentTerms: "Net 30",
    status: "Verified Partner",
    logoBg: "bg-gradient-to-tr from-slate-900 to-slate-700",
  },
  {
    id: "sup-02",
    name: "Apple Global Operations Ltd",
    code: "SUP-APL-02",
    category: "Mobile & Computing",
    contactPerson: "Sarah Jenkins",
    email: "enterprise-supply@apple.com",
    phone: "+1 (800) 692-7753",
    country: "United States (California)",
    rating: 5.0,
    onTimeDeliveryRate: "99.8%",
    activeContracts: "$3,200,000",
    paymentTerms: "Net 30",
    status: "Verified Partner",
    logoBg: "bg-gradient-to-tr from-zinc-800 to-neutral-900",
  },
  {
    id: "sup-03",
    name: "Nike International Logistics",
    code: "SUP-NKE-03",
    category: "Athletics & Footwear",
    contactPerson: "Michael Zhang",
    email: "apac-distribution@nike.com",
    phone: "+65 6713 8800",
    country: "Singapore / USA",
    rating: 4.8,
    onTimeDeliveryRate: "97.5%",
    activeContracts: "$890,000",
    paymentTerms: "Net 60",
    status: "Verified Partner",
    logoBg: "bg-gradient-to-tr from-orange-600 to-amber-700",
  },
  {
    id: "sup-04",
    name: "Dyson Technology Ltd",
    code: "SUP-DYS-04",
    category: "Home & Personal Care",
    contactPerson: "Emily Watson",
    email: "supply.sea@dyson.com",
    phone: "+44 800 298 0298",
    country: "United Kingdom",
    rating: 4.9,
    onTimeDeliveryRate: "98.9%",
    activeContracts: "$720,000",
    paymentTerms: "Net 30",
    status: "Preferred Partner",
    logoBg: "bg-gradient-to-tr from-fuchsia-700 to-purple-900",
  },
  {
    id: "sup-05",
    name: "Samsung Electronics Semiconductor",
    code: "SUP-SMS-05",
    category: "Displays & Appliances",
    contactPerson: "Min-ho Park",
    email: "b2b.sea@samsung.com",
    phone: "+82 2-2255-0114",
    country: "South Korea (Seoul)",
    rating: 4.8,
    onTimeDeliveryRate: "98.1%",
    activeContracts: "$2,100,000",
    paymentTerms: "Net 30",
    status: "Verified Partner",
    logoBg: "bg-gradient-to-tr from-blue-700 to-indigo-900",
  },
  {
    id: "sup-06",
    name: "Herman Miller Workspaces",
    code: "SUP-HML-06",
    category: "Ergonomics & Home Office",
    contactPerson: "David Miller",
    email: "contract@hermanmiller.com",
    phone: "+1 616-654-3000",
    country: "United States (Michigan)",
    rating: 4.7,
    onTimeDeliveryRate: "96.4%",
    activeContracts: "$480,000",
    paymentTerms: "Net 60",
    status: "Preferred Partner",
    logoBg: "bg-gradient-to-tr from-red-600 to-rose-800",
  },
  {
    id: "sup-07",
    name: "Anker Innovations Direct",
    code: "SUP-ANK-07",
    category: "Charging & Smart Hardware",
    contactPerson: "Li Wei",
    email: "partner@anker.com",
    phone: "+86 755 8658 0666",
    country: "China (Shenzhen)",
    rating: 4.8,
    onTimeDeliveryRate: "99.0%",
    activeContracts: "$650,000",
    paymentTerms: "Net 15",
    status: "Verified Partner",
    logoBg: "bg-gradient-to-tr from-cyan-600 to-blue-800",
  },
  {
    id: "sup-08",
    name: "Philips HealthTech APAC",
    code: "SUP-PHL-08",
    category: "Health & Personal Grooming",
    contactPerson: "Pieter Van Dijk",
    email: "supply.health@philips.com",
    phone: "+31 20 59 77777",
    country: "Netherlands (Amsterdam)",
    rating: 4.9,
    onTimeDeliveryRate: "98.5%",
    activeContracts: "$540,000",
    paymentTerms: "Net 30",
    status: "Preferred Partner",
    logoBg: "bg-gradient-to-tr from-sky-600 to-blue-900",
  },
];

// -------------------------------------------------------------------------
// 2. PURCHASE ORDERS (Enterprise Procurement highlighted by User)
// -------------------------------------------------------------------------
export const staticPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po-1",
    poNumber: "PO-2026-901",
    supplierName: "Sony Global Electronics Corp",
    supplierCode: "SUP-SNY-01",
    destinationWarehouse: "Warehouse A (Phnom Penh Central)",
    orderDate: "Nov 18, 2026",
    expectedDelivery: "Nov 25, 2026",
    items: [
      {
        sku: "SNY-XM5-SLV",
        name: "Sony WH-1000XM5 Wireless Headphones (Silver)",
        quantity: 120,
        unitPrice: 280,
        total: 33600,
      },
      {
        sku: "SNY-XM5-BLK",
        name: "Sony WH-1000XM5 Wireless Headphones (Black)",
        quantity: 180,
        unitPrice: 280,
        total: 50400,
      },
      {
        sku: "SNY-WF-XM5",
        name: "Sony WF-1000XM5 Noise Cancelling Earbuds",
        quantity: 200,
        unitPrice: 190,
        total: 38000,
      },
    ],
    subtotal: 122000,
    tax: 9760,
    shipping: 1200,
    totalAmount: 132960,
    paymentStatus: "Paid",
    approvalStatus: "Approved & In Transit",
    notes: "Priority air freight manifest #CX-8841. Temperature-controlled cargo.",
  },
  {
    id: "po-2",
    poNumber: "PO-2026-902",
    supplierName: "Apple Global Operations Ltd",
    supplierCode: "SUP-APL-02",
    destinationWarehouse: "Warehouse B (Express Air Hub)",
    orderDate: "Nov 15, 2026",
    expectedDelivery: "Nov 24, 2026",
    items: [
      {
        sku: "APL-MBA-M3",
        name: "MacBook Air 15-inch M3 Chip (512GB)",
        quantity: 80,
        unitPrice: 1050,
        total: 84000,
      },
      {
        sku: "APL-APP-2G",
        name: "AirPods Pro (2nd Gen with USB-C MagSafe)",
        quantity: 350,
        unitPrice: 185,
        total: 64750,
      },
    ],
    subtotal: 148750,
    tax: 11900,
    shipping: 1500,
    totalAmount: 162150,
    paymentStatus: "Pending Net 30",
    approvalStatus: "Customs Clearance",
    notes: "Techo Cargo Zone customs inspection in progress under AEO protocol.",
  },
  {
    id: "po-3",
    poNumber: "PO-2026-903",
    supplierName: "Nike International Logistics",
    supplierCode: "SUP-NKE-03",
    destinationWarehouse: "Warehouse C (Global Import Center)",
    orderDate: "Nov 10, 2026",
    expectedDelivery: "Nov 28, 2026",
    items: [
      {
        sku: "NKE-AM-270",
        name: "Nike Air Max 270 Running Shoes (Assorted Sizes)",
        quantity: 300,
        unitPrice: 85,
        total: 25500,
      },
      {
        sku: "NKE-DF-TEE",
        name: "Nike Dri-FIT Pro Athletics Training Tee",
        quantity: 600,
        unitPrice: 22,
        total: 13200,
      },
    ],
    subtotal: 38700,
    tax: 3096,
    shipping: 850,
    totalAmount: 42646,
    paymentStatus: "Paid",
    approvalStatus: "Approved & In Transit",
    notes: "Container #MSKU-99120 docked at Sihanoukville Autonomous Port.",
  },
  {
    id: "po-4",
    poNumber: "PO-2026-904",
    supplierName: "Dyson Technology Ltd",
    supplierCode: "SUP-DYS-04",
    destinationWarehouse: "Warehouse A (Phnom Penh Central)",
    orderDate: "Nov 19, 2026",
    expectedDelivery: "Dec 02, 2026",
    items: [
      {
        sku: "DYS-V15-DT",
        name: "Dyson V15 Detect Cordless Vacuum Cleaner",
        quantity: 60,
        unitPrice: 520,
        total: 31200,
      },
      {
        sku: "DYS-AS-CP",
        name: "Dyson Airwrap Multi-Styler Complete",
        quantity: 90,
        unitPrice: 430,
        total: 38700,
      },
    ],
    subtotal: 69900,
    tax: 5592,
    shipping: 1100,
    totalAmount: 76592,
    paymentStatus: "In Escrow",
    approvalStatus: "Pending Warehouse Receipt",
    notes: "Official distributor batch verification scheduled upon bay dock.",
  },
  {
    id: "po-5",
    poNumber: "PO-2026-905",
    supplierName: "Samsung Electronics Semiconductor",
    supplierCode: "SUP-SMS-05",
    destinationWarehouse: "Warehouse D (Depot Hub)",
    orderDate: "Nov 05, 2026",
    expectedDelivery: "Nov 18, 2026",
    items: [
      {
        sku: "SMS-S24U-256",
        name: "Samsung Galaxy S24 Ultra (Titanium Gray 256GB)",
        quantity: 75,
        unitPrice: 920,
        total: 69000,
      },
      {
        sku: "SMS-M8-32",
        name: "Samsung Smart Monitor M8 32-inch 4K UHD",
        quantity: 45,
        unitPrice: 380,
        total: 17100,
      },
    ],
    subtotal: 86100,
    tax: 6888,
    shipping: 950,
    totalAmount: 93938,
    paymentStatus: "Paid",
    approvalStatus: "Completed",
    notes: "Batch #SMS-8841 inspected, scanned, and allocated to Warehouse D shelves.",
  },
  {
    id: "po-6",
    poNumber: "PO-2026-906",
    supplierName: "Anker Innovations Direct",
    supplierCode: "SUP-ANK-07",
    destinationWarehouse: "Warehouse A (Phnom Penh Central)",
    orderDate: "Nov 21, 2026",
    expectedDelivery: "Nov 29, 2026",
    items: [
      {
        sku: "ANK-737-PB",
        name: "Anker 737 Power Bank (PowerCore 24K 140W)",
        quantity: 250,
        unitPrice: 85,
        total: 21250,
      },
      {
        sku: "ANK-GAN-65",
        name: "Anker Nano II 65W GaN Fast Charger",
        quantity: 400,
        unitPrice: 28,
        total: 11200,
      },
    ],
    subtotal: 32450,
    tax: 2596,
    shipping: 600,
    totalAmount: 35646,
    paymentStatus: "Pending Net 30",
    approvalStatus: "Approved & In Transit",
    notes: "Direct cross-border dispatch via Shenzhen-Phnom Penh express lane.",
  },
];

// -------------------------------------------------------------------------
// 3. TRACKING SHIPMENTS (Live Cargo & Customer Parcel Tracking)
// -------------------------------------------------------------------------
export const staticTrackingShipments: TrackingShipment[] = [
  {
    trackingCode: "TRK-982347102",
    orderId: "EM-84920",
    carrier: "FedEx Express International",
    origin: "Warehouse A Central Hub, Phnom Penh",
    destination: "Toul Kork, Phnom Penh, Cambodia",
    customerName: "Khun Phan (VIP Platinum)",
    customerPhone: "+855 12 345 678",
    estimatedArrival: "Today by 4:30 PM",
    currentStatus: "Out for Delivery",
    progressPercentage: 85,
    driverName: "Vireak Long (Courier #21)",
    vehicleNumber: "PP-2BC-4892",
    lastCheckpoint: "Toul Kork Sector 4 Distribution Van",
    milestones: [
      {
        step: "Order Picked & Barcode Scanned",
        location: "Warehouse A Automated Sorting Hub",
        timestamp: "Nov 22, 2026 • 08:30 AM",
        completed: true,
      },
      {
        step: "Security Seal & Insurance Certified",
        location: "Enjoy-Mart Dispatch Bay #04",
        timestamp: "Nov 22, 2026 • 10:15 AM",
        completed: true,
      },
      {
        step: "Transferred to FedEx Priority Courier",
        location: "FedEx Central Depot Phnom Penh",
        timestamp: "Nov 22, 2026 • 12:45 PM",
        completed: true,
      },
      {
        step: "Out for Delivery with Courier Van",
        location: "Local Courier Route (Driver: Vireak Long)",
        timestamp: "Nov 22, 2026 • 02:20 PM",
        completed: true,
        active: true,
      },
      {
        step: "Client Handover & Digital Signature",
        location: "Destination Address",
        timestamp: "Estimated 04:30 PM",
        completed: false,
      },
    ],
  },
  {
    trackingCode: "TRK-109283741",
    orderId: "EM-84211",
    carrier: "DHL Express Air Cargo",
    origin: "Warehouse B Express Air Hub, Techo Airport",
    destination: "Siem Reap Royal Residence District",
    customerName: "Elena Rostova",
    customerPhone: "+855 77 998 812",
    estimatedArrival: "Tomorrow by 11:00 AM",
    currentStatus: "In Transit",
    progressPercentage: 60,
    driverName: "Sarith Chhun",
    vehicleNumber: "SR-3A-9011",
    lastCheckpoint: "Inter-Provincial Highway 6 Transit Hub",
    milestones: [
      {
        step: "Order Manifest Verified",
        location: "Warehouse B Cargo Terminal",
        timestamp: "Nov 21, 2026 • 04:00 PM",
        completed: true,
      },
      {
        step: "Air Cargo Flight Loaded",
        location: "Techo International Air Cargo Hub",
        timestamp: "Nov 21, 2026 • 08:30 PM",
        completed: true,
      },
      {
        step: "Arrived at Siem Reap Hub & Sorting",
        location: "Siem Reap Regional Dispatch Facility",
        timestamp: "Nov 22, 2026 • 07:10 AM",
        completed: true,
        active: true,
      },
      {
        step: "Loaded on Express Courier Van",
        location: "Siem Reap City Delivery Unit",
        timestamp: "Pending Dispatch (Tomorrow 08:00 AM)",
        completed: false,
      },
      {
        step: "Delivery Completed",
        location: "Client Villa, Siem Reap",
        timestamp: "Pending",
        completed: false,
      },
    ],
  },
  {
    trackingCode: "TRK-776352410",
    orderId: "EM-83904",
    carrier: "Local SpeedPost Express",
    origin: "Warehouse C Global Import Center",
    destination: "BKK1, Chamkarmon, Phnom Penh",
    customerName: "Marcus Sterling",
    customerPhone: "+855 89 221 345",
    estimatedArrival: "Delivered on Nov 20",
    currentStatus: "Delivered",
    progressPercentage: 100,
    driverName: "Piseth Meng",
    vehicleNumber: "PP-1AB-7721",
    lastCheckpoint: "Client Signature Verified by Hand",
    milestones: [
      {
        step: "Customs Clearance & Container Unload",
        location: "Sihanoukville Port Logistics",
        timestamp: "Nov 18, 2026 • 09:00 AM",
        completed: true,
      },
      {
        step: "Express Transit via Expressway E1",
        location: "Phnom Penh Express Terminal",
        timestamp: "Nov 19, 2026 • 02:00 PM",
        completed: true,
      },
      {
        step: "Out for Delivery",
        location: "Chamkarmon District Route",
        timestamp: "Nov 20, 2026 • 10:15 AM",
        completed: true,
      },
      {
        step: "Delivered to Receptionist & Signed",
        location: "BKK1 Office Tower, Phnom Penh",
        timestamp: "Nov 20, 2026 • 11:45 AM",
        completed: true,
      },
    ],
  },
  {
    trackingCode: "TRK-554190822",
    orderId: "EM-85102",
    carrier: "Enjoy-Mart Priority Fleet",
    origin: "Warehouse A Central Hub",
    destination: "Chroy Changvar Satellite City",
    customerName: "Sokha Heng (Corporate B2B)",
    customerPhone: "+855 10 882 199",
    estimatedArrival: "Today by 6:00 PM",
    currentStatus: "In Transit",
    progressPercentage: 50,
    driverName: "Dara Keo",
    vehicleNumber: "EM-FLEET-08",
    lastCheckpoint: "Chroy Changvar Bridge Crossing",
    milestones: [
      {
        step: "B2B Bulk Invoice & Dispatch Packaged",
        location: "Warehouse A Bulk Zone",
        timestamp: "Nov 22, 2026 • 11:00 AM",
        completed: true,
      },
      {
        step: "Loaded on Enjoy-Mart Electric Delivery Van",
        location: "Fulfillment Bay #01",
        timestamp: "Nov 22, 2026 • 01:30 PM",
        completed: true,
        active: true,
      },
      {
        step: "Scheduled Corporate Dock Unload",
        location: "Chroy Changvar Tech Park",
        timestamp: "Expected 05:45 PM",
        completed: false,
      },
    ],
  },
];

// -------------------------------------------------------------------------
// 4. MONTHLY REPORTS DATA (Executive Business Analytics)
// -------------------------------------------------------------------------
export const staticMonthlyReports: MonthlyFinancialReport[] = [
  {
    month: "November 2026 (MTD)",
    grossRevenue: 288450,
    cogs: 182300,
    operatingExpenses: 28400,
    netProfit: 77750,
    profitMargin: "26.9%",
    ordersProcessed: 1420,
    avgOrderValue: 203.13,
  },
  {
    month: "October 2026",
    grossRevenue: 342100,
    cogs: 215600,
    operatingExpenses: 34100,
    netProfit: 92400,
    profitMargin: "27.0%",
    ordersProcessed: 1680,
    avgOrderValue: 203.63,
  },
  {
    month: "September 2026",
    grossRevenue: 310800,
    cogs: 198200,
    operatingExpenses: 31500,
    netProfit: 81100,
    profitMargin: "26.1%",
    ordersProcessed: 1540,
    avgOrderValue: 201.81,
  },
  {
    month: "August 2026",
    grossRevenue: 295400,
    cogs: 189100,
    operatingExpenses: 29800,
    netProfit: 76500,
    profitMargin: "25.9%",
    ordersProcessed: 1460,
    avgOrderValue: 202.32,
  },
  {
    month: "July 2026",
    grossRevenue: 284000,
    cogs: 181400,
    operatingExpenses: 28900,
    netProfit: 73700,
    profitMargin: "25.9%",
    ordersProcessed: 1390,
    avgOrderValue: 204.31,
  },
  {
    month: "June 2026",
    grossRevenue: 268900,
    cogs: 172000,
    operatingExpenses: 27400,
    netProfit: 69500,
    profitMargin: "25.8%",
    ordersProcessed: 1320,
    avgOrderValue: 203.71,
  },
];

// -------------------------------------------------------------------------
// 5. CASH FLOW TRANSACTIONS (Financial Treasury Ledger)
// -------------------------------------------------------------------------
export const staticCashFlowTransactions: CashFlowTransaction[] = [
  {
    id: "tx-101",
    txCode: "TX-2026-1189",
    description: "Daily Storefront Card & QR Customer Settlements",
    counterparty: "Bakong & Visa / Mastercard Merchant Gateway",
    category: "Merchandise Sales",
    type: "inflow",
    amount: 14850.0,
    timestamp: "Nov 22, 2026 • 02:45 PM",
    status: "Settled",
  },
  {
    id: "tx-102",
    txCode: "TX-2026-1188",
    description: "Purchase Order PO-2026-901 Settlement (Sony XM5 Stock)",
    counterparty: "Sony Global Electronics Corp",
    category: "Supplier Settlement",
    type: "outflow",
    amount: 132960.0,
    timestamp: "Nov 21, 2026 • 11:30 AM",
    status: "Settled",
    referencePoOrOrder: "PO-2026-901",
  },
  {
    id: "tx-103",
    txCode: "TX-2026-1187",
    description: "Corporate B2B Bulk Order Invoicing (50x Laptops)",
    counterparty: "Canadia Tech Center B2B Procurement",
    category: "Corporate B2B",
    type: "inflow",
    amount: 54200.0,
    timestamp: "Nov 20, 2026 • 04:15 PM",
    status: "Cleared",
    referencePoOrOrder: "B2B-8812",
  },
  {
    id: "tx-104",
    txCode: "TX-2026-1186",
    description: "Air Freight Cargo & Customs Duty (Techo Hub)",
    counterparty: "FedEx International & General Dept of Customs",
    category: "Freight & Customs",
    type: "outflow",
    amount: 6850.0,
    timestamp: "Nov 19, 2026 • 01:20 PM",
    status: "Settled",
  },
  {
    id: "tx-105",
    txCode: "TX-2026-1185",
    description: "AWS Cloud Infrastructure & Payment Gateway Server License",
    counterparty: "Amazon Web Services EMEA",
    category: "Operations & Cloud",
    type: "outflow",
    amount: 3240.0,
    timestamp: "Nov 18, 2026 • 09:00 AM",
    status: "Settled",
  },
  {
    id: "tx-106",
    txCode: "TX-2026-1184",
    description: "Weekend Flash Deals Customer Receipts (Bakong QR)",
    counterparty: "National Bank of Cambodia Bakong Switch",
    category: "Merchandise Sales",
    type: "inflow",
    amount: 22400.0,
    timestamp: "Nov 17, 2026 • 06:30 PM",
    status: "Cleared",
  },
  {
    id: "tx-107",
    txCode: "TX-2026-1183",
    description: "Purchase Order PO-2026-903 Initial Advance (Nike)",
    counterparty: "Nike International Logistics",
    category: "Supplier Settlement",
    type: "outflow",
    amount: 42646.0,
    timestamp: "Nov 15, 2026 • 10:10 AM",
    status: "Settled",
    referencePoOrOrder: "PO-2026-903",
  },
];

// -------------------------------------------------------------------------
// 6. CUSTOMERS CRM DIRECTORY (8 VIP & High-Value Clients)
// -------------------------------------------------------------------------
export const staticCustomers: AdminCustomer[] = [
  {
    id: "cust-01",
    customerCode: "EM-CUST-9118",
    fullName: "Khun Phan",
    email: "khun911@users.noreply.github.com",
    phone: "+855 12 345 678",
    tier: "VIP Platinum",
    lifetimeSpend: 4890.0,
    totalOrders: 18,
    lastActive: "Today",
    address: "No. 128, St. 2004, Sen Sok, Phnom Penh",
    ratingGiven: 5.0,
    verifiedAccount: true,
    status: "High Value",
  },
  {
    id: "cust-02",
    customerCode: "EM-CUST-9042",
    fullName: "Elena Rostova",
    email: "elena.r@lifestyle.com",
    phone: "+855 77 998 812",
    tier: "VIP Platinum",
    lifetimeSpend: 3450.0,
    totalOrders: 12,
    lastActive: "Yesterday",
    address: "Borey Peng Huoth, Chbar Ampov, Phnom Penh",
    ratingGiven: 5.0,
    verifiedAccount: true,
    status: "High Value",
  },
  {
    id: "cust-03",
    customerCode: "EM-CUST-8911",
    fullName: "Marcus Sterling",
    email: "marcus.s@techreviews.io",
    phone: "+855 89 221 345",
    tier: "VIP Gold",
    lifetimeSpend: 2180.0,
    totalOrders: 8,
    lastActive: "3 days ago",
    address: "Tower 2, BKK1 Residence, Chamkarmon, Phnom Penh",
    ratingGiven: 4.8,
    verifiedAccount: true,
    status: "Active",
  },
  {
    id: "cust-04",
    customerCode: "EM-CUST-8765",
    fullName: "Sokha Heng",
    email: "procurement@henglogistics.com.kh",
    phone: "+855 10 882 199",
    tier: "Corporate Business",
    lifetimeSpend: 18450.0,
    totalOrders: 32,
    lastActive: "Today",
    address: "St. 598, Chroy Changvar, Phnom Penh",
    ratingGiven: 5.0,
    verifiedAccount: true,
    status: "High Value",
  },
  {
    id: "cust-05",
    customerCode: "EM-CUST-8520",
    fullName: "Chanthy Nuon",
    email: "chanthy.nuon@gmail.com",
    phone: "+855 92 110 445",
    tier: "VIP Gold",
    lifetimeSpend: 1640.0,
    totalOrders: 7,
    lastActive: "Nov 20, 2026",
    address: "Street 63, Daun Penh, Phnom Penh",
    ratingGiven: 4.9,
    verifiedAccount: true,
    status: "Active",
  },
  {
    id: "cust-06",
    customerCode: "EM-CUST-8314",
    fullName: "Jonathan Lee",
    email: "j.lee@singapore-apac.sg",
    phone: "+65 9123 4567",
    tier: "VIP Platinum",
    lifetimeSpend: 5200.0,
    totalOrders: 14,
    lastActive: "Nov 19, 2026",
    address: "Marina Bay Financial District / PH Nom Penh Suites",
    ratingGiven: 5.0,
    verifiedAccount: true,
    status: "High Value",
  },
  {
    id: "cust-07",
    customerCode: "EM-CUST-8109",
    fullName: "Vireak Botum",
    email: "vireak.botum@khmertech.kh",
    phone: "+855 16 774 219",
    tier: "Silver Member",
    lifetimeSpend: 620.0,
    totalOrders: 3,
    lastActive: "Nov 18, 2026",
    address: "Toul Tom Poung 1, Chamkarmon, Phnom Penh",
    ratingGiven: 4.7,
    verifiedAccount: true,
    status: "New",
  },
  {
    id: "cust-08",
    customerCode: "EM-CUST-7940",
    fullName: "Sophal Meas",
    email: "meas.sophal@online.com.kh",
    phone: "+855 78 334 911",
    tier: "Silver Member",
    lifetimeSpend: 480.0,
    totalOrders: 2,
    lastActive: "Nov 16, 2026",
    address: "Boeng Keng Kang 3, Phnom Penh",
    ratingGiven: 4.8,
    verifiedAccount: true,
    status: "New",
  },
];

// =========================================================================
// ROLE-BASED ACCESS CONTROL (RBAC) & SIDEBAR PERMISSIONS
// =========================================================================
export type AdminRoleKey =
  | "super_admin"
  | "inventory_manager"
  | "logistics_officer"
  | "financial_auditor"
  | "support_agent";

export interface RolePermissionDetails {
  canViewInventory: boolean;
  canEditInventory: boolean;
  canManageSuppliers: boolean;
  canCreatePurchaseOrders: boolean;
  canDispatchShipments: boolean;
  canViewFinancials: boolean;
  canExportReports: boolean;
  canManageCustomers: boolean;
  canAccessSettings: boolean;
}

export interface AdminRole {
  key: AdminRoleKey;
  title: string;
  badge: string;
  userName: string;
  initials: string;
  avatarBg: string;
  description: string;
  allowedTabs: string[];
  permissions: RolePermissionDetails;
}

export const initialAdminRoles: AdminRole[] = [
  {
    key: "super_admin",
    title: "Store Super Admin",
    badge: "Full Access",
    userName: "Khun Phan",
    initials: "KP",
    avatarBg: "bg-slate-900 text-white",
    description: "Complete unrestricted access to all ERP modules, inventory controls, financials, and system configurations.",
    allowedTabs: [
      "Dashboard",
      "Inventory",
      "Warehouses",
      "Suppliers",
      "Purchase Orders",
      "Shipments",
      "Tracking",
      "Reports",
      "Cash Flow",
      "Customers",
      "Settings",
    ],
    permissions: {
      canViewInventory: true,
      canEditInventory: true,
      canManageSuppliers: true,
      canCreatePurchaseOrders: true,
      canDispatchShipments: true,
      canViewFinancials: true,
      canExportReports: true,
      canManageCustomers: true,
      canAccessSettings: true,
    },
  },
  {
    key: "inventory_manager",
    title: "Warehouse & Stock Manager",
    badge: "Stock & POs",
    userName: "Sokha Rith",
    initials: "SR",
    avatarBg: "bg-blue-600 text-white",
    description: "Oversees stock counts, batch replenishment, warehouse capacities, and restock purchase orders.",
    allowedTabs: [
      "Dashboard",
      "Inventory",
      "Warehouses",
      "Purchase Orders",
    ],
    permissions: {
      canViewInventory: true,
      canEditInventory: true,
      canManageSuppliers: false,
      canCreatePurchaseOrders: true,
      canDispatchShipments: false,
      canViewFinancials: false,
      canExportReports: false,
      canManageCustomers: false,
      canAccessSettings: false,
    },
  },
  {
    key: "logistics_officer",
    title: "Logistics & Fleet Lead",
    badge: "Supply Chain",
    userName: "Vannak Touch",
    initials: "VT",
    avatarBg: "bg-amber-600 text-white",
    description: "Manages factory partners, express freight routes, customs documentation, and live GPS vehicle tracking.",
    allowedTabs: [
      "Dashboard",
      "Suppliers",
      "Purchase Orders",
      "Shipments",
      "Tracking",
    ],
    permissions: {
      canViewInventory: false,
      canEditInventory: false,
      canManageSuppliers: true,
      canCreatePurchaseOrders: true,
      canDispatchShipments: true,
      canViewFinancials: false,
      canExportReports: false,
      canManageCustomers: false,
      canAccessSettings: false,
    },
  },
  {
    key: "financial_auditor",
    title: "Financial Auditor & CFO",
    badge: "Finance & Audit",
    userName: "Chhaya Ly",
    initials: "CL",
    avatarBg: "bg-emerald-600 text-white",
    description: "Monitors daily sales volume, profit margins, monthly cash flows, expense ledgers, and executive analytics.",
    allowedTabs: [
      "Dashboard",
      "Reports",
      "Cash Flow",
      "Customers",
    ],
    permissions: {
      canViewInventory: false,
      canEditInventory: false,
      canManageSuppliers: false,
      canCreatePurchaseOrders: false,
      canDispatchShipments: false,
      canViewFinancials: true,
      canExportReports: true,
      canManageCustomers: true,
      canAccessSettings: false,
    },
  },
  {
    key: "support_agent",
    title: "Customer Support Specialist",
    badge: "Customer Care",
    userName: "Dara Bopha",
    initials: "DB",
    avatarBg: "bg-purple-600 text-white",
    description: "Handles customer satisfaction, ratings reviews, client order inquiries, and live delivery status lookups.",
    allowedTabs: [
      "Dashboard",
      "Tracking",
      "Customers",
    ],
    permissions: {
      canViewInventory: false,
      canEditInventory: false,
      canManageSuppliers: false,
      canCreatePurchaseOrders: false,
      canDispatchShipments: false,
      canViewFinancials: false,
      canExportReports: false,
      canManageCustomers: true,
      canAccessSettings: false,
    },
  },
];
