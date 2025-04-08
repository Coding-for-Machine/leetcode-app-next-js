"use client";

import React from "react";
import { useAuth } from "@/components/AuthProvider";

const LoginPage = () => {
  const auth = useAuth();
  const LoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();

      // Client localStorage'ga user'ni saqlaymiz
      
      auth.login(resData.user, '/profil'); // `user` obyekt kelyapti
    } else {
      const error = await response.json();
      alert(error.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={LoginSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
