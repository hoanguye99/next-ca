import loginApi from '@/api/login-api'
import {
  clearTimer,
  setTimer
} from '@/features/auth/session-timeout-timer-slice'
import { AccessTokenDecoded } from '@/models/features'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { refreshToken, selectUserDetail } from '@/features/auth/user-slice'
import { useAdminLogoutNoNavigate } from '@/hooks/useAdminLogout'
import { useUserLogoutNoNavigate } from '@/hooks/useUserLogout'
import jwt_decode from 'jwt-decode'
import { useCallback, useEffect } from 'react'
import { useStaffLogoutNoNavigate } from './useStaffLogout'

export const useRefreshToken = () => {
  const userDetail = useAppSelector(selectUserDetail)
  const dispatch = useAppDispatch()
  const { userLogout } = useUserLogoutNoNavigate()
  const { adminLogout } = useAdminLogoutNoNavigate()
  const { staffLogout } = useStaffLogoutNoNavigate()

  const onSessionTimeout = useCallback(async () => {
    try {
      const newAccessToken = await loginApi.refreshToken(userDetail)
      dispatch(refreshToken(newAccessToken.accessToken))
    } catch {
      if (userDetail.role === 'USER') {
        userLogout()
      } else if (userDetail.role === 'STAFF') {
        staffLogout()
      } else if (userDetail.role === 'ADMIN') {
        adminLogout()
      }
    }
  }, [userDetail, dispatch, adminLogout, userLogout, staffLogout])

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
