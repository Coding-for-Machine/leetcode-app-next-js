"use client";

import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome back!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please login</p>
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
}
