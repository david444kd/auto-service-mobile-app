# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npx expo start          # Start Expo dev server
npx expo run:ios        # Launch iOS simulator
npx expo run:android    # Launch Android emulator

# Code quality
npm run lint            # Lint with Biome
npm run lint:fix        # Auto-fix lint issues
npm run format          # Format with Biome
npm run check           # Run full Biome check (lint + format)
npm run check:fix       # Auto-fix all Biome issues
npm run typecheck       # TypeScript type checking

# Maintenance
npm run clean           # Clean deps and build artifacts
```

No test framework is configured.

## Architecture

This is a **React Native + Expo** app using **Feature-Sliced Design (FSD)** — a strict layered architecture with enforced dependency rules.

### Layer Hierarchy (top → bottom)

```
app/             # Expo Router file-based navigation (entry point)
src/app-pages/   # Screen composition — assembles widgets/features into pages
src/widgets/     # Reusable UI compositions (no business logic)
src/features/    # User-facing features with business logic
src/entities/    # Domain business entities (api, hooks, model, ui)
src/shared/      # Infrastructure: api client, config, hooks, lib, stores, ui primitives
src/core/        # App initialization: providers (QueryProvider, AppProviders)
```

**Dependency rule:** each layer may only import from layers below it. No reverse or horizontal imports between slices.

### Import Rules

- All imports go through each slice's public `index.ts` — never import internal files directly.
- Use path aliases: `@/shared`, `@/entities`, `@/features`, `@/widgets`, `@/app-pages`, `@/core`

```typescript
// ✓ Correct
import { Button } from '@/shared/ui'
import { UserCard } from '@/entities/user'

// ✗ Wrong — bypasses public API
import { UserCard } from '@/entities/user/ui/UserCard'
```

### Slice Structure

Each entity/feature/widget follows:
```
[name]/
├── api/       # Axios calls and TanStack Query keys
├── hooks/     # useQuery / useMutation hooks
├── model/     # TypeScript types, Zod schemas, business logic
├── ui/        # React components
└── index.ts   # Public API (only export from here)
```

### Key Tech

| Concern | Library |
|---------|---------|
| Navigation | Expo Router (file-based, in `app/`) |
| Styling | NativeWind + Tailwind CSS (utility classes on RN components) |
| Server state | TanStack React Query (stale: 5min, cache: 30min, retry: 2) |
| Client state | Zustand (`src/shared/stores/` — UI store: loading, toasts, modals) |
| Forms | React Hook Form + Zod |
| HTTP | Axios with interceptors (`src/shared/api/`) |
| Linting/Formatting | Biome (replaces ESLint + Prettier) |

### Environment

Configure via `.env.local` (see `.env.example`). Accessed through `src/shared/config/env.ts`. All vars are prefixed `EXPO_PUBLIC_`:
- `API_URL` — defaults to `https://api.example.com`
- `API_TIMEOUT` — defaults to `10000`
- `APP_ENV` — `development` | `staging` | `production`
- `DEBUG` — `false` by default
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` — required for Firebase
- `GOOGLE_CLIENT_ID`, `GOOGLE_IOS_CLIENT_ID` — for Google OAuth via `expo-auth-session`

### Firebase & Auth

Firebase SDK (`firebase/app`, `firebase/auth`, `firebase/firestore`) is initialized in `src/shared/lib/firebase/`. The singleton `firebaseApp` guards against double-initialization.

Auth state is managed by `AuthProvider` (`src/core/providers/AuthProvider.tsx`) which subscribes to `onAuthStateChanged` and writes to `useAuthStore` (Zustand, in `src/shared/stores/authStore.ts`). Read auth state with the pre-built selectors:
```typescript
import { useCurrentUser, useAuthLoading } from '@/shared/stores';
```

Auth operations (sign-in, sign-up, sign-out) live in `src/entities/auth/api/authApi.ts` and call Firebase directly — no Axios involved.

### Navigation Groups

```
app/
├── (auth)/       # Unauthenticated screens: login, register
├── (tabs)/       # Main tab group (protected)
└── _layout.tsx   # Root Stack with AuthProvider
```

Route guarding is handled at the root layout level based on `useCurrentUser()` / `useAuthLoading()` from the auth store.

### Biome Style Rules

- 2-space indent, 100-char line width, LF line endings
- Single quotes in JS, double quotes in JSX
- Semicolons always required
- Imports auto-organized

See **SPECIFICATION.md** for full FSD architectural documentation and naming conventions.
