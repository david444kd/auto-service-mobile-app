# React Native FSD Шаблон

Шаблон React Native + Expo с архитектурой Feature-Sliced Design.

## Быстрый старт

```bash
# Создать новый проект из шаблона
npx create-expo-app my-app --template react-native-fsd-template

# Или клонировать напрямую
npx degit user/react-native-fsd-template my-app
cd my-app
npm install
```

## После установки

1. Обновите `app.json` с названием приложения и bundle ID
2. Скопируйте `.env.example` в `.env.local`
3. Запустите `npm start`

## Архитектура

Подробности в **SPECIFICATION.md**.

```
src/
├── app-pages/     # Композиция экранов
├── widgets/       # Составные UI-блоки
├── features/      # Пользовательские сценарии
├── entities/      # Бизнес-сущности (api, hooks, model, ui)
├── shared/        # UI-примитивы, утилиты, API-клиент, stores
└── core/          # Провайдеры
```

**Правило импортов:** `app → app-pages → widgets → features → entities → shared`

## Технологический стек

- **Фреймворк:** React Native + Expo
- **Навигация:** Expo Router
- **Стилизация:** NativeWind (Tailwind)
- **Серверное состояние:** TanStack Query
- **Клиентское состояние:** Zustand
- **Формы:** React Hook Form + Zod
- **Линтинг:** Biome

## Скрипты

```bash
npm start          # Dev-сервер
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
npm run check      # Линтинг + проверка форматирования
npm run check:fix  # Авто-исправление
```

