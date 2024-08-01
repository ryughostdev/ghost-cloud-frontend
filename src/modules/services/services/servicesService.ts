import { Server1API } from '@/modules/chore/config/constants';
import type { Service } from '../interfaces/ServicesInterfaces';
import { fetchData } from '@/modules/chore/services/HandleAPI';

export const getServices = () => {
  return fetchData<Service[]>({
    key: 'getServices',
    url: `${Server1API}/services`,
  });
};
