import {
  useQuery,
  useMutation,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import { fetchAPI } from '@chore/utils/fetchAPI';
import { client } from '@chore/config/tanstack';

export const fetchData = <TResponse>({
  key,
  url,
}: {
  key: string;
  url: string;
}): UseQueryResult<TResponse, Error> => {
  return useQuery<TResponse, Error>(
    {
      queryKey: [key],
      queryFn: () => fetchAPI<TResponse>({ url }),
    },
    client
  );
};

export const postData = <TResponse>({
  key,
  url,
  method = 'POST',
  isFormData,
}: {
  key: string;
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  isFormData?: boolean;
}): UseMutationResult<TResponse, Error, unknown, unknown> => {
  return useMutation<TResponse, Error, unknown, unknown>(
    {
      mutationKey: [key],
      mutationFn: async (data?: any) => {
        return await fetchAPI<TResponse>({
          url,
          method,
          body: data ?? undefined,
          isFormData,
        });
      },
    },
    client
  );
};
