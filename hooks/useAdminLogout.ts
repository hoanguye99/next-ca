import { useAppDispatch } from "app/hooks"
import { clearTimer } from "features/auth/session-timeout-timer-slice"
import { logout } from "features/auth/user-slice"
import { useRouter } from 'next/router'

export const useAdminLogout = () => {
  const {adminLogout} = useAdminLogoutNoNavigate()
  const router = useRouter()
  function handleLogoutButton() {
    adminLogout()
    void router.push('/login')
  }
  return {handleLogoutButton}
}


export const useAdminLogoutNoNavigate = () => {
  const dispatch = useAppDispatch()
  function adminLogout() {
    dispatch(logout())
    dispatch(clearTimer())
  }
  return {adminLogout}
}