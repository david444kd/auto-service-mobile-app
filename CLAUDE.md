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

Configure via `.env.local` (see `.env.example`). Accessed through `src/shared/config/env.ts`:
- `API_URL` — defaults to `https://api.example.com`
- `API_TIMEOUT` — defaults to `10000`
- `APP_ENV` — `development` | `staging` | `production`

### Biome Style Rules

- 2-space indent, 100-char line width, LF line endings
- Single quotes in JS, double quotes in JSX
- Semicolons always required
- Imports auto-organized

See **SPECIFICATION.md** for full FSD architectural documentation and naming conventions.
