import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetChangeStatus(issue_id: string) {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(['getChangeStatus', issue_id], () =>
    staffApi.getChangeStatus(userDetail, issue_id)
  )
}
