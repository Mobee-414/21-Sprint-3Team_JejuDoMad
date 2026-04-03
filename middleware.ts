import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isLoggedIn = !!(accessToken || refreshToken);

  // 이미 로그인된 상태에서 /login 접근 시 메인으로 리다이렉트
  if (isLoggedIn && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 안 된 상태에서 /mypage 접근 시 로그인으로 리다이렉트
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/mypage")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/mypage/:path*"],
};
