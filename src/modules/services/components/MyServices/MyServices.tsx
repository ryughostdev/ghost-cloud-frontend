import { userRoles } from '@/modules/chore/config/constants';
import { UIGuard } from '@/modules/chore/utils/UIGuard';
import { $user } from '@/stores/users';
import { useStore } from '@nanostores/react';
import { getServiceInstancesbyUser } from '../../services/serviceInstancesService';
import { formatDate } from '@/modules/chore/utils/dataFormat';
import { DaysRemaining } from '@/modules/chore/utils/DaysRemaining';
import { Button, Link } from '@nextui-org/react';
import { ghostToast } from '@/modules/chore/components/ghostToast';

export const MyServices = () => {
  const user = useStore($user);
  const { data, status } = getServiceInstancesbyUser({
    userId: user.id,
  });

  const handleCopyText = (text: string, elementName: string) => {
    navigator.clipboard.writeText(text);
    ghostToast({ message: `${elementName} copiado al portapapeles` });
  };
  return (
    <UIGuard isLoggedIn={true} roles={[userRoles.User.id]}>
      <div>
        <h1 className="text-3xl text-center font-semibold">Mis Servicios</h1>
        <p className="text-center text-slate-400 mb-4">
          Aquí podrás ver los servicios que has contratado
        </p>
        {status === 'success' && (
          <div>
            {data.map((service) => (
              <div
                className="flex flex-col items-center justify-center border-1 border-slate-500 p-4 rounded-md w-[15rem] h-[20rem] gap-4 group hover:bg-slate-200 hover:text-primario transition duration-300 ease-in-out"
                key={service.id}
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="flex gap-2 justify-center">
                    <h2>{service.service.name}</h2>
                    <small>{service.id}</small>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-4">
                    <DaysRemaining expirationDate={service.paymentDate} />(
                    {formatDate(service.paymentDate)})
                  </div>
                  <div className="bg-slate-800 p-2 rounded-md mt-4 group-hover:bg-slate-300">
                    <p
                      onClick={() => handleCopyText(service.ip, 'IP')}
                      className="cursor-pointer hover:font-bold"
                    >
                      IP: {service.ip}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyText(service.serviceUsername, 'Username')
                      }
                      className="cursor-pointer hover:font-bold"
                    >
                      User: {service.serviceUsername}
                    </p>
                    <p
                      onClick={() =>
                        handleCopyText(service.servicePassword, 'Password')
                      }
                      className="cursor-pointer hover:font-bold"
                    >
                      Pass: {service.servicePassword}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center w-1/3">
                  <Button as={Link} href={`/mis-servicios/${service.id}`}>
                    Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UIGuard>
  );
};
