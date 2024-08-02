import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useAddNewServiceInstance } from '../../hooks/useAddNewServiceInstance';
import { ServiceInstanceForm } from '@/modules/services/components/ServiceInstanceForm';

export const AddNewServiceInstance = ({
  userId,
  refetch,
}: {
  userId: number;
  refetch: () => void;
}) => {
  const {
    modalHandlers,
    serviceInstancehandleSubmit,
    serviceInstanceForm,
    serviceInstanceFormSelectHandlers,
    handleOnChange,
    ServicesDataFetching,
    isPending,
  } = useAddNewServiceInstance({
    userId,
    refetch,
    formInit: {
      ip: '',
      serviceUsername: '',
      servicePassword: '',
      paymentDate: '',
      price: 0,
    },
  });
  const { isOpen, onOpen, onOpenChange } = modalHandlers;

  return (
    <>
      <Button
        onPress={onOpen}
        className=" flex flex-col items-center justify-center p-2 w-[12rem] h-full rounded-lg border-2 border-emerald-600 text-emerald-600 dark:bg-primario"
      >
        <p className="text-center">+</p>
        <p className="text-center">Agregar Servicio</p>
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Formulario de nuevo servicio
              </ModalHeader>
              <ModalBody>
                <ServiceInstanceForm
                  serviceInstanceFormSelectHandlers={
                    serviceInstanceFormSelectHandlers
                  }
                  ServicesDataFetching={ServicesDataFetching}
                  serviceInstanceForm={serviceInstanceForm}
                  handleOnChange={handleOnChange}
                  serviceInstancehandleSubmit={serviceInstancehandleSubmit}
                  formName="serviceInstanceForm"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  isLoading={isPending}
                  form="serviceInstanceForm"
                  color="primary"
                  type="submit"
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
