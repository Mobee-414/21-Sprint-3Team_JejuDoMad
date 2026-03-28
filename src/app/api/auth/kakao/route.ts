import { KakaoLoginRequestBody } from "@/features/auth/api/login";
import { TokenUserResponseType } from "@/features/auth/types/auth";
import { setTokenCookies } from "@/shared/api/_lib/tokenUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: KakaoLoginRequestBody = await req.json();

  console.log("[kakao login] 요청 body:", body);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/sign-in/kakao`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const data: TokenUserResponseType = await res.json();

  console.log("[kakao login] 백엔드 응답 status:", res.status, "data:", data);

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { accessToken, refreshToken } = data;

  await setTokenCookies(accessToken, refreshToken);

  return NextResponse.json(data);
}
