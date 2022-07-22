import RangeSlider from '@/components/common/range-slider'
import { PrimaryText, SecondaryText } from '@/components/styled'
import React from 'react'

interface Info3Props {}

const Info3 = (props: Info3Props) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <SecondaryText className="text-[10px]">PROGRESS</SecondaryText>
        <div className="flex flex-row items-end gap-1">
          <PrimaryText className="text-lg">84.5%</PrimaryText>
        </div>
      </div>
      <div className="flex-1 self-end mx-2 mb-2">
      <RangeSlider/>
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
    </div>
  )
}

export default Info3
