import { z } from 'zod';

// Zod-схемы — TypeScript-типы выводятся из них
export const exampleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Заголовок обязателен'),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'archived']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const exampleListSchema = z.array(exampleSchema);

export const createExampleSchema = exampleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Типы, выведенные из схем
export type Example = z.infer<typeof exampleSchema>;
export type ExampleList = z.infer<typeof exampleListSchema>;
export type CreateExampleParams = z.infer<typeof createExampleSchema>;

export interface UpdateExampleParams {
  id: string;
  data: Partial<Omit<Example, 'id' | 'createdAt' | 'updatedAt'>>;
}
