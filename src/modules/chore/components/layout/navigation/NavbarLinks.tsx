import { userRoles } from '../../../config/constants';
import { type LinksProps } from '../../../interfaces/NavbarInterfaces';
import { checkUserStatus } from '../../../utils/checkUserStatus';
export const NavbarLinks = ({ pathName }: { pathName: string }) => {
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
