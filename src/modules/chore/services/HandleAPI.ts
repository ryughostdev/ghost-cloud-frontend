import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchAPI } from '@chore/utils/fetchAPI';
import { client } from '@chore/config/tanstack';

export const fetchData = (key: string, url: string): UseQueryResult => {
  return useQuery(
    {
      queryKey: [key],
      queryFn: () => fetchAPI({ url }),
    },
    client
  );
};
