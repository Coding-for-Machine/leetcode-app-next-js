import { getToken } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";


const PROFILE_URL = ""
export async function GET(request: NextRequest) {
    const token = await getToken()
    if (!token){
        return NextResponse.json({}, {status: 401})
    }
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await fetch(PROFILE_URL, option)
    console.log(response)
    const result = await response.json()
    let sataus_code = 200
    if (!result){
        sataus_code = 401
    }
    return NextResponse.json({...result}, {status: sataus_code})
}