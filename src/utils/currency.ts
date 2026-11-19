export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  rate: number; // Against 1 USD
  flag: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0, flag: "🇺🇸" },
  EUR: { code: "EUR", name: "Euro", symbol: "€", rate: 0.92, flag: "🇪🇺" },
  GBP: { code: "GBP", name: "British Pound", symbol: "£", rate: 0.79, flag: "🇬🇧" },
  KHR: { code: "KHR", name: "Cambodian Riel", symbol: "៛", rate: 4100, flag: "🇰🇭" },
  JPY: { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 154.5, flag: "🇯🇵" },
};

export function convertPrice(amountUSD: number, currencyCode: string): number {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return amountUSD * config.rate;
}

export function formatCurrency(amountUSD: number, currencyCode: string): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rate;

  if (currencyCode === "KHR" || currencyCode === "JPY") {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${config.symbol}${converted.toFixed(2)}`;
}
