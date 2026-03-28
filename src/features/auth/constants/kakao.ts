// 1. 환경변수 가져오기
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 2. 로그인용 REDIRECT_URI
export const KAKAO_REDIRECT_URI = `${BASE_URL}/login/kakao`;

// 3. 회원가입용 REDIRECT_URI
export const KAKAO_REDIRECT_URI_SIGNUP = `${BASE_URL}/signup/kakao`;

// 4. 최종 카카오 로그인 URL
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

// 5. 최종 카카오 회원가입 URL
export const KAKAO_AUTH_URL_SIGNUP = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI_SIGNUP}&response_type=code`;
