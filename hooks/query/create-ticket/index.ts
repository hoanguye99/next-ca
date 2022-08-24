import staffApi from '@/api/staff-api'
import { useQuery } from '@tanstack/react-query'
import { useGetAccessToken } from '../auth'

// Query Key factory
export const createTicketKeys = {
  all: ['create-ticket'] as const,
  getConfigTicket: () => [...createTicketKeys.all, 'getConfigTicket'] as const,
  getComponent: (project_id: number) =>
    [...createTicketKeys.all, 'getComponent', project_id] as const,
}

export function useGetConfigTicket() {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    createTicketKeys.getConfigTicket(),
    () => staffApi.getConfigTicket(getAccessToken.data!.accessToken),
    { enabled: !getAccessToken.isFetching }
  )
}

export function useGetComponent(watchProject: string, project_id: number) {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    createTicketKeys.getComponent(project_id),
    () => staffApi.getComponent(getAccessToken.data!.accessToken, project_id),
    {
      // The query will not execute until enabled
      enabled:
        !!watchProject && !getAccessToken.isFetching,
    }
  )
}
