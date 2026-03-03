import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '../api/bookingApi';
import { bookingKeys } from '../api/bookingKeys';
import type { CreateBookingParams } from '../model/types';

export function useBookings() {
  return useQuery({
    queryKey: bookingKeys.lists(),
    queryFn: () => bookingApi.getAll(),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateBookingParams) => bookingApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingApi.cancel(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(bookingKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}
