import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetComponent(watchProject: string, project_id: number) {

  console.log("watchProject", watchProject)
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(
    ['create-ticket', 'getComponent', project_id],
    () => staffApi.getComponent(userDetail, project_id),
    {
      // The query will not execute until enabled
      enabled: !!watchProject,
    }
  )
}
