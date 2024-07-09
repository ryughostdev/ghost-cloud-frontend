import type { LoggedUser } from '@/modules/auth/interfaces/LoginInterface';
import { atom } from 'nanostores';

export type AuthDataProps = LoggedUser;
export const $user = atom<AuthDataProps>({
  isLoggedIn: false,
  id: 0,
  name: '',
  email: '',
  status: 'inactive',
  roles: [2],
});
