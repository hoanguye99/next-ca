import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export const useLogoutNavigate = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const logoutNavigate = useCallback(() => {
    typeof window !== 'undefined' && localStorage.removeItem('nextca-userInfo')
    queryClient.clear()
    toast.remove()
    void router.push('/login')
    // if (userDetail.role === 'USER') {
    //   userLogoutNavigate()
    // } else if (userDetail.role === 'STAFF') {
    //   staffLogoutNavigate()
    // } else if (userDetail.role === 'ADMIN') {
    //   adminLogoutNavigate()
    // } else {
    //   void router.push('/login')
    // }
  }, [])

  return logoutNavigate
}

export const useStaffLogout = () => {
  const router = useRouter()

  const staffLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])

  return { staffLogoutNavigate }
}

export const useUserLogout = () => {
  const router = useRouter()

  const userLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])

  return { userLogoutNavigate }
}

export const useAdminLogout = () => {
  const router = useRouter()
  const adminLogoutNavigate = useCallback(() => {
    // do stm
    void router.push('/login')
  }, [])
  return { adminLogoutNavigate }
}
