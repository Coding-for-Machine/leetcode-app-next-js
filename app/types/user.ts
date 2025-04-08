interface User {
    id: string;
    username: string;
    email?: string;
    role: 'student' | 'teacher' | 'admin' | 'staff';
    avatar?: string;
    isPremium?: boolean;
    createdAt?: string;
  }
export default User;