"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateForm = (data: { username: string, email: string, password: string }) => {
    const { username, email, password } = data;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    return null;
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();
      alert("Successfully registered!");
      router.push("/login"); // or automatically log in later
    } else {
      const error = await response.json();

      // Show backend errors
      if (error.email) {
        setError(`Email error: ${error.email}`);
      } else if (error.username) {
        setError(`Username error: ${error.username}`);
      } else {
        setError(error.error || "Registration failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleRegisterSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="w-full px-4 py-2 border rounded"
        />
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
