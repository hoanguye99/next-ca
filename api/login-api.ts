import { LoginRequest, LoginResponse, RefreshTokenResponse } from '@/models/api';
import axiosClient from './axios-client';

const loginApi = {
  login(data: LoginRequest): Promise<LoginResponse> {
    const url = '/staff/login';
    // console.log(data)
    return axiosClient.post(url, data);
  },

  refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const config = {
      headers: {
        refreshToken: refreshToken,
      },
    }
    const url = '/staff/refresh-token';
    return axiosClient.post(url, {}, config);
  }
};

export default loginApi;
