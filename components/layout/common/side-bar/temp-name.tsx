import { useAppSelector } from '@/app/hooks'
import { NormalText, SecondaryText } from '@/components/styled'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'

const TempName = () => {
  const userDetail = useAppSelector(selectUserDetail)
  return (
    <NormalText className="!text-black text-center my-3">
      {userDetail.displayName}
    </NormalText>
  )
}

export default TempName
