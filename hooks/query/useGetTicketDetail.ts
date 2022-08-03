import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetTicketDetail(ticketId: string | string[] | undefined) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getTicketDetail', (ticketId as string).split('.')[1]], () =>
    staffApi.getTicketDetail(userDetail, (ticketId as string).split('.')[1]),
    {
      // ⬇️ disabled as long as the filter is empty
      enabled: !!ticketId
    }
  )
}
