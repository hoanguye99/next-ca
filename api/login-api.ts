import { LoginRequest, LoginResponse, RefreshTokenResponse } from '@/models/api';
import { UserDetail } from '@/models/features';
import axiosClient from './axios-client';

const loginApi = {
  login(data: LoginRequest): Promise<LoginResponse> {
    const url = '/staff/login';
    // console.log(data)
    return axiosClient.post(url, data);
  },

  refreshToken(userDetail: UserDetail): Promise<RefreshTokenResponse> {
    const config = {
      headers: {
        refreshToken: userDetail.refreshToken,
      },
    }
    const url = '/refresh-token';
    return axiosClient.post(url, {}, config);
  }
};

export default loginApi;
