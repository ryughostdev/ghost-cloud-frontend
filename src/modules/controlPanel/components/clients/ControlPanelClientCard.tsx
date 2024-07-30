import type { ClientsControlPanel } from '../../interfaces/controlPanelInterface';
import { ControlPanelClientsServicesCard } from '../ControlPanelClientsServicesCard';

export const ControlPanelClientCard = ({
  client,
  refetch,
}: {
  client: ClientsControlPanel;
  refetch: () => void;
}) => {
  return (
    <div className="rounded-xl p-4 flex flex-col items-center gap-2 border-2 border-secundario w-[15rem] text-center ">
      <div className="flex flex-col h-1/3">
        <h4 className="">
          {client.id}-{client.name}
        </h4>
        <p>{client.email}</p>
      </div>
      {client.services.length > 0 ? (
        <div className="flex flex-col h-2/3">
          <h4>
            {' '}
            {client.services?.length} Servicio
            {client.services?.length === 1 ? '' : 's'}
          </h4>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {client.services.map((service) => (
              <ControlPanelClientsServicesCard
                key={service.id}
                userId={client.id}
                service={service}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No tiene servicios contratados</p>
      )}
    </div>
  );
};
