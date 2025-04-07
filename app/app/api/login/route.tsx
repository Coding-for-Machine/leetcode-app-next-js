"use server"

import { setAccessToken, setRefreshToken, getToken, getRefreshToken } from '@/lib/Auth'
import { NextResponse } from 'next/server'

const DJANGO_LOGIN_URL = 'http://127.0.0.1:8000/api/token/pair'

export async function POST(request: Request) {
  try {

    // Foydalanuvchi yuborgan login ma'lumotlarini olish
    const data = await request.json()

    // Django API'ga so'rov yuborish
    const response = await fetch(DJANGO_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    // Xato javobni qaytarish
    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.detail || "Login failed" }, { status: response.status })
    }

    // Javobni olish
    const responseData = await response.json()

    const access = responseData.access
    const refresh = responseData.refresh

    if (!access || !refresh) {
      return NextResponse.json({ error: "Token not found in response" }, { status: 500 })
    }

    // Cookie'ga saqlash
    await setAccessToken(access)
    await setRefreshToken(refresh)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error("Login Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
