import { z } from 'zod';

export const timeSlotSchema = z.object({
  time: z.string(),
  isAvailable: z.boolean(),
  scheduledAt: z.string(),
});

export const timeSlotListSchema = z.array(timeSlotSchema);

export type TimeSlot = z.infer<typeof timeSlotSchema>;
export type TimeSlotList = z.infer<typeof timeSlotListSchema>;
