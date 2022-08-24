import useAuthenAllUser from '@/hooks/useAuthenAllUser'
import { AuthProps } from '@/pages/_app'
import NonSSRWrapper from '@/components/common/no-ssr-wrapper'
import { authKeys, useGetAccessToken, useGetUserDetail } from '@/hooks/query/auth'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function AllUserAuth({ children }: AuthProps) {
  const getUserDetail = useGetUserDetail()
  const queryClient = useQueryClient()
  useAuthenAllUser()
  const getAccessToken = useGetAccessToken()

  useEffect(
    () => void queryClient.refetchQueries(authKeys.getAccessToken()),
    []
  )
  if (getUserDetail.data.role === 'ANONYMOUS') return <></>

  return <NonSSRWrapper>{children}</NonSSRWrapper>
}
