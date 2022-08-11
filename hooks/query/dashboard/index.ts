import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  getAllTicketStatus: () =>
    [...dashboardKeys.all, 'getAllTicketStatus'] as const,
  getProjectSummary: () =>
    [...dashboardKeys.all, 'get-project-summary'] as const,
  getTimeSpent: () =>
    [...dashboardKeys.all, 'get-time-spent'] as const,
}

export function useGetAllTicketStatus() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(dashboardKeys.getAllTicketStatus(), () =>
    staffApi.getAllTicketStatusByStaff(userDetail)
  )
}

export function useGetProjectSummary() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(dashboardKeys.getProjectSummary(), () =>
    staffApi.getAllProjects(userDetail)
  )
}

export function useGetTimeSpent() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(dashboardKeys.getTimeSpent(), () => staffApi.getTimeSpent(userDetail))
}
