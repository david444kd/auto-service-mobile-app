import { useQuery } from '@tanstack/react-query';
import { timeSlotApi } from '../api/timeSlotApi';
import { timeSlotKeys } from '../api/timeSlotKeys';

export function useTimeSlots(serviceId: string, date: string) {
  return useQuery({
    queryKey: timeSlotKeys.byServiceAndDate(serviceId, date),
    queryFn: () => timeSlotApi.getSlots(serviceId, date),
    enabled: Boolean(serviceId) && Boolean(date),
  });
}
