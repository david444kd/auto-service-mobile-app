import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { exampleApi } from '../api/exampleApi';
import { exampleKeys } from '../api/exampleKeys';
import type { CreateExampleParams, UpdateExampleParams } from '../model/types';

export function useExamples() {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: exampleApi.getAll,
  });
}

export function useExample(id: string) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => exampleApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateExampleParams) => exampleApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}

export function useUpdateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateExampleParams) => exampleApi.update(params),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(exampleKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}

export function useDeleteExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => exampleApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: exampleKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
