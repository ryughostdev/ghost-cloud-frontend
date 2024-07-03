import { atom } from 'nanostores';
interface LoginDataResponse {
  id: number;
  name: string;
  email: string;
  status: string;
  isLoggedIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthDataProps = LoginDataResponse;
export const $user = atom<AuthDataProps>({
  isLoggedIn: false,
  id: 0,
  name: '',
  email: '',
  status: 'inactive',
  createdAt: '',
  updatedAt: '',
});
