import { $user } from '@/stores/users';
import {
  getLocalStorage /* setLocalStorage  */,
} from '../utils/handleLocalStorage';
/* import { useStore } from '@nanostores/react'; */

export const CheckIsLoggedIn = () => {
  /*  const user = useStore($user); */
  const checkLocalData = getLocalStorage('user');

  if (checkLocalData) {
    $user.set(checkLocalData);
  } else {
    /* setLocalStorage('user', user); */
  }
};
