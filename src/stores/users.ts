import type { LoggedUser } from '@/modules/auth/interfaces/LoginInterface';
import { atom } from 'nanostores';

export type AuthDataProps = LoggedUser;
export const $user = atom<AuthDataProps>({
  isLoggedIn: false,
  id: 0,
  name: '',
  email: '',
  status: 'inactive',
  createdAt: new Date(),
  updatedAt: new Date(),
  services: [
    {
      id: 0,
      name: '',
      status: 'inactive',
      memory: 0,
      cores: 0,
      disk: 0,
      os: '',
      price: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  roles: [
    {
      id: 0,
      name: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
});
