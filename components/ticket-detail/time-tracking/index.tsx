import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'

interface TimeTrackingProps {
  getTicketDetailData: GetTicketDetailResponse
}

const TimeTracking = (props: TimeTrackingProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Time Spent:</span>
        <span>{props.getTicketDetailData.time_spent}</span>
      </div>
    </div>
  )
}

export default TimeTracking
