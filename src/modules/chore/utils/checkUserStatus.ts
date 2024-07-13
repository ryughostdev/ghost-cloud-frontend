import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';

export const checkUserStatus = ({
  isLoggedIn = false,
  roles = [],
  negativeRoles = [],
}: {
  isLoggedIn: boolean;
  roles: number[];
  negativeRoles?: number[];
}): boolean => {
  const user = useStore($user);
  // Verificar si el usuario tiene alguno de los negativeRoles
  const hasNegativeRoles = negativeRoles.some((negativeRole) =>
    user.roles.includes(negativeRole)
  );

  // Si el usuario tiene algún rol negativo, devolver false
  if (hasNegativeRoles) {
    return false;
  }

  // Verificar si el usuario cumple con los requisitos positivos
  return (
    !isLoggedIn ||
    (isLoggedIn && user.isLoggedIn && roles.length === 0) ||
    roles.some((role) => user.roles.includes(role))
  );
};
