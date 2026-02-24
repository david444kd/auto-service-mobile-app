import { apiClient } from '@/shared/api';
import type { Booking, BookingList, CreateBookingParams } from '../model/types';

const ENDPOINT = '/bookings';

const MOCK_BOOKINGS: BookingList = [
  {
    id: 'mock-1',
    serviceId: '1',
    service: { id: '1', name: 'Замена масла', emoji: '🔧' },
    status: 'confirmed',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    car: { make: 'Toyota Camry', year: 2020, plateNumber: 'А123ВС77' },
    customerName: 'Иван Иванов',
    customerPhone: '+79991234567',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    serviceId: '3',
    service: { id: '3', name: 'Шиномонтаж', emoji: '🔩' },
    status: 'completed',
    scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    car: { make: 'Toyota Camry', year: 2020, plateNumber: 'А123ВС77' },
    customerName: 'Иван Иванов',
    customerPhone: '+79991234567',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const bookingApi = {
  getAll: async (phone?: string): Promise<BookingList> => {
    return MOCK_BOOKINGS;
    const { data } = await apiClient.get<BookingList>(ENDPOINT, {
      params: phone ? { phone } : undefined,
    });
    return data;
  },

  getById: async (id: string): Promise<Booking> => {
    const { data } = await apiClient.get<Booking>(`${ENDPOINT}/${id}`);
    return data;
  },

  create: async (params: CreateBookingParams): Promise<Booking> => {
    const { data } = await apiClient.post<Booking>(ENDPOINT, params);
    return data;
  },

  cancel: async (id: string): Promise<Booking> => {
    const { data } = await apiClient.patch<Booking>(`${ENDPOINT}/${id}`, {
      status: 'cancelled',
    });
    return data;
  },
};
