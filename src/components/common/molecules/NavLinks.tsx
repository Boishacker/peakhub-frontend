import React from 'react';
import { NavLink } from 'react-router-dom';
import type { UserRole } from '../../../types/auth';

interface NavItem {
  name: string;
  path: string;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About', path: '/about' },
  { name: 'Student Dashboard', path: '/dashboard/student', roles: ['student'] },
  { name: 'Instructor Dashboard', path: '/dashboard/instructor', roles: ['instructor'] },
  { name: 'Admin Panel', path: '/admin', roles: ['admin'] },
  { name: 'Moderation', path: '/moderation', roles: ['moderator'] },
];

interface NavLinksProps {
  userRole?: UserRole | null;
  className?: string;
  mobile?: boolean;
}

const NavLinks = ({ userRole, className = '', mobile = false }: NavLinksProps) => {
  const filteredNavItems = navItems.filter(item => 
    !item.roles || (userRole && item.roles.includes(userRole))
  );

  const linkClasses = mobile 
    ? 'block py-2 px-4 text-base font-medium text-secondary-900 hover:bg-secondary-100 hover:text-primary-600 w-full text-left'
    : 'inline-block py-2 px-4 text-sm font-medium text-secondary-900 hover:text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all hover:after:w-full';

  const activeClasses = mobile
    ? 'bg-secondary-100 text-primary-600'
    : 'text-primary-600 after:w-full';

  return (
    <nav className={className}>
      <ul className={mobile ? 'space-y-1' : 'flex space-x-1'}>
        {filteredNavItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `${linkClasses} ${isActive ? activeClasses : ''}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks; 