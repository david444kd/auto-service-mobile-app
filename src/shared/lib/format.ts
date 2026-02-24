/**
 * Форматирование даты в локализованную строку
 */
export function formatDate(date: Date | string, locale = 'ru-RU'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Форматирование числа с разделителями тысяч
 */
export function formatNumber(num: number, locale = 'ru-RU'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Форматирование валюты
 */
export function formatCurrency(amount: number, currency = 'KZT', locale = 'ru-RU'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Обрезка строки с многоточием
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}
