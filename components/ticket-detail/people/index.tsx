import InitialImage from '@/components/common/get-initial'
import { useGetUser } from '@/hooks/query/ticket-detail'
import { GetTicketDetailResponse } from '@/models/api'
import { UseQueryResult } from '@tanstack/react-query'
import React from 'react'

interface PeopleWrapperProps {
  getTicketDetail: UseQueryResult<GetTicketDetailResponse, unknown>
}

const PeopleWrapper = (props: PeopleWrapperProps) => {
  if (props.getTicketDetail.status === 'loading') {
    return (
      <>
        <Loading></Loading>
      </>
    )
  } else if (props.getTicketDetail.status === 'error') {
    return <></>
  } else {
    return <People getTicketDetailData={props.getTicketDetail.data}></People>
  }
}

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 pb-2">
      <div className="animate-pulse bg-slate-100 h-7"></div>
      <div className="animate-pulse bg-slate-100 h-7"></div>
    </div>
  )
}


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

export default PeopleWrapper
