import { useState } from 'react';
import { MenuButtonIcon } from '../../icons/MenuButtonIcon';
import type { LinksProps } from '@/modules/chore/interfaces/NavbarInterfaces';
import { userRoles } from '@/modules/chore/config/constants';
import { NavbarLinks } from '../navigation/NavbarLinks';

export const ResponsiveControlPanelNavBar = ({
  pathName,
}: {
  pathName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const links: LinksProps[] = [
    {
      name: 'Clientes',
      href: '/panel-de-control/clientes',
      isLoggedIn: true,
      roles: [userRoles.Admin.id],
    },
    {
      name: 'Servicios',
      href: '/panel-de-control/servicios',
      isLoggedIn: true,
      roles: [userRoles.Admin.id],
    },
  ];
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú de panel de control"
        className="active:scale-85 fixed top-2 left-2 mt-2 flex items-center justify-center md:hidden bg-primario p-1 z-50"
      >
        <MenuButtonIcon />
      </button>
      <nav
        className={`${
          isOpen ? 'flex' : 'hidden md:flex'
        } p-6 w-1/4 h-full flex fixed flex-col items-center rounded-xl bg-slate-900 md:bg-secundario md:dark:bg-primario border-2 border-primario dark:border-secundario text-primario dark:text-secundario z-30`}
      >
        <ul className="flex flex-col items-center pt-6 gap-4">
          <NavbarLinks pathName={pathName} links={links} />
        </ul>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed top-[5rem] left-0 h-screen w-screen bg-primario/30 backdrop-blur-sm z-20"></div>
      )}
    </>
  );
};
