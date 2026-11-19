"use client";

import React, { createContext, useContext, useState } from "react";

export type LanguageCode =
  | "en"
  | "km"
  | "zh"
  | "fr"
  | "es"
  | "ja"
  | "ko"
  | "th"
  | "de"
  | "vi";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  native: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", native: "English (US)", flag: "🇺🇸" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "zh", name: "Chinese", native: "中文 (简体)", flag: "🇨🇳" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "th", name: "Thai", native: "ภาษาไทย", flag: "🇹🇭" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    shop: "Shop",
    deals: "Deals",
    newArrivals: "New Arrivals",
    bestSellers: "Best Sellers",
    trackOrder: "Track Order",
    contactUs: "Contact Us",
    browseCategories: "Browse Categories",
    searchPlaceholder: "Search for products, brands, or categories...",
    account: "Account",
    cart: "Cart",
    managerPortal: "Manager Portal",

    // Hero
    welcome: "WELCOME TO ENJOY-MART",
    heroTitle: "Discover. Shop. Enjoy.",
    heroSubtitle:
      "Find the best products at the best prices. Fast delivery. Easy returns.",
    shopNow: "Shop Now",

    // Trust Badges
    freeShipping: "Free Shipping",
    freeShippingSub: "On orders over $50",
    securePayments: "Secure Payments",
    securePaymentsSub: "100% protected",
    easyReturns: "Easy Returns",
    easyReturnsSub: "30-day return policy",
    support247: "24/7 Support",
    support247Sub: "Always here to help",

    // Headings
    shopByCategory: "Shop by Category",
    bestSellersTitle: "Best Sellers",
    featuredProductsTitle: "Featured Products",
    viewAll: "View All",
    addToCart: "Add to Cart",

    // Categories
    electronics: "Electronics",
    fashion: "Fashion",
    homeLiving: "Home & Living",
    beauty: "Beauty & Personal Care",
    sports: "Sports & Outdoors",
    toys: "Toys & Games",
    automotive: "Automotive",
    books: "Books & Stationery",
    health: "Health & Wellness",
    viewAllCategories: "View All Categories",
  },
  km: {
    // Navigation
    home: "ទំព័រដើម",
    shop: "ហាងទំនិញ",
    deals: "ការបញ្ចុះតម្លៃ",
    newArrivals: "ទំនិញទើបមកដល់",
    bestSellers: "ទំនិញលក់ដាច់បំផុត",
    trackOrder: "តាមដានការបញ្ជាទិញ",
    contactUs: "ទាក់ទងយើង",
    browseCategories: "រកមើលតាមប្រភេទ",
    searchPlaceholder: "ស្វែងរកផលិតផល ម៉ាក ឬប្រភេទ...",
    account: "គណនី",
    cart: "កន្ត្រក",
    managerPortal: "ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង",

    // Hero
    welcome: "សូមស្វាគមន៍មកកាន់ ENJOY-MART",
    heroTitle: "ស្វែងរក។ ទិញទំនិញ។ រីករាយ។",
    heroSubtitle:
      "ស្វែងរកផលិតផលល្អបំផុតក្នុងតម្លៃពិសេស។ ដឹកជញ្ជូនរហ័ស។ ងាយស្រួលប្តូរត្រឡប់។",
    shopNow: "ទិញឥឡូវនេះ",

    // Trust Badges
    freeShipping: "ដឹកជញ្ជូនឥតគិតថ្លៃ",
    freeShippingSub: "សម្រាប់ការបញ្ជាទិញលើសពី $50",
    securePayments: "ការទូទាត់សុវត្ថិភាព",
    securePaymentsSub: "ការពារសុវត្ថិភាព ១០០%",
    easyReturns: "ការប្តូរត្រឡប់ងាយស្រួល",
    easyReturnsSub: "គោលការណ៍ប្តូរត្រឡប់ ៣០ ថ្ងៃ",
    support247: "សេវាបម្រើអតិថិជន ២៤/៧",
    support247Sub: "ត្រៀមខ្លួនជួយអ្នកជានិច្ច",

    // Headings
    shopByCategory: "ទិញទំនិញតាមប្រភេទ",
    bestSellersTitle: "ទំនិញលក់ដាច់បំផុត",
    featuredProductsTitle: "ផលិតផលពិសេសៗ",
    viewAll: "មើលទាំងអស់",
    addToCart: "ដាក់ចូលកន្ត្រក",

    // Categories
    electronics: "គ្រឿងអេឡិចត្រូនិក",
    fashion: "ម៉ូដសម្លៀកបំពាក់",
    homeLiving: "គេហដ្ឋាន និងការរស់នៅ",
    beauty: "សម្រស់ និងការថែទាំខ្លួន",
    sports: "កីឡា និងក្រៅផ្ទះ",
    toys: "ប្រដាប់ក្មេងលេង",
    automotive: "យានយន្ត",
    books: "សៀវភៅ និងសម្ភារការិយាល័យ",
    health: "សុខភាព និងសុខុមាលភាព",
    viewAllCategories: "មើលគ្រប់ប្រភេទទាំងអស់",
  },
  zh: {
    // Navigation
    home: "首页",
    shop: "商城",
    deals: "特惠专区",
    newArrivals: "新品上市",
    bestSellers: "畅销榜单",
    trackOrder: "追踪订单",
    contactUs: "联系我们",
    browseCategories: "浏览全部分类",
    searchPlaceholder: "搜索商品、品牌或类别...",
    account: "我的账户",
    cart: "购物车",
    managerPortal: "经理控制台",

    // Hero
    welcome: "欢迎光临 ENJOY-MART",
    heroTitle: "发现。购物。享受。",
    heroSubtitle: "以最优价格发现最佳商品。快速配送。轻松退换。",
    shopNow: "立即选购",

    // Trust Badges
    freeShipping: "全场免运费",
    freeShippingSub: "单笔订单满 $50 即享",
    securePayments: "安全支付",
    securePaymentsSub: "100% 交易安全保障",
    easyReturns: "无忧退换",
    easyReturnsSub: "30天超长退换保障",
    support247: "24/7 专属客服",
    support247Sub: "全天候为您贴心服务",

    // Headings
    shopByCategory: "按分类选购",
    bestSellersTitle: "热销精选",
    featuredProductsTitle: "精选推荐",
    viewAll: "查看全部",
    addToCart: "加入购物车",

    // Categories
    electronics: "数码电子",
    fashion: "时尚服饰",
    homeLiving: "家居生活",
    beauty: "美妆个护",
    sports: "运动户外",
    toys: "玩具潮玩",
    automotive: "汽车配件",
    books: "图书文具",
    health: "健康养生",
    viewAllCategories: "查看全部分类",
  },
  fr: {
    // Navigation
    home: "Accueil",
    shop: "Boutique",
    deals: "Promotions",
    newArrivals: "Nouveautés",
    bestSellers: "Meilleures Ventes",
    trackOrder: "Suivre Commande",
    contactUs: "Contactez-nous",
    browseCategories: "Catégories",
    searchPlaceholder: "Rechercher des produits...",
    account: "Mon Compte",
    cart: "Panier",
    managerPortal: "Portail Manager",

    // Hero
    welcome: "BIENVENUE CHEZ ENJOY-MART",
    heroTitle: "Découvrez. Achetez. Profitez.",
    heroSubtitle:
      "Trouvez les meilleurs produits aux meilleurs prix. Livraison rapide. Retours faciles.",
    shopNow: "Acheter maintenant",

    // Trust Badges
    freeShipping: "Livraison Gratuite",
    freeShippingSub: "Dès 50$ d'achat",
    securePayments: "Paiements Sécurisés",
    securePaymentsSub: "100% protégé",
    easyReturns: "Retours Faciles",
    easyReturnsSub: "Garantie retour 30 jours",
    support247: "Support 24/7",
    support247Sub: "Toujours à votre écoute",

    // Headings
    shopByCategory: "Parcourir par Catégorie",
    bestSellersTitle: "Meilleures Ventes",
    featuredProductsTitle: "Produits Vedettes",
    viewAll: "Voir Tout",
    addToCart: "Ajouter au Panier",

    // Categories
    electronics: "Électronique",
    fashion: "Mode",
    homeLiving: "Maison & Vie",
    beauty: "Beauté & Soins",
    sports: "Sports & Plein air",
    toys: "Jouets & Jeux",
    automotive: "Automobile",
    books: "Livres & Papeterie",
    health: "Santé & Bien-être",
    viewAllCategories: "Toutes les catégories",
  },
  es: {
    // Navigation
    home: "Inicio",
    shop: "Tienda",
    deals: "Ofertas",
    newArrivals: "Novedades",
    bestSellers: "Más Vendidos",
    trackOrder: "Rastrear Pedido",
    contactUs: "Contáctenos",
    browseCategories: "Categorías",
    searchPlaceholder: "Buscar productos, marcas o categorías...",
    account: "Mi Cuenta",
    cart: "Carrito",
    managerPortal: "Portal de Gerente",

    // Hero
    welcome: "BIENVENIDO A ENJOY-MART",
    heroTitle: "Descubre. Compra. Disfruta.",
    heroSubtitle:
      "Encuentra los mejores productos a los mejores precios. Entrega rápida. Devoluciones fáciles.",
    shopNow: "Comprar Ahora",

    // Trust Badges
    freeShipping: "Envío Gratis",
    freeShippingSub: "En pedidos de más de $50",
    securePayments: "Pagos Seguros",
    securePaymentsSub: "100% protegido",
    easyReturns: "Devoluciones Fáciles",
    easyReturnsSub: "Garantía de 30 días",
    support247: "Soporte 24/7",
    support247Sub: "Siempre aquí para ayudarte",

    // Headings
    shopByCategory: "Comprar por Categoría",
    bestSellersTitle: "Los Más Vendidos",
    featuredProductsTitle: "Productos Destacados",
    viewAll: "Ver Todo",
    addToCart: "Añadir al Carrito",

    // Categories
    electronics: "Electrónica",
    fashion: "Moda",
    homeLiving: "Hogar y Decoración",
    beauty: "Belleza y Cuidado",
    sports: "Deportes y Exterior",
    toys: "Juguetes y Juegos",
    automotive: "Automóvil",
    books: "Libros y Papelería",
    health: "Salud y Bienestar",
    viewAllCategories: "Ver todas las categorías",
  },
  ja: {
    // Navigation
    home: "ホーム",
    shop: "ショップ",
    deals: "セール",
    newArrivals: "新着商品",
    bestSellers: "ベストセラー",
    trackOrder: "注文追跡",
    contactUs: "お問い合わせ",
    browseCategories: "カテゴリーを見る",
    searchPlaceholder: "商品、ブランド、カテゴリーを検索...",
    account: "アカウント",
    cart: "カート",
    managerPortal: "管理者ポータル",

    // Hero
    welcome: "ENJOY-MARTへようこそ",
    heroTitle: "発見。買い物。楽しむ。",
    heroSubtitle:
      "最高の製品を最高の価格で。迅速な配達。簡単な返品対応。",
    shopNow: "今すぐ購入",

    // Trust Badges
    freeShipping: "送料無料",
    freeShippingSub: "50ドル以上のご注文で",
    securePayments: "安全な決済",
    securePaymentsSub: "100% 安全保護",
    easyReturns: "簡単返品",
    easyReturnsSub: "30日間の安心返品保証",
    support247: "24/7 サポート",
    support247Sub: "年中無休でサポート",

    // Headings
    shopByCategory: "カテゴリーから探す",
    bestSellersTitle: "ベストセラー商品",
    featuredProductsTitle: "おすすめの注目商品",
    viewAll: "すべて見る",
    addToCart: "カートに入れる",

    // Categories
    electronics: "家電・PC・AV",
    fashion: "ファッション",
    homeLiving: "ホーム・生活雑貨",
    beauty: "ビューティー・コスメ",
    sports: "スポーツ・アウトドア",
    toys: "おもちゃ・ゲーム",
    automotive: "カー用品・バイク",
    books: "本・文房具",
    health: "ヘルス＆ウェルネス",
    viewAllCategories: "すべてのカテゴリーを見る",
  },
  ko: {
    // Navigation
    home: "홈",
    shop: "쇼핑",
    deals: "특가 상품",
    newArrivals: "신상품",
    bestSellers: "베스트셀러",
    trackOrder: "주문 배송 조회",
    contactUs: "고객센터",
    browseCategories: "카테고리 찾기",
    searchPlaceholder: "상품, 브랜드 또는 카테고리 검색...",
    account: "내 계정",
    cart: "장바구니",
    managerPortal: "관리자 포털",

    // Hero
    welcome: "ENJOY-MART에 오신 것을 환영합니다",
    heroTitle: "발견. 쇼핑. 즐거움.",
    heroSubtitle:
      "최고의 제품을 최상의 가격으로 만나보세요. 빠른 배송. 쉬운 반품.",
    shopNow: "지금 쇼핑하기",

    // Trust Badges
    freeShipping: "무료 배송",
    freeShippingSub: "$50 이상 주문 시",
    securePayments: "안전 결제",
    securePaymentsSub: "100% 안전 보장",
    easyReturns: "간편한 반품",
    easyReturnsSub: "30일 반품 보장",
    support247: "24/7 고객 지원",
    support247Sub: "언제나 함께합니다",

    // Headings
    shopByCategory: "카테고리별 쇼핑",
    bestSellersTitle: "베스트셀러",
    featuredProductsTitle: "추천 상품",
    viewAll: "전체 보기",
    addToCart: "장바구니 담기",

    // Categories
    electronics: "디지털/가전",
    fashion: "패션의류/잡화",
    homeLiving: "홈/인테리어",
    beauty: "뷰티/스킨케어",
    sports: "스포츠/레저",
    toys: "완구/취미",
    automotive: "자동차 용품",
    books: "도서/문구",
    health: "건강/웰빙",
    viewAllCategories: "전체 카테고리 보기",
  },
  th: {
    // Navigation
    home: "หน้าแรก",
    shop: "ร้านค้า",
    deals: "ดีลพิเศษ",
    newArrivals: "สินค้ามาใหม่",
    bestSellers: "สินค้าขายดี",
    trackOrder: "ติดตามพัสดุ",
    contactUs: "ติดต่อเรา",
    browseCategories: "หมวดหมู่สินค้า",
    searchPlaceholder: "ค้นหาสินค้า แบรนด์ หรือหมวดหมู่...",
    account: "บัญชีของฉัน",
    cart: "รถเข็น",
    managerPortal: "พอร์ทัลผู้จัดการ",

    // Hero
    welcome: "ยินดีต้อนรับสู่ ENJOY-MART",
    heroTitle: "ค้นพบ. ช้อปปิ้ง. สนุกสนาน.",
    heroSubtitle:
      "พบกับสินค้าคุณภาพดีที่สุดในราคาสุดคุ้ม จัดส่งรวดเร็ว คืนสินค้าง่าย",
    shopNow: "ช้อปเลยตอนนี้",

    // Trust Badges
    freeShipping: "จัดส่งฟรี",
    freeShippingSub: "เมื่อสั่งซื้อครบ $50",
    securePayments: "ชำระเงินปลอดภัย",
    securePaymentsSub: "คุ้มครอง 100%",
    easyReturns: "คืนสินค้าง่าย",
    easyReturnsSub: "รับประกันคืนเงิน 30 วัน",
    support247: "บริการ 24/7",
    support247Sub: "พร้อมดูแลคุณเสมอ",

    // Headings
    shopByCategory: "เลือกซื้อตามหมวดหมู่",
    bestSellersTitle: "สินค้าขายดีที่สุด",
    featuredProductsTitle: "สินค้าแนะนำพิเศษ",
    viewAll: "ดูทั้งหมด",
    addToCart: "เพิ่มลงรถเข็น",

    // Categories
    electronics: "อุปกรณ์อิเล็กทรอนิกส์",
    fashion: "แฟชั่นและเครื่องแต่งกาย",
    homeLiving: "ของใช้ในบ้านและชีวิตประจำวัน",
    beauty: "ความงามและการดูแลส่วนบุคคล",
    sports: "กีฬาและกิจกรรมกลางแจ้ง",
    toys: "ของเล่นและเกม",
    automotive: "ยานยนต์และอุปกรณ์",
    books: "หนังสือและเครื่องเขียน",
    health: "สุขภาพและความเป็นอยู่ที่ดี",
    viewAllCategories: "ดูหมวดหมู่ทั้งหมด",
  },
  de: {
    // Navigation
    home: "Startseite",
    shop: "Shop",
    deals: "Angebote",
    newArrivals: "Neuheiten",
    bestSellers: "Bestseller",
    trackOrder: "Bestellung verfolgen",
    contactUs: "Kontakt",
    browseCategories: "Kategorien",
    searchPlaceholder: "Produkte, Marken oder Kategorien suchen...",
    account: "Mein Konto",
    cart: "Warenkorb",
    managerPortal: "Manager-Portal",

    // Hero
    welcome: "WILLKOMMEN BEI ENJOY-MART",
    heroTitle: "Entdecken. Shoppen. Genießen.",
    heroSubtitle:
      "Finden Sie die besten Produkte zu den besten Preisen. Schnelle Lieferung. Einfache Rückgabe.",
    shopNow: "Jetzt Shoppen",

    // Trust Badges
    freeShipping: "Kostenloser Versand",
    freeShippingSub: "Ab 50 $ Bestellwert",
    securePayments: "Sichere Zahlung",
    securePaymentsSub: "100% geschützt",
    easyReturns: "Einfache Rückgabe",
    easyReturnsSub: "30 Tage Rückgaberecht",
    support247: "24/7 Support",
    support247Sub: "Immer für Sie da",

    // Headings
    shopByCategory: "Nach Kategorie shoppen",
    bestSellersTitle: "Bestseller",
    featuredProductsTitle: "Ausgewählte Produkte",
    viewAll: "Alle ansehen",
    addToCart: "In den Warenkorb",

    // Categories
    electronics: "Elektronik",
    fashion: "Mode",
    homeLiving: "Wohnen & Haushalt",
    beauty: "Schönheit & Pflege",
    sports: "Sport & Freizeit",
    toys: "Spielzeug & Games",
    automotive: "Auto & Motorrad",
    books: "Bücher & Schreibwaren",
    health: "Gesundheit & Wellness",
    viewAllCategories: "Alle Kategorien anzeigen",
  },
  vi: {
    // Navigation
    home: "Trang chủ",
    shop: "Cửa hàng",
    deals: "Ưu đãi hot",
    newArrivals: "Hàng mới về",
    bestSellers: "Bán chạy nhất",
    trackOrder: "Theo dõi đơn hàng",
    contactUs: "Liên hệ",
    browseCategories: "Danh mục sản phẩm",
    searchPlaceholder: "Tìm kiếm sản phẩm, thương hiệu...",
    account: "Tài khoản",
    cart: "Giỏ hàng",
    managerPortal: "Cổng Quản lý",

    // Hero
    welcome: "CHÀO MỪNG ĐẾN VỚI ENJOY-MART",
    heroTitle: "Khám phá. Mua sắm. Tận hưởng.",
    heroSubtitle:
      "Tìm sản phẩm tốt nhất với giá tốt nhất. Giao hàng nhanh. Đổi trả dễ dàng.",
    shopNow: "Mua sắm ngay",

    // Trust Badges
    freeShipping: "Miễn phí vận chuyển",
    freeShippingSub: "Đơn hàng từ $50",
    securePayments: "Thanh toán an toàn",
    securePaymentsSub: "Bảo vệ 100%",
    easyReturns: "Đổi trả dễ dàng",
    easyReturnsSub: "Chính sách đổi trả 30 ngày",
    support247: "Hỗ trợ 24/7",
    support247Sub: "Luôn sẵn sàng hỗ trợ",

    // Headings
    shopByCategory: "Mua sắm theo danh mục",
    bestSellersTitle: "Sản phẩm bán chạy",
    featuredProductsTitle: "Sản phẩm nổi bật",
    viewAll: "Xem tất cả",
    addToCart: "Thêm vào giỏ",

    // Categories
    electronics: "Điện tử & Công nghệ",
    fashion: "Thời trang",
    homeLiving: "Nhà cửa & Đời sống",
    beauty: "Làm đẹp & Sức khỏe",
    sports: "Thể thao & Dã ngoại",
    toys: "Đồ chơi & Trẻ em",
    automotive: "Ô tô & Xe máy",
    books: "Sách & Văn phòng phẩm",
    health: "Chăm sóc sức khỏe",
    viewAllCategories: "Xem tất cả danh mục",
  },
};

interface LanguageContextType {
  language: LanguageInfo;
  setLanguage: (lang: LanguageInfo) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageInfo>(
    SUPPORTED_LANGUAGES[0]
  );

  const setLanguage = (lang: LanguageInfo) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("enjoy_mart_lang", lang.code);
    } catch {
      // Ignore
    }
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language.code] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
