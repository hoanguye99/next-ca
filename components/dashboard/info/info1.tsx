import { PrimaryText, SecondaryText } from '@/components/styled'
import React from 'react'

interface Info1Props {}

const Info1 = (props: Info1Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <SecondaryText className="text-[10px]">BUDGET</SecondaryText>
        <div className="flex flex-row items-end gap-1">
          <PrimaryText className="text-lg">$24,500</PrimaryText>
          <SecondaryText className="text-[11px] !text-green-500 px-1 py-0.5 bg-green-100 rounded-full">
            +3.5%
          </SecondaryText>
        </div>
      </div>
      <div className="">
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
      </div>
    </div>
  )
}

export default Info1
