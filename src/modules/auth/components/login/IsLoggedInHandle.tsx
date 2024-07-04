import { Button } from '@nextui-org/react';
import { useIsLoggedInHandle } from '@modules/auth/hooks/useIsLoggedInHandle';
import type { AuthDataProps } from '@/stores/users';

export const IsLoggedInHandle = ({ user }: { user: AuthDataProps }) => {
  const { handleLogout, isPending } = useIsLoggedInHandle({ user });
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Hola {user.name}</h1>
      {user.status !== 'active' && (
        <p className="p-5 text-slate-400">
          Tu cuenta no está activa, por lo tanto no vas a poder usar la
          aplicación, para activar tu cuenta si eres nuevo, simplemente debes
          revisar tu bandeja de correo electrónico de{' '}
          <span className="text-secundario">{user.email}</span> y buscar el
          correo para confirmarlo. Si ya lo hiciste contacta con nosotros para
          ayudarte específicamente con tu problema
        </p>
      )}
      <p>Ya has iniciado sesión, ¿Quieres cerrarla?</p>
      <div className="flex justify-center items-center gap-4">
        <Button
          isLoading={isPending}
          onClick={handleLogout}
          className="uppercase"
          color="danger"
        >
          Cerrar Sesion
        </Button>
      </div>
    </div>
  );
};
