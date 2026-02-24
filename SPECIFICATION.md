# Mobile Architecture Specification
**Версия:** 2.0 | **Статус:** Архитектурный стандарт
* * *
## 0\. Быстрый старт: структура проекта
Проект следует методологии **Feature-Sliced Design (FSD)** с адаптацией под React Native и Expo Router.
**Основная идея:** Архитектура построена на принципах слабой связанности, однонаправленного потока данных и явных публичных API между модулями через **index.ts**. Система разделена на семь иерархических слоёв с чётко определённой ответственностью и правилами зависимостей.
**Поток данных:** User Action → Feature/Widget → Entity Hook → API Layer → Server. Обратный поток через реактивное обновление UI на основе серверного и клиентского состояния.
### Структура проекта
```
src/
├── app-pages/  Сборка экранов (Композиция widgets/features в Screen-компоненты)
├── widgets/    UI-блоки (Объединения в законченные области интерфейса)
├── features/   Пользовательские сценарии (действия с бизнес-логикой)
├── entities/   Бизнес-сущности (API, hooks, типы, stores для доменных объектов)
├── shared/     Инфраструктура (UI-примитивы, утилиты, API-клиент, общие hooks)
└── core/       Инициализация приложения (Providers, глобальная конфигурация)

app/            Expo Router — навигация, layouts, tabs, error boundaries
```
* * *
## 1\. Правила импортов (ВАЖНО!)
Импорты разрешены **только вниз по иерархии**:
*   `app` → app-pages
*   `app-pages` → widgets, features, entities, shared
*   `widgets` → features, entities, shared
*   `features` → entities, shared
*   `entities` → shared
*   `shared` → только внешние библиотеки
Запрещено
*   ❌ Импорт вверх по иерархии
*   ❌ Горизонтальные импорты между модулями (слайсами) одного слоя (кроме shared)
*   ❌ Прямые импорты внутренних файлов модуля (только через index.ts)
### Public API Pattern
Каждый модуль экспортирует **только через index.ts**. Прямые импорты внутренних файлов модуля запрещены. Это обеспечивает инкапсуляцию и возможность рефакторинга.

```typescript
// Правильно
import { UserCard } from '@/entities/user'

// Неправильно
import { UserCard } from '@/entities/user/ui/UserCard'
```

### Структура слайса (Slice Structure)
Каждый слайс (модуль) в слоях `entities`, `features`, `widgets` имеет стандартную внутреннюю структуру:

```
entities/[name]/
├── api/              Endpoints, query keys, API-константы (consts.ts)
├── hooks/            React hooks (useQuery, useMutation)
├── model/            Типы, Zod-схемы, бизнес-логика, константы (consts.ts)
├── ui/               UI-компоненты сущности
└── index.ts          Public API

features/[domain]/
├── api/              API-запросы (если специфичны для feature)
├── hooks/            React hooks
├── model/            Типы, схемы, бизнес-логика
├── ui/               UI-компоненты feature
└── index.ts          Public API

widgets/[name]/
├── ui/               Композиция компонентов
└── index.ts          Public API

shared/
├── api/              Axios client, interceptors
├── config/           Конфигурация, env
├── consts/           Общие константы приложения
├── hooks/            Общие hooks (useDebounce, useMediaQuery)
├── lib/              Утилиты, хелперы
├── stores/           Глобальные Zustand stores
├── ui/               UI-примитивы (Button, Input, Card)
└── index.ts          Public API
```

**Сегменты:**
| Сегмент | Содержит | Запрещено |
| --- | --- | --- |
| `api/` | Endpoints, query keys, API-константы | — |
| `model/` | Типы, Zod-схемы, бизнес-логика, константы | React, TSX, CSS |
| `ui/` | React-компоненты | Бизнес-логика |

**Размещение констант:**
| Тип | Расположение |
| --- | --- |
| API-константы | `entities/[name]/api/consts.ts` |
| Бизнес-константы | `entities/[name]/model/consts.ts` |
| Общие константы | `shared/consts/` |

