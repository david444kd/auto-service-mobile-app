// Константы бизнес-логики для сущности Example
// Правила размещения констант см. в SPECIFICATION.md

export const EXAMPLE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const;

export const EXAMPLE_LIMITS = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;
