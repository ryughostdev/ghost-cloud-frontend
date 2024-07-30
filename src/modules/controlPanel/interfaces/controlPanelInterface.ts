import type { User } from '@/modules/auth/interfaces/LoginInterface';
import type { ServiceInstance } from '@/modules/services/interfaces/ServicesInterfaces';
import type React from 'react';

export interface ClientServiceInstance
  extends Pick<
    ServiceInstance,
    'id' | 'serviceId' | 'status' | 'paymentDate'
  > {}

export interface UpdateClientServiceInstance extends Partial<ServiceInstance> {}

export interface ClientsControlPanel extends Omit<User, 'roles'> {
  roles: { id: number }[];
  createdAt: Date;
  updatedAt: Date;
  services: ClientServiceInstance[];
}

export interface ControlPanelFilters {
  showAdmins: boolean;
  showUnactives: boolean;
  orderByPaymentDate: boolean;
}

type SetFilters = React.Dispatch<React.SetStateAction<ControlPanelFilters>>;

export interface ControlPanelClientsFiltersProps {
  handleControlPanelClientsFilters: {
    filters: ControlPanelFilters;
    setFilters: SetFilters;
  };
}
