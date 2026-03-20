// 1. 환경변수 가져오기
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
console.log("보내지는 키 확인:", KAKAO_CLIENT_ID);
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// 2. 조립하기 (REDIRECT_URI는 BASE_URL 기반으로 자동 생성)
export const KAKAO_REDIRECT_URI = `${BASE_URL}/login/kakao`;

// 3. 최종 카카오 로그인 URL 생성
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
