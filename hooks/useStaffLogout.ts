import { useAppDispatch } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout } from "features/auth/user-slice"
import { useRouter } from 'next/router'
import { useCallback } from "react"

export const useStaffLogout = () => {
  const {staffLogout} = useStaffLogoutNoNavigate()
  const router = useRouter()

  const handleLogoutButton = useCallback( () => {
    staffLogout()
    void router.push('/login')
  }, [staffLogout, router])

  return {handleLogoutButton}
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