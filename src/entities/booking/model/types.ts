import { z } from 'zod';

export const bookingStatusSchema = z.enum([
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
]);

export const carSchema = z.object({
  make: z.string().min(1, 'Укажите марку и модель'),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  plateNumber: z.string().min(1, 'Укажите гос. номер'),
});

export const bookingSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  service: z.object({
    id: z.string(),
    name: z.string(),
    emoji: z.string(),
  }).optional(),
  status: bookingStatusSchema,
  scheduledAt: z.string(),
  car: carSchema,
  customerName: z.string(),
  customerPhone: z.string(),
  comment: z.string().optional(),
  createdAt: z.string(),
});

export const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  service: z.object({
    id: z.string(),
    name: z.string(),
    emoji: z.string(),
  }),
  scheduledAt: z.string().min(1, 'Выберите дату и время'),
  car: carSchema,
  customerName: z.string().min(2, 'Введите имя'),
  customerPhone: z.string().min(10, 'Введите корректный номер телефона'),
  comment: z.string().optional(),
});

export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type Car = z.infer<typeof carSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type BookingList = Booking[];
export type CreateBookingParams = z.infer<typeof createBookingSchema>;
