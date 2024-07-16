import { useState } from 'react';
import { LoginNavButton } from './LoginNavButton';
import { NavbarLinks } from './NavbarLinks';
import { MenuButtonIcon } from '../../icons/MenuButtonIcon';
import { appName } from '@/modules/chore/config/constants';

export const ResponsiveNavBar = ({ pathName }: { pathName: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-1 flex items-center justify-center md:hidden"
      >
        <MenuButtonIcon />
      </button>
      <a href="/" className="text-xl font-bold font-code uppercase">
        {appName}
      </a>
      <nav className={`${isOpen ? 'flex' : 'hidden'} md:flex`}>
        <ul className="flex flex-col md:flex-row fixed top-[5rem] md:top-auto right-0 h-screen sm:w-1/2 md:w-full md:h-full p-5 md:p-0 bg-slate-900 md:bg-transparent md:visible md:relative gap-4 z-50">
          <NavbarLinks pathName={pathName} />
          <LoginNavButton pathName={pathName} />
        </ul>
      </nav>
      {isOpen && (
        <div className="md:hidden fixed top-[5rem] left-0 h-screen w-screen bg-primario/30 backdrop-blur-sm z-40"></div>
      )}
    </>
  );
};
