// componenets/layot/NavLink.tsx
import { NavLink, UserRole } from '@/types/navigation';


const NavLinks: NavLink[] = [
    {
        id: 1,
        label: "Bosh sahifa",
        icon: "compass",
        href: "/",
        authRequired: false,
        roles: ["student", "teacher", "admin", "staff"],
        description: "Asosiy sahifaga qaytish",
        mobileOrder: 1,
        desktopOrder: 1
    },
    {
        id: 2,
        label: "Masalalar",
        icon: "list-ol",
        href: "/problems",
        authRequired: false,
        roles: ["student", "teacher", "admin", "staff"],
        description: "Barcha masalalar ro'yxati",
        mobileOrder: 2,
        desktopOrder: 2
    },
    {
        id: 3,
        label: "Tanlovlar",
        icon: "trophy",
        href: "/contest",
        authRequired: true,
        roles: ["student", "teacher", "admin", "staff"],
        description: "Qatnashish uchun tanlovlar",
        mobileOrder: 4,
        desktopOrder: 3
    },
    {
        id: 4,
        label: "Testlar",
        icon: "file-alt",
        href: "/test",
        authRequired: true,
        roles: ["student", "teacher", "admin", "staff"],
        description: "O'z bilimingizni sinab ko'ring",
        mobileOrder: 3,
        desktopOrder: 4
    },
    {
        id: 5,
        label: "Muhokama",
        icon: "comments",
        href: "/discussions",
        authRequired: true,
        roles: ["student", "teacher", "admin", "staff"],
        description: "Dasturlash bo'yicha muhokamalar",
        mobileOrder: 5,
        desktopOrder: 5
    }
];

export const NonUserLinks: NavLink[] = [
    {
        id: 1,
        label: "Ro'yxatdan o'tish",
        icon: "user-plus",
        href: "/signup",
        authRequired: false,
        roles: [],
        description: "Yangi hisob yaratish",
        mobileOrder: 1,
        desktopOrder: 1
    },
    {
        id: 2,
        label: "Kirish",
        icon: "sign-in-alt",
        href: "/login",
        authRequired: false,
        roles: [],
        description: "Mavjud hisobga kirish",
        mobileOrder: 2,
        desktopOrder: 2
    }
];

export const AdminLinks: NavLink[] = [
    {
        id: 1,
        label: "Admin panel",
        icon: "user-shield",
        href: "/admin",
        authRequired: true,
        roles: ["admin"],
        description: "Sayt boshqaruvi",
        mobileOrder: 6,
        desktopOrder: 6,
        adminOnly: true
    },
    {
        id: 2,
        label: "Foydalanuvchilar",
        icon: "users",
        href: "/admin/users",
        authRequired: true,
        roles: ["admin"],
        description: "Barcha foydalanuvchilar ro'yxati",
        mobileOrder: 7,
        desktopOrder: 7,
        adminOnly: true
    }
];

// Linklarni saralash uchun yordamchi funksiya
export const sortLinks = (links: NavLink[], isMobile: boolean = false): NavLink[] => {
    return [...links].sort((a, b) => 
        isMobile ? a.mobileOrder - b.mobileOrder : a.desktopOrder - b.desktopOrder
    );
};

// Foydalanuvchi roliga qarab linklarni filter qilish
export const filterLinksByRole = (
    links: NavLink[], 
    userRole: UserRole | null, 
    isAuthenticated: boolean
): NavLink[] => {
    return links.filter(link => {
        const roleAllowed = link.roles.length === 0 || (userRole && link.roles.includes(userRole));
        const authRequired = link.authRequired ? isAuthenticated : true;
        const adminCheck = link.adminOnly ? userRole === 'admin' : true;
        return roleAllowed && authRequired && adminCheck;
    });
};

export default NavLinks;