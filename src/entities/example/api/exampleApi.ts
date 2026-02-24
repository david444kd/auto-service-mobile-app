import { apiClient } from '@/shared/api';
import type {
  CreateExampleParams,
  Example,
  ExampleList,
  UpdateExampleParams,
} from '../model/types';

const ENDPOINT = '/examples';

export const exampleApi = {
  getAll: async (): Promise<ExampleList> => {
    const { data } = await apiClient.get<ExampleList>(ENDPOINT);
    return data;
  },

  getById: async (id: string): Promise<Example> => {
    const { data } = await apiClient.get<Example>(`${ENDPOINT}/${id}`);
    return data;
  },

  create: async (params: CreateExampleParams): Promise<Example> => {
    const { data } = await apiClient.post<Example>(ENDPOINT, params);
    return data;
  },

  update: async ({ id, data: updateData }: UpdateExampleParams): Promise<Example> => {
    const { data } = await apiClient.patch<Example>(`${ENDPOINT}/${id}`, updateData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDPOINT}/${id}`);
  },
};
