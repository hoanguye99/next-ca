import { PrimaryText, SecondaryText } from '@/components/styled'
import { GetAllTicketStatusByStaffResponse } from '@/models/api'
import React from 'react'

interface InfoProps {
  data: GetAllTicketStatusByStaffResponse
  type: string
  logo: React.ReactNode
}

const Info = (props: InfoProps) => {
  let disp
  const ret = props.data.status.find((item) => item.statusName === props.type)
  if (ret === undefined) {
    disp = "No data"
  } else {
    disp = ret.quantity.toString()
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <SecondaryText className="text-[10px]">{props.type.split('_').join(' ')}</SecondaryText>
        <div className="flex flex-row items-end gap-1">
          <PrimaryText className="text-lg">
            {disp}
          </PrimaryText>
        </div>
      </div>
      <div className="">
        {props.logo}
      </div>
    </div>
  )
}

export const infoData = [
  {
    type: 'OPEN_REQUEST',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    type: 'REOPEN_REQUEST',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    type: 'IN_PROGRESS_REQUEST',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    type: 'INFO_ADD_REQUEST',
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
]

export default Info
