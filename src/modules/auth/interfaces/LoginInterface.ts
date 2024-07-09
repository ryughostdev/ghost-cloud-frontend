export interface User {
  id: number;
  email: string;
  name: string;
  status: 'active' | 'inactive';
  roles: number[];
}
export interface LoggedUser extends User {
  isLoggedIn: boolean;
}
