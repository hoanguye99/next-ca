import { useAppDispatch } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout } from "features/auth/user-slice"
import { useRouter } from 'next/router'
import { useCallback } from "react"

export const useUserLogout = () => {
  const {userLogout} = useUserLogoutNoNavigate()
  const router = useRouter()

  const handleLogoutButton = useCallback( () => {
    userLogout()
    void router.push('/login')
  }, [userLogout, router])

  return {handleLogoutButton}
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