import { Checkbox } from '@nextui-org/react';
import React from 'react';
import type { ControlPanelClientsFiltersProps } from '../../interfaces/controlPanelInterface';

export const ControlPanelClientsFilters: React.FC<
  ControlPanelClientsFiltersProps
> = ({ handleControlPanelClientsFilters }) => {
  const { filters, setFilters } = handleControlPanelClientsFilters;
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-lg font-bold">Filtros</h2>
      <div className="flex flex-wrap gap-2 w-full p-2">
        <Checkbox
          isSelected={filters.showAdmins}
          onValueChange={(value) =>
            setFilters((prev: any) => ({ ...prev, showAdmins: value }))
          }
        >
          Mostrar administradores
        </Checkbox>
        <Checkbox
          isSelected={filters.showUnactives}
          onValueChange={(value) =>
            setFilters((prev: any) => ({ ...prev, showUnactives: value }))
          }
        >
          Mostrar Usuarios inactivos
        </Checkbox>
      </div>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-bold">Orden</h2>
        <div className="flex flex-wrap gap-2 w-full p-2">
          <Checkbox
            isSelected={filters.orderByPaymentDate}
            onValueChange={(value) =>
              setFilters((prev: any) => ({
                ...prev,
                orderByPaymentDate: value,
              }))
            }
          >
            Por Fecha de vencimiento
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
