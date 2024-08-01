import { Server1API } from '@/modules/chore/config/constants';
import { fetchData } from '@/modules/chore/services/HandleAPI';
import type { ClientsControlPanel } from '../interfaces/controlPanelInterface';

export const getUsers = () => {
  return fetchData<ClientsControlPanel[]>({
    key: 'ClientsControlPanel',
    url: `${Server1API}/users`,
  });
};
