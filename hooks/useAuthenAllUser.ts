import { useEffect, useLayoutEffect } from 'react'
import { useGetUserDetail } from './query/auth'
import { useLogoutNavigate } from './useLogout'

const useAuthenAllUser = () => {
  const getUserDetail = useGetUserDetail()
  const logoutNavigate = useLogoutNavigate()

  useEffect(() => {
    if (getUserDetail.data.role === 'ANONYMOUS') {
      logoutNavigate()
    }
  }, [getUserDetail, logoutNavigate])
}

export default useAuthenAllUser
