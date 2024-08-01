import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useAddNewServiceInstance } from '../../hooks/useAddNewServiceInstance';

export const AddNewServiceInstance = ({
  userId,
  refetch,
}: {
  userId: number;
  refetch: () => void;
}) => {
  const {
    modalHandlers,
    handleSubmit,
    selectHandlers,
    handleOnChange,
    dataFetching,
    ip,
    serviceUsername,
    servicePassword,
    paymentDate,
    price,
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
  const { serviceIdValue, setServiceIdValue } = selectHandlers;
  const { servicesData, servicesStatus } = dataFetching;
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
                <form
                  className="flex flex-col justify-center items-center gap-4"
                  id="serviceInstanceForm"
                  onSubmit={handleSubmit}
                >
                  {servicesStatus === 'success' && (
                    <Select
                      isRequired
                      selectedKeys={serviceIdValue}
                      onSelectionChange={setServiceIdValue}
                      items={servicesData}
                      label="Selecciona un servicio"
                      className="max-w-xs"
                    >
                      {(service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                          textValue={`${service.name} - ${service.id} ( $${service.price} )`}
                        >
                          {`${service.name} - ${service.id} (${service.cores} cores - ${service.memory} GB - ${service.disk} GB - $${service.price})`}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                  <Input
                    isRequired
                    label="Dirección IP"
                    placeholder="Ingresa la dirección IP"
                    type="text"
                    className="max-w-xs"
                    value={ip}
                    onChange={handleOnChange}
                    name="ip"
                  />
                  <Input
                    isRequired
                    label="Nombre de usuario"
                    placeholder="Ingresa el nombre de usuario"
                    type="text"
                    className="max-w-xs"
                    value={serviceUsername}
                    onChange={handleOnChange}
                    name="serviceUsername"
                  />
                  <Input
                    isRequired
                    label="Contraseña"
                    placeholder="Ingresa la contraseña"
                    type="text"
                    className="max-w-xs"
                    value={servicePassword}
                    onChange={handleOnChange}
                    name="servicePassword"
                  />
                  <Input
                    isRequired
                    label="Fecha de pago"
                    placeholder="Ingresa la fecha de pago"
                    type="date"
                    className="max-w-xs"
                    value={paymentDate.toString()}
                    onChange={handleOnChange}
                    name="paymentDate"
                  />

                  <Input
                    isRequired
                    label="Precio"
                    placeholder="Ingresa el precio"
                    type="number"
                    className="max-w-xs"
                    value={price.toString()}
                    onChange={handleOnChange}
                    name="price"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
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
