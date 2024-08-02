import { Input, Select, SelectItem } from '@nextui-org/react';
import type { ServiceInstanceFormProps } from '../interfaces/ServiceInstanceFormIterfaces';

export const ServiceInstanceForm = ({
  serviceInstanceFormSelectHandlers,
  ServicesDataFetching,
  serviceInstancehandleSubmit,
  serviceInstanceForm,
  handleOnChange,
  formName,
}: ServiceInstanceFormProps) => {
  const { serviceIdValue, setServiceIdValue } =
    serviceInstanceFormSelectHandlers;
  const { servicesData, servicesStatus } = ServicesDataFetching;
  const { ip, serviceUsername, servicePassword, paymentDate, price } =
    serviceInstanceForm;

  return (
    <form
      className="flex flex-col justify-center items-center gap-4"
      id={formName}
      onSubmit={serviceInstancehandleSubmit}
    >
      <Select
        isLoading={servicesStatus === 'pending'}
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
  );
};
