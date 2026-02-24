import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { env } from '@/shared/config/env';

export const apiClient = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор запросов
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Добавить токен авторизации, если доступен
    // const token = getToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Интерцептор ответов
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Обработка неавторизованного запроса
          break;
        case 403:
          // Обработка запрещённого доступа
          break;
        case 404:
          // Обработка "не найдено"
          break;
        case 500:
          // Обработка ошибки сервера
          break;
      }
    }
    return Promise.reject(error);
  }
);

export type { AxiosError };
