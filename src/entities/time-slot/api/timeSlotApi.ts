import { apiClient } from '@/shared/api';
import type { TimeSlotList } from '../model/types';

export const timeSlotApi = {
  getSlots: async (serviceId: string, date: string): Promise<TimeSlotList> => {
    const { data } = await apiClient.get<TimeSlotList>(`/services/${serviceId}/slots`, {
      params: { date },
    });
    return data;
  },
};
