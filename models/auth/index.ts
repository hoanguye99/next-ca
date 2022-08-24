import { LoginResponse } from 'models/api'

export interface LoginState {
  userDetail: UserDetail
  status: 'idle' | 'loading' | 'failed'
  failureDescription: string
}

export interface UserDetail extends Omit<LoginResponse, 'role'> {
  role: 'USER' | 'ADMIN' | 'ANONYMOUS' | 'STAFF'
}

// export type UserRole = 'USER' | 'ADMIN' | 'ANONYMOUS'

export interface AccessTokenDecoded {
  username: string
  type: string
  full_name: string
  email: string
  role: string
  exp: number
  iat: number
}