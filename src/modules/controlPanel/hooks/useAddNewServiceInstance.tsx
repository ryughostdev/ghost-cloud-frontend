import { useDisclosure, type Selection } from '@nextui-org/react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { ghostToast } from '@/modules/chore/components/ghostToast';
import type { FormInitCreateClientServiceInstance } from '../interfaces/controlPanelInterface';
import { handleOnChange } from '@chore/utils/formUtils';
import { getServices } from '@/modules/services/services/servicesService';
import { getNextPaymentDate } from '@/modules/chore/utils/datesUtils';
import { createClientServiceInstance } from '@/modules/services/services/serviceInstancesService';

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
  const { mutate, status } = createClientServiceInstance();
  const [form, setForm] = useState(formInit);
  const [serviceIdValue, setServiceIdValue] = useState<Selection>(new Set());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (status === 'success') {
      ghostToast({ message: 'Servicio creado correctamente', type: 'ok' });
      refetch();
      onOpenChange();
    }
  }, [status, refetch]);
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
  const handleSubmit = () => {
    // @ts-ignore
    if (serviceIdValue.size > 0) {
      mutate({
        ...form,
        userId,
        serviceId: parseInt(Array.from(serviceIdValue)[0].toString()),
        paymentDate: new Date(form.paymentDate).toISOString(),
      });
    }
  };
  return {
    ...form,
    modalHandlers: { isOpen, onOpen, onOpenChange },
    handleSubmit,
    selectHandlers: { serviceIdValue, setServiceIdValue },
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    dataFetching: { servicesData, servicesStatus },
  };
};
