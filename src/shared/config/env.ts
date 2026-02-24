export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  API_TIMEOUT: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000,
  APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV || 'development') as
    | 'development'
    | 'staging'
    | 'production',
  DEBUG: process.env.EXPO_PUBLIC_DEBUG === 'true',
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
} as const;

export type Env = typeof env;
