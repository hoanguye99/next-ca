export interface LoginResponse {
  accessToken: string
  refreshToken: string
  role: "USER" | "ADMIN" | "STAFF"
  emailAddress: string
  name: string
  displayName: string
  JSESSIONID: string
  key: string
}

export interface LoginError {
  code: number
  error: string
  description: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RefreshTokenResponse {
  accessToken: string
}
