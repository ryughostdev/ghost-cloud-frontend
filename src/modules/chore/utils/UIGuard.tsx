import React from 'react';
import { checkUserStatus } from './checkUserStatus';
import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';

export const UIGuard = ({
  children,
  isLoggedIn = false,
  roles = [],
  negativeRoles = [],
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  roles: number[];
  negativeRoles?: number[];
}) => {
  const user = useStore($user);
  return (
    <div>
      {checkUserStatus({ isLoggedIn, roles, negativeRoles }) ? (
        children
      ) : (
        <div>
          {user.isLoggedIn ? 'No tiene Permisos' : 'Debe iniciar sesión'}
        </div>
      )}
    </div>
  );
};
