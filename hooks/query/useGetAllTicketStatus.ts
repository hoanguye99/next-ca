import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetAllTicketStatus() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getAllTicketStatus'], () =>
    staffApi.getAllTicketStatusByStaff(userDetail)
  )
}
