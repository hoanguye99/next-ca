import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import staffApi from '@/api/staff-api'
import DashBoardData from '../dashboard-data'
import { GetAllProjectsResponse } from '@/models/api'

interface ProjectSummaryProps {
  data: GetAllProjectsResponse
}

const ProjectSummary = (props: ProjectSummaryProps) => {
  return (
    <div>
      {props.data.details.map((item) => (
        <div>{item.toString()}</div>
      ))}
    </div>
  )
}

export default ProjectSummary