* * *
## 2\. Роль `app-pages`
`app-pages` — composition layer между `app/` (навигация Expo Router) и FSD-слоями.
Зачем:
*   Собирает экран из `widgets`/`features`/`entities`.
*   Позволяет держать `app/` чистым (без бизнес-логики).
*   Упрощает тестирование и переиспользование экранов.
*   Удобно для lazy-загрузки Screen-компонентов.
### **Пример интеграции с Expo Router**

```typescript
// app/(tabs)/deals.tsx
import { DealsPage } from '@/app-pages/deals';

export default function DealsScreen() {
  return <DealsPage />;
}
```

* * *
## 3\. Частые вопросы (FAQ)
### Где создавать новый экран?
1. Добавить route в `app/` (файловая структура Expo Router)
2. Собрать экран в `app-pages/[screen-name]/`
3. Создать widgets при необходимости композитного UI
4. Создать features в `features/[domain]/`
5. Создать entity в `entities/[name]/` (api, hooks, model)
### Где размещать API-запросы?
*   Endpoints и query keys определяются в `entities/[name]/api/`
*   Query hooks располагаются в `entities/[name]/hooks/`
*   Mutation hooks инвалидируют связанные queries при успехе
### Где хранить состояние?
*   **Server State (TanStack Query):** списки, детали сущностей, пагинация, поисковые результаты — любые данные с сервера
*   **Client State (Zustand):** модалки, выбранные элементы, временные UI-состояния
*   Zustand stores делятся на shared (глобальные) и entity-specific
### Где размещать UI-компоненты?
*   **shared/ui/** — базовые примитивы (Button, Input, Modal, Card)
*   **features/** — интерактивные компоненты с логикой (формы, фильтры)
*   **widgets/** — композиция примитивов и features в законченные блоки
### Что делать с `app/` директорией?
`app/` отвечает **исключительно за интеграцию с Expo Router**:
*   декларация экранов и навигации
*   layouts и tab groups
*   глубокие ссылки (deep linking)
*   error boundaries
*   импорт Screen-компонентов из `app-pages`
*   **Запрещено:** размещать бизнес- и UI-логику в `app/`
* * *
## 4\. Технологический стек

| Категория | Решение | Назначение |
| --- | --- | --- |
| Framework | React Native + Expo ~54 | Кросс-платформенная мобильная разработка |
| Навигация | Expo Router ~6 | Файловая навигация, deep linking |
| UI Runtime | React 19 | Компонентная модель |
| Типизация | TypeScript | Type safety |
| Server State | TanStack Query | Кэширование, синхронизация данных с сервером |
| Client State | Zustand | UI-состояние, минимальный boilerplate |
| Forms | React Hook Form + Zod | Производительные формы, type-safe валидация |
| Data Validation | Zod | Runtime-валидация |
| Styling | NativeWind + Tailwind | Утилитарный подход к стилям для React Native |
| API Client | Axios | Interceptors, централизованная обработка |
| Linting / Formatting | Biome | Единый code style |

* * *
## 5\. Специфика React Native
### Платформо-специфичный код
При необходимости различного поведения на iOS и Android:
*   `Component.ios.tsx` / `Component.android.tsx` — платформо-специфичные компоненты
*   `Platform.select()` — для небольших различий в стилях или логике
*   Размещать в том же слое, где используется компонент

### Паттерны навигации (Expo Router)
*   **Stack** — для иерархической навигации (детали, формы)
*   **Tabs** — для основных разделов приложения
*   **Drawer** — для боковой панели (если нужно)
*   **Modal** — для модальных экранов

```
app/
├── (tabs)/           Группа с табами
│   ├── _layout.tsx   Конфигурация Tabs
│   ├── index.tsx     Главный экран
│   └── about.tsx     О приложении
├── [id].tsx          Динамический роут (опционально)
└── _layout.tsx       Root layout с Stack
```

**Пример конфигурации Tabs:**

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
```

### Deep Linking
Конфигурация в `app.json`:

```json
{
  "expo": {
    "scheme": "myapp",
    "web": {
      "bundler": "metro"
    }
  }
}
```

* * *
## 6\. Работа с API
**Централизованный Axios instance**
*   Request interceptor — добавление auth headers (Bearer token).
*   Response interceptor — обработка ошибок, извлечение мета (пагинация).
*   Endpoints и query keys — в `entities/[name]/api`.
**Принцип:**
*   Hooks (query/mutation) располагаются в `entities/[name]/hooks/`.
*   Мутации инвалидации: mutation hooks инвалидации связанных queries при успехе.
* * *
## 7\. Управление состоянием и данные
**Разделение:**
*   Server State (TanStack Query) — все данные с сервера: списки, детали, фильтры, пагинация.
*   Client State (Zustand) — UI состояние (modals, drafts, selections), делится на `shared` и `entity-specific`.
**Практические правила:**
*   Колокация query hooks рядом с entity.
*   Использовать optimistic updates только для критичных UX-сценариев.
*   Не дублировать серверные данные в zustand (только UI-related).
* * *
## 8\. Стилизация и UI
**Подход:** Utility-first через NativeWind (Tailwind CSS для React Native). Темы реализуются через `useColorScheme` и условные классы. UI-компоненты — примитивы без бизнес-логики (в `shared/ui`). Бизнес-логика — в `features`/`entities`.

```typescript
// Пример тёмной темы
import { useColorScheme } from 'react-native';

function Card() {
  const colorScheme = useColorScheme();
  return (
    <View className={colorScheme === 'dark' ? 'bg-slate-800' : 'bg-white'}>
      {/* ... */}
    </View>
  );
}
```

* * *
## 9\. Формы и валидация
*   React Hook Form — управление состоянием формы.
*   Zod — схемы валидации, совместно с RHF через `zodResolver`.
*   Правило: схему валидации держать в `entities/[name]/validation` или рядом с feature.
* * *
## 10\. Обработка ошибок
**Уровни:**
*   Global Error Boundary — критические ошибки React.
*   Screen Error Boundary — ошибки конкретного экрана (Expo Router `error.tsx`).
*   Navigation Error Handling — ошибки навигации и deep linking.
*   API Interceptors — сетевые/HTTP ошибки (axios).
*   Query Error Handlers — TanStack Query handlers.
*   Form Validation — валидировать и показывать ошибки пользователю.
**Принципы:**
*   Graceful degradation.
*   Всегда пользовательская обратная связь.
*   Retry политики для временных сетевых ошибок.
*   Offline-first подход где возможно.
* * *
## 11\. Производительность и метрики качества
**Цели:**
*   Плавная анимация (60 FPS).
*   Быстрый запуск приложения (< 3 секунды).
*   Test coverage > 70%.
*   Type coverage > 90%.
*   Zero circular dependencies.
**Практики:**
*   Lazy loading экранов через Expo Router.
*   Виртуализация списков (FlatList, FlashList).
*   Оптимизация изображений (expo-image).
*   Мемоизация тяжёлых вычислений (useMemo, React.memo).
*   Избегать лишних re-renders.
* * *
## 12\. Безопасность
**Обязательные пункты:**
*   Auth: Bearer token, хранение в SecureStore (expo-secure-store).
*   API Interceptors: автоматическое добавление токена, обработка 401.
*   Secrets: только env vars через expo-constants (no hardcoded).
*   Dependencies: регулярный `npm audit` / Snyk / Dependabot.
*   Certificate Pinning: рассмотреть для критичных приложений.
* * *
## 13\. Архитектурные принципы (резюме)
*   Separation of Concerns.
*   Single Responsibility.
*   Unidirectional Data Flow.
*   Explicit Public API (index.ts).
*   Colocation: связанный код рядом (entity hooks + api + model).

* * *
