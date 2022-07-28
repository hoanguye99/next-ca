import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useEffect } from 'react'
import { useLogoutNavigate } from './useLogout'

const useAuthenAllUser = () => {
  const userDetail = useAppSelector(selectUserDetail)
  const logoutNavigate = useLogoutNavigate()

  useEffect(() => {
    if(userDetail.accessToken === '' || userDetail.role === 'ANONYMOUS') {
      logoutNavigate()
    }
  }, [userDetail, logoutNavigate])
}

export default useAuthenAllUser