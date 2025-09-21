'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, MouseEventHandler } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;          // default classes
  activeClassName?: string;    // classes applied when active
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const NavLink = ({
  href,
  children,
  className = '',
  activeClassName = 'text-primary font-bold',
  onClick,
}: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick} className={`${className} ${isActive ? activeClassName : ''}`}>
      {children}
    </Link>
  );
};

export default NavLink;
