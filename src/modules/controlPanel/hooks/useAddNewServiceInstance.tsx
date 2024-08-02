import { useDisclosure, type Selection } from '@nextui-org/react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { ghostToast } from '@/modules/chore/components/ghostToast';
import type { FormInitCreateClientServiceInstance } from '../interfaces/controlPanelInterface';
import { handleOnChange } from '@chore/utils/formUtils';
import { getServices } from '@/modules/services/services/servicesService';
import { getNextPaymentDate } from '@/modules/chore/utils/datesUtils';
import { createClientServiceInstance } from '@/modules/services/services/serviceInstancesService';
import type { ServiceInstancehandleSubmit } from '@/modules/services/interfaces/ServiceInstanceFormIterfaces';

export const useAddNewServiceInstance = ({
  userId,
  refetch,
  formInit,
}: {
  userId: number;
  refetch: () => void;
  formInit: FormInitCreateClientServiceInstance;
}) => {
  const { data: servicesData, status: servicesStatus } = getServices();
  const { mutate, status, isPending } = createClientServiceInstance();
  const [form, setForm] = useState(formInit);
  const [serviceIdValue, setServiceIdValue] = useState<Selection>(new Set());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (status === 'success') {
      ghostToast({ message: 'Servicio creado correctamente', type: 'ok' });
      refetch();
      onOpenChange();
    }
  }, [status]);
  useEffect(() => {
    if (
      // @ts-ignore
      serviceIdValue.size > 0 &&
      servicesData !== undefined &&
      servicesStatus === 'success'
    ) {
      const selectedPrice = servicesData.find(
        (service) =>
          service.id === parseInt(Array.from(serviceIdValue)[0].toString())
      )?.price;
      setForm((prev) => ({
        ...prev,
        price: selectedPrice || 0,
      }));
    }
  }, [serviceIdValue, servicesData, servicesStatus]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      paymentDate: getNextPaymentDate(new Date(), 'yyyy-MM-dd'),
    }));
  }, []);
  const serviceInstancehandleSubmit: ServiceInstancehandleSubmit = (e) => {
    e.preventDefault();
    if (form.price === 0) {
      ghostToast({
        message: 'El precio del servicio no puede ser 0',
        type: 'error',
      });
      return;
    }
    if (form.paymentDate === '') {
      ghostToast({
        message: 'La fecha de pago no puede estar vacía',
        type: 'error',
      });
      return;
    }
    if (form.ip === '') {
      ghostToast({
        message: 'La dirección IP no puede estar vacía',
        type: 'error',
      });
      return;
    }
    if (form.serviceUsername === '') {
      ghostToast({
        message: 'El nombre de usuario no puede estar vacío',
        type: 'error',
      });
      return;
    }
    if (form.servicePassword === '') {
      ghostToast({
        message: 'La contraseña no puede estar vacía',
        type: 'error',
      });
      return;
    }

    // @ts-ignore
    if (serviceIdValue.size > 0) {
      mutate({
        ...form,
        userId,
        serviceId: parseInt(Array.from(serviceIdValue)[0].toString()),
        paymentDate: new Date(form.paymentDate).toISOString(),
      });
    } else {
      ghostToast({
        message: 'Selecciona un servicio',
        type: 'error',
      });
      return;
    }
  };
  return {
    serviceInstanceForm: form,
    modalHandlers: { isOpen, onOpen, onOpenChange },
    serviceInstancehandleSubmit,
    serviceInstanceFormSelectHandlers: { serviceIdValue, setServiceIdValue },
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    ServicesDataFetching: { servicesData, servicesStatus },
    isPending,
  };
};
