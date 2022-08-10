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

export function useGetProjectSummary() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['get-project-summary'], () =>
    staffApi.getAllProjects(userDetail)
  )
}

export function useGetTimeSpent() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['get-time-spent'], () => staffApi.getTimeSpent(userDetail))
}
