import { atom } from 'nanostores';
interface LoginDataResponse {
  id: number;
  username: string;
  email: string;
  active: boolean;
  isLoggedIn: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthDataProps = LoginDataResponse;
export const $user = atom<AuthDataProps>({
  isLoggedIn: false,
  id: 0,
  username: '',
  email: '',
  active: false,
  createdAt: '',
  updatedAt: '',
});
