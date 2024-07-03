import { $user } from '@/stores/users';
import { verifyEmailService } from '../../services/authService';
import { useStore } from '@nanostores/react';
import { setLocalStorage } from '@/modules/chore/utils/handleLocalStorage';
import { ghostToast } from '@/modules/chore/components/ghostToast';
import { useEffect } from 'react';

export const VerifyEmail = ({ token }: { token: string }) => {
  const user = useStore($user);
  const { status, mutate } = verifyEmailService({ token });
  useEffect(() => {
    if (token) {
      mutate({});
    }
  }, [token]);

  useEffect(() => {
    if (status === 'success') {
      $user.set({ ...user, status: 'active' });
      setLocalStorage('user', { ...user, status: 'active' });
      ghostToast({ message: `Correo verificado correctamente` });
    } else if (status === 'error') {
      ghostToast({ message: 'Ha ocurrido un error', type: 'error' });
    }
  }, [status]);

  return (
    <div>
      {status === 'pending'
        ? 'Verificando...'
        : status === 'success'
        ? 'Correo verificado correctamente'
        : 'Token inválido'}
    </div>
  );
};
