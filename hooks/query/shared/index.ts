import staffApi from '@/api/staff-api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useGetAccessToken } from '../auth'

// Query Key factory
export const sharedKeys = {
  getUserWithState: (user: string) => ['getUserWithState', user] as const,
}

export function useGetUserWithState() {
  // console.log("watchProject", watchProject)
  const getAccessToken = useGetAccessToken()
  const [user, setUser] = useState('')

  return {
    ...useQuery(
      sharedKeys.getUserWithState(user),
      () => staffApi.getUser(getAccessToken.data!.accessToken, user),
      {
        // The query will not execute until enabled
        enabled: !!user && !getAccessToken.isFetching,
      }
    ),
    setUser,
  }
}
