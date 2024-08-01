export interface Service {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  memory: number;
  cores: number;
  disk: number;
  os: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ServiceInstance {
  id: number;
  serviceId: number;
  userId: number;
  ip: string;
  serviceUsername: string;
  servicePassword: string;
  paymentDate: Date | string;
  price: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  service: Service;
}

export interface CreateServiceInstance
  extends Omit<
    ServiceInstance,
    'id' | 'status' | 'createdAt' | 'updatedAt' | 'service'
  > {}
