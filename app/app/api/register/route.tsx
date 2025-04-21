// app/api/register/route.ts
"use server";

import { NextResponse } from 'next/server';

const DJANGO_API = process.env.DJANGO_SERVER_BASE_API;

const DJANGO_REGISTER_URL = `${DJANGO_API}/user/register`;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(DJANGO_REGISTER_URL)
    const response = await fetch(DJANGO_REGISTER_URL, {
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      let errorMessage = "server error"
      if ("username" in error.error){
        let errorMessage = "Username Allaqchon mavjud"
      }
      else if ("email" in error.error){
        let errorMessage = "email Allaqchon mavjud"
      }
      // Xatoliklarni o'z ichiga olgan holatda, har bir maydon uchun xatolikni ajratib ko'rsatish

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const user = await response.json();

    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal server error"}, { status: 500 });
  }
}
