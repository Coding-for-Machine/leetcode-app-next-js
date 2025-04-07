"use client";

import { useAuth } from "@/componets/AuthProvider";


export default function Home() {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? `Salom, ${username}` : "Hello guest"}
      {isAuthenticated && <button onClick={logout}>Logout</button>}
    </div>
  );
}
