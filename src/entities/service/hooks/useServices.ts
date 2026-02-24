import { useQuery } from '@tanstack/react-query';
import { serviceApi } from '../api/serviceApi';
import { serviceKeys } from '../api/serviceKeys';

export function useServices() {
  return useQuery({
    queryKey: serviceKeys.lists(),
    queryFn: serviceApi.getAll,
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => serviceApi.getById(id),
    enabled: Boolean(id),
  });
}
