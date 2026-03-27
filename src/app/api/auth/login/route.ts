import { KakaoLoginRequestBody } from "@/features/auth/api/login";
import { TokenUserResponseType } from "@/features/auth/types/auth";
import { setTokenCookies } from "@/shared/api/_lib/tokenUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: KakaoLoginRequestBody = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: TokenUserResponseType = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { accessToken, refreshToken } = data;

  await setTokenCookies(accessToken, refreshToken);

  return NextResponse.json(data);
}
