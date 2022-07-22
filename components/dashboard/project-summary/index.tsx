import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'
import {
  useQuery
} from "@tanstack/react-query"

type ProjectSummaryProps = {}

const ProjectSummary = (props: ProjectSummaryProps) => {
  const userDetail = useAppSelector(selectUserDetail)

  // const { status, data, error } = useQuery(['user'], async () => {
  //   const res = await axios.get('/api/user')
  //   return res.data
  // })


  return (
    <div>{userDetail.full_name}</div>
  )
}

export default ProjectSummary