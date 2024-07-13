import { userRoles } from '@/modules/chore/config/constants';
import { UIGuard } from '@/modules/chore/utils/UIGuard';
import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';
import { getServiceInstancesbyUser } from '../../services/serviceInstancesService';
import { CardMyServices } from './CardMyServices';

export const MyServices = () => {
  const user = useStore($user);
  const { data, status } = getServiceInstancesbyUser({
    userId: user.id,
  });

  return (
    <UIGuard isLoggedIn={true} roles={[userRoles.User.id]}>
      <div>
        <h1 className="text-3xl text-center font-semibold">Mis Servicios</h1>
        <p className="text-center text-slate-400 mb-4">
          Aquí podrás ver los servicios que has contratado
        </p>
        {status === 'success' && (
          <div className="flex flex-wrap gap-3">
            {data.map((service) => (
              <CardMyServices key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </UIGuard>
  );
};
