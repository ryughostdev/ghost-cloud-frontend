import { ghostToast } from '@/modules/chore/components/ghostToast';
import { EndContentInputPassword } from '@/modules/auth/components/login/EndContentInputPassword';
import { useState } from 'react';
import { formatDate } from '@/modules/chore/utils/dataFormat';
import { DaysRemaining } from '@/modules/chore/utils/DaysRemaining';
import type { ServiceInstance } from '../../interfaces/ServicesInterfaces';
/* import { Button, Link } from '@nextui-org/react'; */

export const CardMyServices = ({ service }: { service: ServiceInstance }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleCopyText = (text: string, elementName: string) => {
    navigator.clipboard.writeText(text);
    ghostToast({ message: `${elementName} copiado al portapapeles` });
  };

  return (
    <div className="flex flex-col items-center justify-center border-1 border-slate-500 p-4 rounded-md w-[17rem] h-[20rem] gap-4 group hover:bg-slate-200 hover:text-primario transition duration-300 ease-in-out">
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
            onClick={() => handleCopyText(service.serviceUsername, 'Username')}
            className="cursor-pointer hover:font-bold"
          >
            User: {service.serviceUsername}
          </p>
          <div
            onClick={() => handleCopyText(service.servicePassword, 'Password')}
            className="cursor-pointer hover:font-bold flex gap-2"
          >
            Pass:{' '}
            <div className="flex items-center gap-1">
              <input
                value={service.servicePassword}
                type={isVisible ? 'text' : 'password'}
                className="bg-transparent cursor-pointer hover:font-bold w-full focus:outline-none focus:ring-0 focus:border-transparent"
                readOnly
              />
              <EndContentInputPassword
                isVisible={isVisible}
                toggleVisibility={toggleVisibility}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center w-1/3">
                  <Button as={Link} href={`/mis-servicios/${service.id}`}>
                    Detalles
                  </Button>
                </div> */}
    </div>
  );
};
