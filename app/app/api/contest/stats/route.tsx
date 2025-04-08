import { getToken } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

const DJANGO_CONTEST_URL = "http://127.0.0.1:8000/api/contest/stats/";

export async function GET(request: NextRequest) {
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store" as const
  };

  try {
    const response = await fetch(DJANGO_CONTEST_URL, option);
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}