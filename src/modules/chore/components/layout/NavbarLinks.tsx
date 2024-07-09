import { type LinksProps } from '../../interfaces/NavbarInterfaces';
import { checkUserStatus } from '../../utils/checkUserStatus';
export const NavbarLinks = ({ pathName }: { pathName: string }) => {
  const links: LinksProps[] = [
    {
      name: 'Contacto',
      href: '/contacto',
      isLoggedIn: false,
      roles: [],
    },
    {
      name: 'Mis servicios',
      href: '/mis-servicios',
      isLoggedIn: true,
      roles: [],
    },
  ];

  return (
    <>
      {links.map(({ name, href, isLoggedIn, roles }) =>
        checkUserStatus({ isLoggedIn, roles }) ? (
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
