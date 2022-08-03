import InitialImage from '@/components/common/get-initial'
import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'

interface DetailsProps {
  getTicketDetailData: GetTicketDetailResponse
}

const Details = (props: DetailsProps) => {
  return (
    <div className="text-sm flex flex-col gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Project:</span>
          <span className="text-right">
            {props.getTicketDetailData.project_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Priority:</span>
          <span className="text-right">
            {props.getTicketDetailData.name_priority}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Request:</span>
          <span className="text-right">
            {props.getTicketDetailData.request_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Sizing:</span>
          <span className="text-right">
            {props.getTicketDetailData.sizing_name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className="text-right">
            {props.getTicketDetailData.status_name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Component:</span>
          <span className="text-right">
            {props.getTicketDetailData.component_name}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 truncate">
          <span className="text-gray-500">Customer:</span>
          <div className="flex items-center gap-2">
            <InitialImage
              name={props.getTicketDetailData.customer_name}
            ></InitialImage>
            <span>{props.getTicketDetailData.customer_name}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Summary:</span>
          <span className="text-right">
            {props.getTicketDetailData.summary}
          </span>
        </div>
      </div>

      <p className="">
        <span className="text-gray-400">Description: </span>
        {props.getTicketDetailData.description_by_staff}
      </p>
    </div>
  )
}

export default Details
