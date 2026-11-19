export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Against 1 USD
  flag: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0, flag: "🇺🇸" },
  KHR: { code: "KHR", name: "Cambodian Riel", symbol: "៛", rate: 4100, flag: "🇰🇭" },
  EUR: { code: "EUR", name: "Euro", symbol: "€", rate: 0.92, flag: "🇪🇺" },
  GBP: { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79, flag: "🇬🇧" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 154.5, flag: "🇯🇵" },
  THB: { code: "THB", name: "Thai Baht", symbol: "฿", rate: 34.8, flag: "🇹🇭" },
  SGD: { code: "SGD", name: "Singapore Dollar", symbol: "S$", rate: 1.34, flag: "🇸🇬" },
  CNY: { code: "CNY", name: "Chinese Yuan", symbol: "¥", rate: 7.24, flag: "🇨🇳" },
  KRW: { code: "KRW", name: "Korean Won", symbol: "₩", rate: 1390, flag: "🇰🇷" },
  AUD: { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.52, flag: "🇦🇺" },
  CAD: { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.40, flag: "🇨🇦" },
  VND: { code: "VND", name: "Vietnamese Dong", symbol: "₫", rate: 25400, flag: "🇻🇳" },
};

export function convertPrice(amountUSD: number, currencyCode: string): number {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return amountUSD * config.rate;
}

export function formatCurrency(amountUSD: number, currencyCode: string): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rate;

  if (["KHR", "JPY", "KRW", "VND"].includes(currencyCode)) {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${config.symbol}${converted.toFixed(2)}`;
}
