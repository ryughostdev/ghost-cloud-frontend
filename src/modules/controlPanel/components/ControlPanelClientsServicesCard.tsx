import { translates } from '@/modules/chore/config/constants';
import { formatDate } from '@/modules/chore/utils/dataFormat';
import { DaysRemaining } from '@/modules/chore/utils/DaysRemaining';
import type { ClientServiceInstance } from '../interfaces/controlPanelInterface';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { updateClientServiceInstance } from '../services/clientsService';
import { ghostToast } from '@/modules/chore/components/ghostToast';
import { getNextPaymentDate } from '@/modules/chore/utils/datesUtils';

export const ControlPanelClientsServicesCard = ({
  userId,
  service,
  refetch,
}: {
  userId: number;
  service: ClientServiceInstance;
  refetch: () => void;
}) => {
  const { mutate, status } = updateClientServiceInstance({ id: service.id });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [checked, setChecked] = useState({
    serviceStatus: false,
    registerPayment: false,
  });

  useEffect(() => {
    if (status === 'success') {
      setChecked({ serviceStatus: false, registerPayment: false });
      ghostToast({ message: 'Servicio actualizado correctamente', type: 'ok' });
      refetch();
      onOpenChange();
    }
  }, [status, refetch]);

  const handleSubmit = () => {
    mutate({
      userId,
      paymentDate: checked.registerPayment
        ? getNextPaymentDate(service.paymentDate)
        : service.paymentDate,
      status: checked.serviceStatus
        ? service.status === 'active'
          ? 'inactive'
          : 'active'
        : service.status,
    });
  };

  return (
    <div
      onClick={onOpen}
      className={`flex flex-col items-center justify-center rounded-lg border-2 hover:cursor-pointer ${
        service.status === 'active' ? 'border-secundario' : 'border-red-600'
      } p-2 w-[12rem]`}
    >
      <p className="text-sm">
        {service.id}-{translates[service.status]}
      </p>
      <DaysRemaining expirationDate={service.paymentDate} />
      <p>{formatDate(service.paymentDate)}</p>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Servicio {service.id} - {translates[service.status]}
              </ModalHeader>
              <ModalBody>
                <div>
                  <Checkbox
                    isSelected={checked.serviceStatus}
                    onValueChange={(value) =>
                      setChecked((prev) => ({ ...prev, serviceStatus: value }))
                    }
                  >
                    ¿Cambiar estado del servicio a{' '}
                    <span className="font-bold">
                      {service.status === 'active' ? 'inactivo' : 'activo'}
                    </span>
                    ?
                  </Checkbox>
                </div>

                <div>
                  <Checkbox
                    isSelected={checked.registerPayment}
                    onValueChange={(value) =>
                      setChecked((prev) => ({
                        ...prev,
                        registerPayment: value,
                      }))
                    }
                  >
                    ¿Registrar pago? (el próximo vencimiento será el{' '}
                    {formatDate(getNextPaymentDate(service.paymentDate))})
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
