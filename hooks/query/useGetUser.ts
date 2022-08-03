import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'

export function useGetUser(user: string) {
  const userDetail = useAppSelector(selectUserDetail)

  return useQuery(['getUser', user], () => staffApi.getUser(userDetail, user))
}
