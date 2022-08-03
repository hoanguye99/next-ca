import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

interface DatesProps {
  getTicketDetailData: GetTicketDetailResponse
}

const Dates = (props: DatesProps) => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Due:</span>
        <span>
          {dayjs(props.getTicketDetailData.resolved_date).format(
            'DD MMMM YYYY'
          )}
        </span>
      </div>
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Created:</span>
        <span>{dayjs(props.getTicketDetailData.date_create).fromNow()}</span>
      </div>
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Updated:</span>
        <span>
          {props.getTicketDetailData.details.length > 0
            ? dayjs(props.getTicketDetailData.details[0].date_create).fromNow()
            : dayjs(props.getTicketDetailData.date_create).fromNow()}
        </span>
      </div>
      <div className="flex items-center justify-between truncate gap-2">
        <span className="text-gray-500">Start Date:</span>
        <span>
          {dayjs(props.getTicketDetailData.activity_date).format(
            'DD MMMM YYYY'
          )}
        </span>
      </div>
    </div>
  )
}

export default Dates
