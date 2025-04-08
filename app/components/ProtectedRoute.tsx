// components/ProtectedRoute.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loginRequiredRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      loginRequiredRedirect();
    }
  }, [isAuthenticated, loginRequiredRedirect]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Yoki loading spinner
  }

  return <>{children}</>;
}