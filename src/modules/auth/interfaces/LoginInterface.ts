export interface User {
  id: number;
  email: string;
  name: string;
  status: 'active' | 'inactive';
  roles: number[];
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
export interface LoggedUser extends User {
  isLoggedIn: boolean;
}
