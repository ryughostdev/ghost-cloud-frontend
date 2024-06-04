import { useStore } from '@nanostores/react';
import { $user } from '@/stores/users';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { postData } from '@/modules/chore/services/HandleAPI';
import { Server1API } from '@/modules/chore/config/constants';
import { setLocalStorage } from '@/modules/chore/utils/handleLocalStorage';
export const useIsLoggedInHandle = () => {
  const user = useStore($user);
  const { data, error, status, mutate, isPending } = postData({
    key: 'logout',
    url: `${Server1API}/auth/logout`,
    method: 'GET',
  });

  useEffect(() => {
    if (status === 'success') {
      $user.set(data);
      setLocalStorage('user', data);
      /*  toast.success(`Nos vemos pronto ${user.user.username}`); */
    } else if (status === 'error') toast.error(error?.message || '');
    return () => toast.dismiss();
  }, [user, status, error]);

  const handleLogout = () => {
    mutate({});
  };

  return {
    handleLogout,
    isPending,
  };
};
