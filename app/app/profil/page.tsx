"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import User from "@/types/user";

export default function ProfilePage() {
  const { isAuthenticated, login, logout, getUserData } = useAuth();
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

  return (
    <div className="p-4">
      {isAuthenticated && user ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Welcome back, {user.username}!</h2>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
          )}
          <p>Email: {user.email || "No email"}</p>
          <p>Role: {user.role}</p>
          <p>Premium User: {user.isPremium ? "✅ Yes" : "❌ No"}</p>
          
          <p>Joined: {user.createdAt && new Date(user.createdAt).toLocaleDateString()}</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">Please login to view your profile</p>
          
        </div>
      )}
    </div>
  );
}
