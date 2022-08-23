import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useRefreshToken } from '@/hooks'
import useAuthenAllUser from '@/hooks/useAuthenAllUser'
import { AuthProps } from '@/pages/_app'
import NonSSRWrapper from '@/components/common/no-ssr-wrapper'

export function AllUserAuth({ children }: AuthProps) {
  const userDetail = useAppSelector(selectUserDetail)
  useRefreshToken()
  useAuthenAllUser()

  if (userDetail.role === 'ANONYMOUS')
    return <></>

  return (
    <NonSSRWrapper>
      {children}
    </NonSSRWrapper>
  )
}
