import { userRoles } from '@/modules/chore/config/constants';
import type { LinksProps } from '@/modules/chore/interfaces/NavbarInterfaces';
import { checkUserStatus } from '@/modules/chore/utils/checkUserStatus';

export const ControlPanelNavbarLinks = ({ pathName }: { pathName: string }) => {
  const links: LinksProps[] = [
    {
      name: 'Clientes',
      href: '/panel-de-control/clientes',
      isLoggedIn: true,
      roles: [userRoles.Admin.id],
    },
    {
      name: 'Servicios',
      href: 'panel-de-control/servicios',
      isLoggedIn: true,
      roles: [userRoles.Admin.id],
    },
  ];

  return (
    <>
      {links.map(({ name, href, isLoggedIn, roles, negativeRoles }) =>
        checkUserStatus({ isLoggedIn, roles, negativeRoles }) ? (
          <li key={name}>
            <a
              href={href}
              className={`linkNav relative font-code ${
                pathName.includes(href) &&
                'border-l-2 border-primario dark:border-secundario '
              }`}
            >
              {name}
              <span className="absolute bottom-0 left-0 w-0 h-0 border-t-2 border-primario dark:border-secundario transition-all duration-300" />
            </a>
          </li>
        ) : null
      )}
    </>
  );
};
