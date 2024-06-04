import { Button } from '@nextui-org/react';
import { useIsLoggedInHandle } from './useIsLoggedInHandle';
import { useStore } from '@nanostores/react';
import { $user } from '@/stores/users';

export const IsLoggedInHandle = () => {
  const { handleLogout, isPending } = useIsLoggedInHandle();
  const user = useStore($user);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Hola {user.name}</h1>
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
