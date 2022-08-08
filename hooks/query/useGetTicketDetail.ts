import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetTicketDetail(ticketSlugId: string | string[] | undefined) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getTicketDetail', (ticketSlugId as string)], () =>
    staffApi.getTicketDetail(userDetail, (ticketSlugId as string)),
    {
      // ⬇️ disabled as long as the filter is empty
      enabled: !!ticketSlugId
    }
  )
}
