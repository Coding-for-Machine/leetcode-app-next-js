// api/login
"use server";

import { setAccessToken, setRefreshToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API = process.env.DJANGO_SERVER_BASE_API;
const DJANGO_LOGIN_URL = `${DJANGO_API}/user/login`;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const response = await fetch(DJANGO_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Login failed" },
        { status: response.status }
      );
    }

    const { tokens, user } = await response.json();

    if (!tokens) {
      return NextResponse.json(
        { error: "Token not found in response" },
        { status: 500 }
      );
    }

    // Diqqat: bu funksiyalar sync bo‘lishi kerak
    await setAccessToken(tokens.access);
    await setRefreshToken(tokens.refresh);

    // setUserData bu yerda ishlatilmaydi, bu clientda ishlatiladi
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
