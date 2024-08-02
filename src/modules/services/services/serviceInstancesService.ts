import { Server1API } from '@/modules/chore/config/constants';
import type {
  CreateServiceInstance,
  ServiceInstance,
} from '../interfaces/ServicesInterfaces';
import { fetchData, postData } from '@/modules/chore/services/HandleAPI';
import type { UpdateClientServiceInstance } from '@/modules/controlPanel/interfaces/controlPanelInterface';

export const getServiceInstancesbyUser = ({ userId }: { userId: number }) => {
  return fetchData<ServiceInstance[]>({
    key: 'ServiceInstanceService',
    url: `${Server1API}/services/instances/${userId}`,
  });
};
export const getServiceInstancesbyInstanceId = ({
  instanceId,
  isEnabled = true,
}: {
  instanceId: number;
  isEnabled?: boolean;
}) => {
  return fetchData<ServiceInstance>({
    key: 'GetInstanceByInstanceIdService',
    url: `${Server1API}/services/instances/${instanceId}`,
    isEnabled,
  });
};

export const updateClientServiceInstance = ({ id }: { id: number }) => {
  return postData<ServiceInstance, UpdateClientServiceInstance>({
    method: 'PATCH',
    key: 'UpdateClientServiceInstance',
    url: `${Server1API}/services/instances/${id}`,
  });
};
export const deleteClientServiceInstance = ({ id }: { id: number }) => {
  return postData<ServiceInstance>({
    method: 'DELETE',
    key: 'DeleteClientServiceInstance',
    url: `${Server1API}/services/instances/${id}`,
  });
};

export const createClientServiceInstance = () => {
  return postData<ServiceInstance, CreateServiceInstance>({
    method: 'POST',
    key: 'CreateClientServiceInstance',
    url: `${Server1API}/services/instances`,
  });
};
