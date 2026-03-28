import {
  LoginRequest,
  LoginResponse,
  TokenUserResponseType,
} from "../types/auth";
import axios from "axios";

// 일반 로그인
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};

export interface KakaoLoginRequestBody {
  redirectUri: string;
  token: string;
}

// 카카오 로그인
export async function kakaoLoginUser(
  loginBody: KakaoLoginRequestBody,
): Promise<TokenUserResponseType> {
  const res = await axios.post("/api/auth/kakao", loginBody);
  return res.data;
}
