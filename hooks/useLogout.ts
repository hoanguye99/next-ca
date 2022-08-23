import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { logout, selectUserDetail } from 'features/auth/user-slice'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

export const useLogoutNavigate = () => {
  const { userLogoutNavigate } = useUserLogout()
  const { adminLogoutNavigate } = useAdminLogout()
  const { staffLogoutNavigate } = useStaffLogout()
  const userDetail = useAppSelector(selectUserDetail)
  const queryClient = useQueryClient()
  const router = useRouter()
  const logoutNavigate = useCallback(() => {
    queryClient.clear()
    if (userDetail.role === 'USER') {
      userLogoutNavigate()
    } else if (userDetail.role === 'STAFF') {
      staffLogoutNavigate()
    } else if (userDetail.role === 'ADMIN') {
      adminLogoutNavigate()
    } else {
      void router.push('/login')
    }
  }, [userLogoutNavigate, adminLogoutNavigate, staffLogoutNavigate, userDetail])

  return logoutNavigate
}

export const useStaffLogout = () => {
  const { staffLogout } = useStaffLogoutNoNavigate()
  const router = useRouter()

  const staffLogoutNavigate = useCallback(() => {
    staffLogout()
    void router.push('/login')
  }, [staffLogout])

  return { staffLogoutNavigate }
}

export const useStaffLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  const staffLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    staffLogout,
  }
}

export const useUserLogout = () => {
  const { userLogout } = useUserLogoutNoNavigate()
  const router = useRouter()

  const userLogoutNavigate = useCallback(() => {
    userLogout()
    void router.push('/login')
  }, [userLogout])

  return { userLogoutNavigate }
}

export const useUserLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  const userLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    userLogout,
  }
}

export const useAdminLogout = () => {
  const { adminLogout } = useAdminLogoutNoNavigate()
  const router = useRouter()
  const adminLogoutNavigate = useCallback(() => {
    adminLogout()
    void router.push('/login')
  }, [adminLogout])
  return { adminLogoutNavigate }
}

export const useAdminLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  const adminLogout = useCallback(() => {
    dispatch(logout())
  }, [dispatch])
  return { adminLogout }
}
