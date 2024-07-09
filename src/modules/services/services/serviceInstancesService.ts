import { Server1API } from '@/modules/chore/config/constants';
import type { ServiceInstance } from '../interfaces/ServicesInterfaces';
import { fetchData } from '@/modules/chore/services/HandleAPI';

export const getServiceInstancesbyUser = ({ userId }: { userId: number }) => {
  return fetchData<ServiceInstance[]>({
    key: 'ServiceInstanceService',
    url: `${Server1API}/services/instances/${userId}`,
  });
};
