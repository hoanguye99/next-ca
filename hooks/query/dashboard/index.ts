import staffApi from '@/api/staff-api'
import { useQuery } from '@tanstack/react-query'
import { useGetAccessToken } from '../auth'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  getAllTicketStatus: () =>
    [...dashboardKeys.all, 'getAllTicketStatus'] as const,
  getProjectSummary: () =>
    [...dashboardKeys.all, 'get-project-summary'] as const,
  getTimeSpent: () => [...dashboardKeys.all, 'get-time-spent'] as const,
}

export function useGetAllTicketStatus() {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    dashboardKeys.getAllTicketStatus(),
    () => staffApi.getAllTicketStatusByStaff(getAccessToken.data!.accessToken),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}

export function useGetProjectSummary() {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    dashboardKeys.getProjectSummary(),
    () => staffApi.getAllProjects(getAccessToken.data!.accessToken),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}

export function useGetTimeSpent() {
  const getAccessToken = useGetAccessToken()
  return useQuery(
    dashboardKeys.getTimeSpent(),
    () => staffApi.getTimeSpent(getAccessToken.data!.accessToken),
    {
      enabled: !getAccessToken.isFetching,
    }
  )
}
