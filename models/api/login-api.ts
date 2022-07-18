export interface LoginResponse {
  accessToken: string
  refreshToken: string
  phone: string
  full_name: string
  role: "USER" | "ADMIN" | "STAFF"
  email: string
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
