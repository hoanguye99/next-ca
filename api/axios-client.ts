/* eslint-disable */
import { AccessTokenDecoded } from '@/models/features'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import jwt_decode from 'jwt-decode'
import { store } from '@/app/store';
import { refreshToken } from '@/features/auth/user-slice';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    if (config?.headers?.token) {
      const token = config.headers.token as string
      const decoded = jwt_decode<AccessTokenDecoded>(token)
      const remainingTime = decoded.exp * 1000 - Date.now()
      if (remainingTime <= 0) {
        store.dispatch(refreshToken("stale token"))
        throw new Error("Stale Token while calling api")
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
