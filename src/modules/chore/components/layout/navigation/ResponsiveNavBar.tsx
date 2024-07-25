import { useState } from 'react';
import { LoginNavButton } from './LoginNavButton';
import { NavbarLinks } from './NavbarLinks';
import { MenuButtonIcon } from '../../icons/MenuButtonIcon';
import { appName, userRoles } from '@/modules/chore/config/constants';
import type { LinksProps } from '@/modules/chore/interfaces/NavbarInterfaces';

export const ResponsiveNavBar = ({ pathName }: { pathName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links: LinksProps[] = [
    {
      name: 'Contacto',
      href: '/contacto',
      isLoggedIn: false,
      roles: [],
      negativeRoles: [userRoles.Admin.id],
    },
    {
      name: 'Mis servicios',
      href: '/mis-servicios',
      isLoggedIn: true,
      roles: [],
      negativeRoles: [userRoles.Admin.id],
    },
    {
      name: 'Panel de Control',
      href: '/panel-de-control',
      isLoggedIn: true,
      roles: [userRoles.Admin.id],
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
        className="fixed active:scale-85 right-2 flex items-center justify-center md:hidden"
      >
        <MenuButtonIcon />
      </button>
      <a href="/" className="text-xl font-bold font-code uppercase">
        {appName}
      </a>
      <nav className={`${isOpen ? 'flex' : 'hidden'} md:flex`}>
        <ul className="flex flex-col md:flex-row rounded-t-xl dark:border-secundario border-primario md:border-none border-2 fixed top-[5rem] md:top-auto right-0 h-full sm:w-1/2 md:w-full p-5 md:p-0 bg-slate-900 md:bg-transparent md:visible md:relative gap-4 z-50">
          <NavbarLinks pathName={pathName} links={links} />
          <LoginNavButton pathName={pathName} />
        </ul>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed top-[5rem] left-0 h-screen w-screen bg-primario/30 backdrop-blur-sm z-40"></div>
      )}
    </>
  );
};
