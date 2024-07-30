import { Server1API } from '@/modules/chore/config/constants';
import { fetchData, postData } from '@/modules/chore/services/HandleAPI';
import type {
  ClientsControlPanel,
  UpdateClientServiceInstance,
} from '../interfaces/controlPanelInterface';
import type { ServiceInstance } from '@/modules/services/interfaces/ServicesInterfaces';

export const getUsers = () => {
  return fetchData<ClientsControlPanel[]>({
    key: 'ClientsControlPanel',
    url: `${Server1API}/users`,
  });
};
export const updateClientServiceInstance = ({ id }: { id: number }) => {
  return postData<ServiceInstance, UpdateClientServiceInstance>({
    method: 'PATCH',
    key: 'UpdateClientServiceInstance',
    url: `${Server1API}/services/instances/${id}`,
  });
};
