"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLink, UserRole } from '@/types/navigation';
import { useAuth } from './AuthProvider';
import NavLinks, { AdminLinks, filterLinksByRole, NonUserLinks, sortLinks } from './layot/NavLink';
import { useEffect, useState } from 'react';
import User from '@/types/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated, getUserData, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserData();
      if (data) setUser(data);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, getUserData]);

  const userRole = user?.role as UserRole | null;

  const getFilteredLinks = (): NavLink[] => {
    const baseLinks = filterLinksByRole(NavLinks, userRole, isAuthenticated);
    const adminLinks = userRole === 'admin'
      ? filterLinksByRole(AdminLinks, userRole, isAuthenticated)
      : [];

    return [...baseLinks, ...adminLinks];
  };

  const mobileLinks = sortLinks(getFilteredLinks(), true);
  const desktopLinks = sortLinks(getFilteredLinks());
  const authLinks = isAuthenticated ? [] : sortLinks(NonUserLinks);

  return (
    <div className="flex items-center justify-between w-full">
      {/* Desktop menyu */}
      <nav className="hidden lg:flex space-x-1">
        {desktopLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`px-3 py-2 text-sm font-medium flex items-center transition-colors ${
              pathname === link.href
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600'
            }`}
          >
            <i className={`fas fa-${link.icon} mr-2`}></i>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* User Avatar / Auth Links */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Sozlamalar</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-red-600 cursor-pointer"
              >
                Chiqish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-x-2">
            {authLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  link.label === 'Kirish'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                }`}
              >
                <i className={`fas fa-${link.icon} mr-2`}></i>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobil menyu */}
      <ul className="space-y-2 mb-6 lg:hidden mt-4">
        {mobileLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <i className={`fas fa-${link.icon} mr-2`}></i>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
