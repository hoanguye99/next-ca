import loginApi from '@/api/login-api'
import {
  clearTimer,
  setTimer
} from '@/features/auth/session-timeout-timer-slice'
import { AccessTokenDecoded } from '@/models/features'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { refreshToken, selectUserDetail } from '@/features/auth/user-slice'
import jwt_decode from 'jwt-decode'
import { useCallback, useEffect } from 'react'
import { useLogoutNavigate } from './useLogout'

export const useRefreshToken = () => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()
  const logoutNavigate = useLogoutNavigate()

  const onSessionTimeout = useCallback(async () => {
    try {
      const newAccessToken = await loginApi.refreshToken(userDetail)
      dispatch(refreshToken(newAccessToken.accessToken))
    } catch {
      logoutNavigate()
    }
  }, [userDetail, dispatch, logoutNavigate])

  useEffect(() => {
    if (userDetail.accessToken !== '') {
      try {
        const decoded = jwt_decode<AccessTokenDecoded>(userDetail.accessToken)
        const remainingTime = decoded.exp * 1000 - Date.now() - 3000
        // const remainingTime = 5000
        console.log(remainingTime)
        dispatch(clearTimer())
        const sessionTimeoutTimer = setTimeout(onSessionTimeout, remainingTime) // eslint-disable-line
        dispatch(setTimer(sessionTimeoutTimer))
      } catch (error) {
        void onSessionTimeout()
      }
    }
  }, [userDetail, onSessionTimeout, dispatch])
}
