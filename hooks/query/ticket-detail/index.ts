import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetTicketDetail(
  ticketSlugId: string | string[] | undefined
) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(
    ['getTicketDetail', ticketSlugId as string],
    () => staffApi.getTicketDetail(userDetail, ticketSlugId as string),
    {
      // ⬇️ disabled as long as the filter is empty
      enabled: !!ticketSlugId,
    }
  )
}

export function useGetUser(user: string) {
  const userDetail = useAppSelector(selectUserDetail)

  return useQuery(['getUser', user], () => staffApi.getUser(userDetail, user))
}

export function useGetChangeStatus(issue_id: string) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getChangeStatus', issue_id], () =>
    staffApi.getChangeStatus(userDetail, issue_id)
  )
}

export const useGetConfigWorkLog = () => {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getConfigWorkLog'], () =>
    staffApi.getConfigWorkLog(userDetail)
  )
}
