// API-константы для сущности Example
// Правила размещения констант см. в SPECIFICATION.md

export const EXAMPLE_ENDPOINTS = {
  BASE: '/examples',
  BY_ID: (id: string) => `/examples/${id}`,
} as const;

export const EXAMPLE_STALE_TIME = 5 * 60 * 1000; // 5 минут
export const EXAMPLE_CACHE_TIME = 30 * 60 * 1000; // 30 минут
