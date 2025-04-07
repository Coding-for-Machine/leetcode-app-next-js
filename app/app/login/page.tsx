"use client";


import { useAuth } from '@/componets/AuthProvider';
import React from 'react'
const Login_url = '/api/login';  // To'g'ri URL

const Page = () => {
  const auth = useAuth()
  async function LoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Email:", email);
    console.log("Password:", password);

    // FormData ni obyektga aylantirish
    const ObjectFormData = Object.fromEntries(formData);
    const JsonData = JSON.stringify(ObjectFormData);

    // So'rov yuborish
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // To'g'ri header
      },
      body: JsonData,
    };

    // API so'rovini yuborish
    const response = await fetch(Login_url, requestOption);

    if (response.ok) {
      const data = await response.json();
      console.log(data);  // Konsolga chiqarish
      auth.login(data?.username)
    } else {
      console.error('Login failed');
    }
  }

  return (
    <>
      <h1>Login Here</h1>
      <form onSubmit={LoginSubmit}>
        <input type="email" name="email" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Page;
