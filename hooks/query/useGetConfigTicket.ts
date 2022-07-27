import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetConfigTicket() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['create-ticket', 'getConfigTicket'], () =>
    staffApi.getConfigTicket(userDetail)
  )
}
