import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';

export const checkUserStatus = ({
  isLoggedIn = false,
  roles = [],
}: {
  isLoggedIn: boolean;
  roles: number[];
}): boolean => {
  const user = useStore($user);
  return (
    !isLoggedIn ||
    (isLoggedIn && user.isLoggedIn && roles.length === 0) ||
    roles.some((role) => user.roles.includes(role))
  );
};
