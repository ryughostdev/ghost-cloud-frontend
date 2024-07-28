import { translates } from '@/modules/chore/config/constants';
import type { ClientsControlPanel } from '../../interfaces/controlPanelInterface';
import { DaysRemaining } from '@/modules/chore/utils/DaysRemaining';
import { formatDate } from '@/modules/chore/utils/dataFormat';

export const ControlPanelClientCard = ({
  client,
}: {
  client: ClientsControlPanel;
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
              <div
                className={`flex flex-col items-center justify-center rounded-lg border-2 ${
                  service.status === 'active'
                    ? 'border-secundario'
                    : 'border-red-600'
                } p-2 w-[12rem]`}
                key={service.id}
              >
                <p className="text-sm">
                  {service.id}-{translates[service.status]}
                </p>
                <DaysRemaining expirationDate={service.paymentDate} />
                <p>{formatDate(service.paymentDate)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No tiene servicios contratados</p>
      )}
    </div>
  );
};
