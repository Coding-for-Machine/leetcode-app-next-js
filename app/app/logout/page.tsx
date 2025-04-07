"use client";

import { redirect } from 'next/navigation';
import React from 'react';

const Logout_url = '/api/logout';  // To'g'ri URL

const Page = () => {
  async function LogoutSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  // Form yuborilishini oldini olish
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // To'g'ri header
      },
      body: JSON.stringify({}),  // Bo'sh body yuborish
    };
    
    const response = await fetch(Logout_url, requestOption);  // API ga so'rov yuborish
    
    if (response.ok) {
      const data = await response.json();  // Javobni olish
      redirect("/login")
    } else {
      console.error('Logout failed');
    }
  }

  return (
    <>
      <h1>Logout Here</h1>
      <form onSubmit={LogoutSubmit}>  {/* Form tagini qo'llash */}
        <button type="submit">Logout</button>  {/* Formda faqat button ishlatish */}
      </form>
    </>
  );
}

export default Page;
