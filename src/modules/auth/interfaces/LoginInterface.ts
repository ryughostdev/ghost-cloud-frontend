export interface User {
  id: number;
  email: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  services: ServiceInstance[];
  roles: Roles[];
}
export interface ServiceInstance {
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

export interface Roles {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface LoggedUser extends User {
  isLoggedIn: boolean;
}
