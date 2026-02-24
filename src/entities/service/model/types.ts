import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
  description: z.string(),
  durationMinutes: z.number(),
  priceFrom: z.number(),
  isActive: z.boolean(),
});

export const serviceListSchema = z.array(serviceSchema);

export type Service = z.infer<typeof serviceSchema>;
export type ServiceList = z.infer<typeof serviceListSchema>;
