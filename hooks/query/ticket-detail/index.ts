import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

// Query Key factory
export const ticketDetailKeys = {
  all: ['ticket-detail'] as const,
  getTicketDetail: (ticketSlugId: string) =>
    [...ticketDetailKeys.all, 'getTicketDetail', ticketSlugId] as const,
  getUser: (user: string) =>
    [...ticketDetailKeys.all, 'getUser', user] as const,
  getChangeStatus: (issue_id: string) =>
    [...ticketDetailKeys.all, 'getChangeStatus', issue_id] as const,
  getConfigWorkLog: () =>
    [...ticketDetailKeys.all, 'getConfigWorkLog'] as const,
}

export function useGetTicketDetail(
  ticketSlugId: string | string[] | undefined
) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(
    ticketDetailKeys.getTicketDetail(ticketSlugId as string),
    () => staffApi.getTicketDetail(userDetail, ticketSlugId as string),
    {
      // ⬇️ disabled as long as the filter is empty
      enabled: !!ticketSlugId,
    }
  )
}

export function useGetUser(user: string) {
  const userDetail = useAppSelector(selectUserDetail)

  return useQuery(ticketDetailKeys.getUser(user), () =>
    staffApi.getUser(userDetail, user)
  )
}

export function useGetChangeStatus(issue_id: string) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(ticketDetailKeys.getChangeStatus(issue_id), () =>
    staffApi.getChangeStatus(userDetail, issue_id)
  )
}

export const useGetConfigWorkLog = () => {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(ticketDetailKeys.getConfigWorkLog(), () =>
    staffApi.getConfigWorkLog(userDetail)
  )
}
