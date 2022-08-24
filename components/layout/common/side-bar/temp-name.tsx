import { NormalText, SecondaryText } from '@/components/styled'
import { useGetUserDetail } from '@/hooks/query/auth'
import React from 'react'

const TempName = () => {
  const getUserDetail = useGetUserDetail()
  return (
    <NormalText className="!text-black text-center my-3">
      {getUserDetail.data.displayName}
    </NormalText>
  )
}

export default TempName
