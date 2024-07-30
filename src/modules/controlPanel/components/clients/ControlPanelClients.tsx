import { getUsers } from '../../services/clientsService';
import { UIGuard } from '@/modules/chore/utils/UIGuard';
import { userRoles } from '@/modules/chore/config/constants';
import { ControlPanelClientCard } from './ControlPanelClientCard';
import { ControlPanelClientsFilters } from './ControlPanelClientsFilters';
import { useControlPanelClientsFilters } from '../../hooks/useControlPanelClientsFilters';

export const ControlPanelClients = () => {
  const { data, status, isLoading, refetch } = getUsers();
  const { filteredData, handleControlPanelClientsFilters } =
    useControlPanelClientsFilters({ data, status });

  return (
    <UIGuard
      isLoading={isLoading}
      isLoggedIn={true}
      roles={[userRoles.Admin.id]}
    >
      {status === 'success' && (
        <div className="w-full h-full">
          <div className="flex flex-col items-center rounded-xl border-2 border-secundario w-full h-[10rem]">
            <ControlPanelClientsFilters
              handleControlPanelClientsFilters={
                handleControlPanelClientsFilters
              }
            />
          </div>
          <h1 className="text-lg font-bold my-5">Listado de Clientes</h1>
          <div className="flex flex-wrap gap-4">
            {filteredData?.map((client) => (
              <ControlPanelClientCard
                key={client.id}
                client={client}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      )}
    </UIGuard>
  );
};
