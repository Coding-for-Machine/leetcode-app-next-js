"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLink, UserRole } from '@/types/navigation';
import { useAuth } from './AuthProvider';
import NavLinks, { AdminLinks, filterLinksByRole, NonUserLinks, sortLinks } from './layot/NavLink';

const Navbar = () => {
    const pathname = usePathname();
    const { isAuthenticated, user } = useAuth();
    const userRole = user?.role as UserRole | null;
    
    // Foydalanuvchi uchun linklarni olish
    const getFilteredLinks = (): NavLink[] => {
        const baseLinks = filterLinksByRole(NavLinks, userRole, isAuthenticated);
        const adminLinks = userRole === 'admin' 
            ? filterLinksByRole(AdminLinks, userRole, isAuthenticated) 
            : [];
        
        return [...baseLinks, ...adminLinks];
    };
    
    // Mobil menyu uchun linklar
    const mobileLinks = sortLinks(getFilteredLinks(), true);
    
    // Desktop menyu uchun linklar
    const desktopLinks = sortLinks(getFilteredLinks());
    
    // Foydalanuvchi kirish/chiqish linklari
    const authLinks = isAuthenticated 
        ? [] 
        : sortLinks(NonUserLinks);
    
    return (
        <>
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
            
            {/* Mobil menyu */}
            <ul className="space-y-2 mb-6 lg:hidden">
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
            
            {/* Autentifikatsiya linklari */}
            <div className="space-y-2">
                {authLinks.map((link) => (
                    <Link
                        key={link.id}
                        href={link.href}
                        className={`w-full block ${
                            link.label === 'Kirish' 
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        } px-4 py-2 rounded-lg font-medium text-center`}
                    >
                        <i className={`fas fa-${link.icon} mr-2`}></i>
                        {link.label}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;