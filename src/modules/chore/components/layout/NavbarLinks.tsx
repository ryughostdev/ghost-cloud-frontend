import { useStore } from '@nanostores/react';
import { type LinksProps } from '../../interfaces/NavbarInterfaces';
import { $user } from '@/stores/users';
export const NavbarLinks = ({ pathName }: { pathName: string }) => {
  const user = useStore($user);
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
        !isLoggedIn ||
        (isLoggedIn && user.isLoggedIn && roles.length === 0) ||
        roles.some((role) => user.roles.includes(role)) ? (
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
