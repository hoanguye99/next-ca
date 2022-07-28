import { useAppSelector } from '@/app/hooks'
import { SecondaryText } from '@/components/styled'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'

const TempName = () => {
  const userDetail = useAppSelector(selectUserDetail)
  return (
    <SecondaryText className="!text-black text-center my-3">
      {userDetail.displayName}
    </SecondaryText>
  )
}

export default TempName
