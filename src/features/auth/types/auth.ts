export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: UserInfo;
  refreshToken: string;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenUserResponseType {
  user: UserInfo;
  refreshToken: string;
  accessToken: string;
}
