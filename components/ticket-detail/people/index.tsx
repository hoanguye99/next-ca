import InitialImage from '@/components/common/get-initial'
import { useGetUser } from '@/hooks/query'
import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'

interface PeopleProps {
  getTicketDetailData: GetTicketDetailResponse
}

const People = (props: PeopleProps) => {
  const { data: getAssigneeResponse } = useGetUser(
    props.getTicketDetailData.assignee_name
  )
  const { data: getReporterResponse } = useGetUser(
    props.getTicketDetailData.account_name
  )
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center justify-between gap-2 truncate">
        <span className="text-gray-500">Assignee:</span>
        <div className="flex items-center gap-2">
          <InitialImage
            name={props.getTicketDetailData.assignee_name}
          ></InitialImage>
          <span>{getAssigneeResponse?.displayName}</span>
        </div>
      </div>
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Reporter:</span>
        <div className="flex items-center gap-2">
          <InitialImage
            name={props.getTicketDetailData.account_name}
          ></InitialImage>
          <span>{getReporterResponse?.displayName}</span>
        </div>
      </div>
    </div>
  )
}

export default People
