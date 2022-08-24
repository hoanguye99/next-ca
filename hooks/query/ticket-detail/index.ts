import staffApi from '@/api/staff-api'
import { useQuery } from '@tanstack/react-query'
import { useGetAccessToken } from '../auth'

// Query Key factory
export const ticketDetailKeys = {
  all: ['ticket-detail'] as const,
  getTicketDetail: (issue_key: string) =>
    [...ticketDetailKeys.all, 'getTicketDetail', issue_key] as const,
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
  const getAccessToken = useGetAccessToken()
  return useQuery(
    ticketDetailKeys.getTicketDetail(ticketSlugId as string),
    () =>
      staffApi.getTicketDetail(
        getAccessToken.data!.accessToken,
        ticketSlugId as string
      ),
    {
      // ⬇️ disabled as long as the filter is empty
      enabled:
        !!ticketSlugId  && !getAccessToken.isFetching,
    }
  )
}

export function useGetUser(user: string) {
  const getAccessToken = useGetAccessToken()

  return useQuery(
    ticketDetailKeys.getUser(user),
    () => staffApi.getUser(getAccessToken.data!.accessToken, user),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}

export function useGetChangeStatus(issue_id: string) {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    ticketDetailKeys.getChangeStatus(issue_id),
    () => staffApi.getChangeStatus(getAccessToken.data!.accessToken, issue_id),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}

export const useGetConfigWorkLog = () => {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    ticketDetailKeys.getConfigWorkLog(),
    () => staffApi.getConfigWorkLog(getAccessToken.data!.accessToken),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}
