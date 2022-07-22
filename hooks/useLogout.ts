import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout, selectUserDetail } from "features/auth/user-slice"
import { useRouter } from 'next/router'


export const useLogoutNavigate = () => {
  const { userLogoutNavigate } = useUserLogout()
  const { adminLogoutNavigate } = useAdminLogout()
  const { staffLogoutNavigate } = useStaffLogout()
  const userDetail = useAppSelector(selectUserDetail)
  const router = useRouter()
  const logoutNavigate = useCallback( () => {
    if (userDetail.role === 'USER') {
      userLogoutNavigate()
    } else if (userDetail.role === 'STAFF') {
      staffLogoutNavigate()
    } else if (userDetail.role === 'ADMIN') {
      adminLogoutNavigate()
    } else {
      void router.push('/login')
    }
  }, [userLogoutNavigate, adminLogoutNavigate, staffLogoutNavigate, userDetail, router])

  return logoutNavigate
}


export const useStaffLogout = () => {
  const {staffLogout} = useStaffLogoutNoNavigate()
  const router = useRouter()

  const staffLogoutNavigate = useCallback( () => {
    staffLogout()
    void router.push('/login')
  }, [staffLogout, router])

  return {staffLogoutNavigate}
}


export const useStaffLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  const staffLogout = useCallback(() => {
    dispatch(logout())
    dispatch(clearTimer())
  }, [dispatch])


  return {
    staffLogout
  }
}

export const useUserLogout = () => {
  const {userLogout} = useUserLogoutNoNavigate()
  const router = useRouter()

  const userLogoutNavigate = useCallback( () => {
    userLogout()
    void router.push('/login')
  }, [userLogout, router])

  return {userLogoutNavigate}
}


export const useUserLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  const userLogout = useCallback(() => {
    dispatch(logout())
    dispatch(clearTimer())
  }, [dispatch])


  return {
    userLogout
  }
}

export const useAdminLogout = () => {
  const {adminLogout} = useAdminLogoutNoNavigate()
  const router = useRouter()
  function adminLogoutNavigate() {
    adminLogout()
    void router.push('/login')
  }
  return {adminLogoutNavigate}
}


export const useAdminLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  function adminLogout() {
    dispatch(logout())
    dispatch(clearTimer())
  }
  return {adminLogout}
}
