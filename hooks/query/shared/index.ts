import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// Query Key factory
export const sharedKeys = {
  getUserWithState: (user: string) => ['getUserWithState', user] as const,
}

export function useGetUserWithState() {
  // console.log("watchProject", watchProject)
  const userDetail = useAppSelector(selectUserDetail)
  const [user, setUser] = useState('')

  return {
    ...useQuery(
      sharedKeys.getUserWithState(user),
      () => staffApi.getUser(userDetail, user),
      {
        // The query will not execute until enabled
        enabled: !!user,
      }
    ),
    setUser,
  }
}
