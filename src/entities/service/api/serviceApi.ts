import { apiClient } from '@/shared/api';
import type { Service, ServiceList } from '../model/types';

const ENDPOINT = '/services';

export const serviceApi = {
  getAll: async (): Promise<ServiceList> => {
    const { data } = await apiClient.get<ServiceList>(ENDPOINT);
    return data;
  },

  getById: async (id: string): Promise<Service> => {
    const { data } = await apiClient.get<Service>(`${ENDPOINT}/${id}`);
    return data;
  },
};
