import { useEffect, useState } from 'react';
import type {
  ClientsControlPanel,
  ClientServiceInstance,
  ControlPanelFilters,
} from '../interfaces/controlPanelInterface';
import type { QueryStatus } from '@tanstack/query-core';
import { userRoles } from '@/modules/chore/config/constants';

export const useControlPanelClientsFilters = ({
  data,
  status,
}: {
  data: ClientsControlPanel[] | undefined;
  status: QueryStatus;
}) => {
  const [filteredData, setFilteredData] = useState<ClientsControlPanel[]>([]);
  const [filters, setFilters] = useState<ControlPanelFilters>({
    showAdmins: false,
    showUnactives: false,
    orderByPaymentDate: false,
  });

  useEffect(() => {
    if (status === 'success' && data) {
      let filtered = [...data].map((client) => {
        const services = client.services.sort(
          (a, b) =>
            new Date(a.paymentDate).getTime() -
            new Date(b.paymentDate).getTime()
        );
        return { ...client, services };
      });

      if (!filters.showAdmins) {
        filtered = filtered.filter((client) =>
          client.roles.every((role) => role.id !== userRoles.Admin.id)
        );
      }

      if (!filters.showUnactives) {
        filtered = filtered.filter((client) => client.status === 'active');
      }

      if (filters.orderByPaymentDate) {
        const getNearestPaymentDate = (services: ClientServiceInstance[]) => {
          if (services.length === 0) return new Date(0);
          return services
            .map((service) => new Date(service.paymentDate))
            .reduce((nearest, current) =>
              current < nearest ? current : nearest
            );
        };

        filtered = filtered.sort((a, b) => {
          const dateA = getNearestPaymentDate(a.services);
          const dateB = getNearestPaymentDate(b.services);
          return dateA.getTime() - dateB.getTime();
        });
      }

      setFilteredData(filtered);
    }
  }, [filters, data, status]);

  return {
    handleControlPanelClientsFilters: { filters, setFilters },
    filteredData,
  };
};
