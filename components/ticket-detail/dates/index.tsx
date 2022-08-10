import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UseQueryResult } from '@tanstack/react-query'
dayjs.extend(relativeTime)

interface DatesProps {
  getTicketDetail: UseQueryResult<GetTicketDetailResponse, unknown>
}

const Dates = (props: DatesProps) => {
  return (
    <>
      {props.getTicketDetail.status === 'loading' && (
        <>
          <div className="flex flex-col gap-4 text-sm mb-5">
            <div className="animate-pulse bg-slate-100 h-7"></div>
            <div className="animate-pulse bg-slate-100 h-7"></div>
            <div className="animate-pulse bg-slate-100 h-7"></div>
            <div className="animate-pulse bg-slate-100 h-7"></div>
          </div>
        </>
      )}
      {props.getTicketDetail.status === 'success' && (
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between truncate gap-2">
            <span className="text-gray-500">Due:</span>
            <span>
              {dayjs(props.getTicketDetail.data!.resolved_date).format(
                'DD MMMM YYYY'
              )}
            </span>
          </div>
          <div className="flex items-center justify-between truncate gap-2">
            <span className="text-gray-500">Created:</span>
            <span>
              {dayjs(props.getTicketDetail.data!.date_create).fromNow()}
            </span>
          </div>
          <div className="flex items-center justify-between truncate gap-2">
            <span className="text-gray-500">Updated:</span>
            <span>
              {props.getTicketDetail.data!.details.length > 0
                ? dayjs(
                    props.getTicketDetail.data!.details[0].date_create
                  ).fromNow()
                : dayjs(props.getTicketDetail.data!.date_create).fromNow()}
            </span>
          </div>
          <div className="flex items-center justify-between truncate gap-2">
            <span className="text-gray-500">Start Date:</span>
            <span>
              {dayjs(props.getTicketDetail.data!.activity_date).format(
                'DD MMMM YYYY'
              )}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Dates
