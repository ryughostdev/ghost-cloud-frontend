import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { Service } from './ServicesInterfaces';
import type { FormInitCreateClientServiceInstance } from '@/modules/controlPanel/interfaces/controlPanelInterface';
import type { Selection } from '@nextui-org/react';

export interface ServiceInstanceFormSelectHandlers {
  serviceIdValue: Selection;
  setServiceIdValue: Dispatch<SetStateAction<Selection>>;
}
export interface ServicesDataFetching {
  servicesData: Service[] | undefined;
  servicesStatus: 'idle' | 'pending' | 'success' | 'error';
}
export interface ServiceInstancehandleSubmit {
  // eslint-disable-next-line no-unused-vars
  (e: ChangeEvent<HTMLFormElement>): void;
}
export interface ServiceInstanceFormProps {
  serviceInstanceFormSelectHandlers: ServiceInstanceFormSelectHandlers;
  ServicesDataFetching: ServicesDataFetching;
  serviceInstanceForm: FormInitCreateClientServiceInstance;
  handleOnChange: any;
  serviceInstancehandleSubmit: ServiceInstancehandleSubmit;
  formName: string;
}
