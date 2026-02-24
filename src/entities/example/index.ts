// Сущность Example — см. правила FSD в SPECIFICATION.md
// Структура: api/ | hooks/ | model/ | ui/ | index.ts

export { exampleApi, exampleKeys, EXAMPLE_ENDPOINTS, EXAMPLE_STALE_TIME, EXAMPLE_CACHE_TIME } from './api';
export {
  useCreateExample,
  useDeleteExample,
  useExample,
  useExamples,
  useUpdateExample,
} from './hooks';
export type { CreateExampleParams, Example, ExampleList, UpdateExampleParams } from './model/types';
export { exampleListSchema, exampleSchema } from './model/types';
export { EXAMPLE_STATUS, EXAMPLE_LIMITS } from './model/consts';
export { ExampleCard } from './ui';
