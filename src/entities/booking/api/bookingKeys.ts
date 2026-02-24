export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  listByPhone: (phone: string) => [...bookingKeys.all, 'list', phone] as const,
  detail: (id: string) => [...bookingKeys.all, 'detail', id] as const,
};
