import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useGetUser() {
  // console.log("watchProject", watchProject)
  const userDetail = useAppSelector(selectUserDetail)
  const [user, setUser] = useState('')

  return {...useQuery(
    ['create-ticket', 'getUser', user],
    () => staffApi.getUser(userDetail, user),
    {
      // The query will not execute until enabled
      enabled: !!user,
    }
  ), setUser}
}
