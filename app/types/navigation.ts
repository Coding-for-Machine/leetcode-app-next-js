export interface NavLink {
    id: number;
    label: string;
    icon: string;
    href: string;
    authRequired: boolean;
    roles: UserRole[];
    description: string;
    mobileOrder: number;
    desktopOrder: number;
    adminOnly?: boolean;
  }
  
export type UserRole = 'student' | 'teacher' | 'admin' | 'staff';