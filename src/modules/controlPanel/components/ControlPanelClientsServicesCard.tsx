import { translates } from '@/modules/chore/config/constants';
import {
  convertDateForInput,
  formatDate,
} from '@/modules/chore/utils/dataFormat';
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
  type Selection,
} from '@nextui-org/react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { ghostToast } from '@/modules/chore/components/ghostToast';
import { getNextPaymentDate } from '@/modules/chore/utils/datesUtils';
import { ServiceInstanceForm } from '@/modules/services/components/ServiceInstanceForm';
import { getServices } from '@/modules/services/services/servicesService';
import {
  deleteClientServiceInstance,
  getServiceInstancesbyInstanceId,
  updateClientServiceInstance,
} from '@/modules/services/services/serviceInstancesService';
import { handleOnChange } from '@/modules/chore/utils/formUtils';

export const ControlPanelClientsServicesCard = ({
  userId,
  service,
  refetch,
}: {
  userId: number;
  service: ClientServiceInstance;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [checked, setChecked] = useState({
    serviceStatus: false,
    registerPayment: false,
    updateClientServiceInstance: false,
    deleteClientServiceInstance: false,
  });
  const {
    mutate: mutateUpdateServiceInstance,
    status: statusUpdateServiceInstance,
  } = updateClientServiceInstance({ id: service.id });
  const {
    mutate: mutateDeleteServiceInstance,
    status: statusDeleteServiceInstance,
  } = deleteClientServiceInstance({ id: service.id });
  const { data: servicesData, status: servicesStatus } = getServices();
  const {
    data: instanceData,
    status: instanceStatus,
    refetch: instanceRefetch,
  } = getServiceInstancesbyInstanceId({
    instanceId: service.id,
  });
  const [form, setForm] = useState({
    ip: '',
    serviceUsername: '',
    servicePassword: '',
    paymentDate: '',
    price: 0,
  });
  const [serviceIdValue, setServiceIdValue] = useState<Selection>(
    new Set([service.serviceId.toString()])
  );
  useEffect(() => {
    if (checked.updateClientServiceInstance) {
      setChecked((prev) => ({
        ...prev,
        registerPayment: false,
        serviceStatus: false,
        deleteClientServiceInstance: false,
      }));
      instanceRefetch();
    }
  }, [checked.updateClientServiceInstance]);
  useEffect(() => {
    if (checked.deleteClientServiceInstance) {
      setChecked((prev) => ({
        ...prev,
        registerPayment: false,
        serviceStatus: false,
        updateClientServiceInstance: false,
      }));
    }
  }, [checked.deleteClientServiceInstance]);
  useEffect(() => {
    if (instanceStatus === 'success') {
      setForm({
        ip: instanceData.ip,
        serviceUsername: instanceData.serviceUsername,
        servicePassword: instanceData.servicePassword,
        paymentDate: convertDateForInput(instanceData.paymentDate),
        price: instanceData.price,
      });
    }
  }, [instanceStatus, instanceData]);

  useEffect(() => {
    if (!isOpen) {
      setChecked({
        serviceStatus: false,
        registerPayment: false,
        updateClientServiceInstance: false,
        deleteClientServiceInstance: false,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (statusUpdateServiceInstance === 'success') {
      setChecked({
        serviceStatus: false,
        registerPayment: false,
        updateClientServiceInstance: false,
        deleteClientServiceInstance: false,
      });
      setForm({
        ip: '',
        serviceUsername: '',
        servicePassword: '',
        paymentDate: '',
        price: 0,
      });
      ghostToast({ message: 'Servicio actualizado correctamente', type: 'ok' });
      refetch();
      onOpenChange();
    }
  }, [statusUpdateServiceInstance, refetch]);

  useEffect(() => {
    if (statusDeleteServiceInstance === 'success') {
      setChecked({
        serviceStatus: false,
        registerPayment: false,
        updateClientServiceInstance: false,
        deleteClientServiceInstance: false,
      });
      setForm({
        ip: '',
        serviceUsername: '',
        servicePassword: '',
        paymentDate: '',
        price: 0,
      });
      ghostToast({ message: 'Servicio eliminado correctamente', type: 'ok' });
      refetch();
      onOpenChange();
    }
  }, [statusDeleteServiceInstance, refetch]);

  const handleSubmit = () => {
    if (checked.updateClientServiceInstance) {
      serviceInstancehandleSubmit();
      return;
    } else if (checked.deleteClientServiceInstance) {
      mutateDeleteServiceInstance(undefined);
      return;
    } else {
      mutateUpdateServiceInstance({
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
    }
  };
  const serviceInstancehandleSubmit = () => {
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
      mutateUpdateServiceInstance({
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
  return (
    <Button
      onPress={onOpen}
      className={`flex flex-col items-center justify-center rounded-lg border-2 ${
        service.status === 'active' ? 'border-secundario' : 'border-red-600'
      } p-2 w-[12rem] h-full dark:bg-primario`}
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
                <div className="p-2">
                  <Checkbox
                    isDisabled={
                      checked.updateClientServiceInstance ||
                      checked.deleteClientServiceInstance
                    }
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
                <div className="p-2">
                  <Checkbox
                    isDisabled={
                      checked.updateClientServiceInstance ||
                      checked.deleteClientServiceInstance
                    }
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
                <div className="p-2">
                  <Checkbox
                    isSelected={checked.updateClientServiceInstance}
                    isDisabled={
                      checked.deleteClientServiceInstance ||
                      checked.serviceStatus ||
                      checked.registerPayment
                    }
                    onValueChange={(value) =>
                      setChecked((prev) => ({
                        ...prev,
                        updateClientServiceInstance: value,
                      }))
                    }
                  >
                    ¿Actualizar Servicio?
                  </Checkbox>
                  {checked.updateClientServiceInstance && (
                    <ServiceInstanceForm
                      serviceInstanceFormSelectHandlers={{
                        serviceIdValue,
                        setServiceIdValue,
                      }}
                      ServicesDataFetching={{ servicesData, servicesStatus }}
                      serviceInstanceForm={form}
                      handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleOnChange(setForm, e)
                      }
                      serviceInstancehandleSubmit={serviceInstancehandleSubmit}
                      formName="UpdateserviceInstanceForm"
                    />
                  )}
                </div>
                <div className="bg-red-500/10 p-2 rounded-lg">
                  <Checkbox
                    isSelected={checked.deleteClientServiceInstance}
                    isDisabled={
                      checked.updateClientServiceInstance ||
                      checked.serviceStatus ||
                      checked.registerPayment
                    }
                    onValueChange={(value) =>
                      setChecked((prev) => ({
                        ...prev,
                        deleteClientServiceInstance: value,
                      }))
                    }
                  >
                    ¿Eliminar servicio?{' '}
                    {checked.deleteClientServiceInstance && (
                      <span className="text-red-600 font-bold">CUIDADO</span>
                    )}
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  form="UpdateserviceInstanceForm"
                  color="primary"
                  onPress={handleSubmit}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Button>
  );
};
