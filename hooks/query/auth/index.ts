import loginApi from '@/api/login-api'
import { useLogoutNavigate } from '@/hooks/useLogout'
import { AccessTokenDecoded, UserDetail } from '@/models/auth'
import { useQuery } from '@tanstack/react-query'

export const authKeys = {
  getAccessToken: () => ['getAccessToken'] as const,
  getUserDetail: () => ['getUserDetail'] as const,
}

export function useGetAccessToken() {
  const logoutNavigate = useLogoutNavigate()
  return useQuery(
    authKeys.getAccessToken(),
    () =>
      loginApi.refreshToken(
        (JSON.parse(localStorage.getItem('nextca-userInfo')!) as UserDetail)
          .refreshToken
      ),
    {
      // bc of active refetch, make this query stale so it does not auto refetch
      staleTime: Infinity,
      // Whenever refreshToken API returns an error, log out immediately
      onError: (err) => logoutNavigate(),
      onSuccess: (data) => console.log(data),
      // enable to make sure that local storage have data when refetch
      enabled:
        typeof window !== 'undefined' &&
        localStorage.getItem('nextca-userInfo') !== null,
      // refetch every 57 minutes
      refetchInterval: 3420000,
      // (data) => {
      //   if (data !== undefined && data.accessToken !== '') {
      //     const decoded = jwt_decode<AccessTokenDecoded>(data.accessToken)
      //     const remainingTime = decoded.exp * 1000 - Date.now() - 3000
      //     return remainingTime
      //   }
      //   return false
      // }
      refetchIntervalInBackground: true,
      retry: false,
      // Always take UserDetail data from Local Storage
      initialData:
        typeof window !== 'undefined' && localStorage.getItem('nextca-userInfo')
          ? {
              accessToken: (
                JSON.parse(
                  localStorage.getItem('nextca-userInfo')!
                ) as UserDetail
              ).accessToken,
            }
          : {
              accessToken: '',
            },
    }
  )
}

export function useGetUserDetail() {
  return useQuery(
    authKeys.getUserDetail(),
    () =>
      // Just place holder code. This Promise will never be called
      Promise.resolve({
        accessToken: '',
        refreshToken: '',
        role: 'ANONYMOUS',
        emailAddress: '',
        name: '',
        displayName: '',
        JSESSIONID: '',
        key: '',
      } as UserDetail),
    {
      // Does not refetch ever!
      enabled: false,
      // Always take UserDetail data from Local Storage
      initialData:
        typeof window !== 'undefined' && localStorage.getItem('nextca-userInfo')
          ? (JSON.parse(localStorage.getItem('nextca-userInfo')!) as UserDetail) // eslint-disable-line
          : {
              accessToken: '',
              refreshToken: '',
              role: 'ANONYMOUS',
              emailAddress: '',
              name: '',
              displayName: '',
              JSESSIONID: '',
              key: '',
            },
    }
  )
}
