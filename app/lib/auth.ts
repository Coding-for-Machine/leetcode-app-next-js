// lib/Auth.tsx
"use server";

import { cookies } from "next/headers";

const TOKEN_MAX_AGE = 3600; // 1 hour
const TOKEN_NAME = "auth-token";
const REFRESH_TOKEN_NAME = "auth-refresh-token";

/**
 * Get cookie by name
 */
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

/**
 * Set cookie by name
 */
export async function setCookie(name: string, value: string, maxAge: number = TOKEN_MAX_AGE) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
}

/**
 * Delete cookie by name
 */
export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// ---------------------------
// Shortcut funksiyalar (convenience)
// ---------------------------

export const getToken = async () => await getCookie(TOKEN_NAME);
export const getRefreshToken = async () => await getCookie(REFRESH_TOKEN_NAME);

export const setAccessToken = async (token: string) => await setCookie(TOKEN_NAME, token);
export const setRefreshToken = async (token: string) => await setCookie(REFRESH_TOKEN_NAME, token);

export const deleteToken = async () => {
  await deleteCookie(TOKEN_NAME);
  await deleteCookie(REFRESH_TOKEN_NAME);
};
