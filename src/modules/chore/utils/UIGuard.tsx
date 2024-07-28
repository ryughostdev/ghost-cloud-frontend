import React, { useEffect, useState } from 'react';
import { checkUserStatus } from './checkUserStatus';
import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';
import { Spinner } from '@chore/components/Spinner';

export const UIGuard = ({
  children,
  isLoggedIn = false,
  roles = [],
  negativeRoles = [],
  isLoading = false,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  roles: number[];
  negativeRoles?: number[];
  isLoading?: boolean;
}) => {
  const user = useStore($user);
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    setPageLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Spinner isLoading={pageLoading} />

      <>
        {checkUserStatus({ isLoggedIn, roles, negativeRoles }) ? (
          children
        ) : (
          <div>
            {user.isLoggedIn ? 'No tiene Permisos' : 'Debe iniciar sesión'}
          </div>
        )}
      </>
    </>
  );
};
