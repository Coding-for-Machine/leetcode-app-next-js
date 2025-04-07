import { cookies } from "next/headers";


const TOKEN_MAX_AGE = 3600
const TOKEN_NAME="auth-token"
const TOKEN_REFRESH_NAME="auth-refresh-token"

export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    return token;
  }
  
  export async function getRefreshToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(TOKEN_REFRESH_NAME)?.value;
    return refreshToken;
  }
// ------------------
export async function setAccessToken(authAccessToken: string) {
    // login
    const cookieStore = await cookies()
    return cookieStore.set(
        {
            name: TOKEN_NAME,
            value: authAccessToken,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: TOKEN_MAX_AGE,
        }
    )
}
export async function setRefreshToken(authRefreshToken: string) {
    // login
    const cookieStore = await cookies()
    return cookieStore.set(
        {
            name: TOKEN_REFRESH_NAME,
            value: authRefreshToken,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: TOKEN_MAX_AGE,
        }
    )
}
export async function deleteToken() {
    // login
    const cookieStore = await cookies()
    cookieStore.delete(TOKEN_REFRESH_NAME)
    return cookieStore.delete(TOKEN_NAME)
}