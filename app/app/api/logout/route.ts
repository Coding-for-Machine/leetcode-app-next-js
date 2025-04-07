import { deleteToken } from "@/lib/Auth"
import { NextResponse } from "next/server"

export async function POST() {
  await deleteToken()
  return NextResponse.json({ success: true }, { status: 200 })
}