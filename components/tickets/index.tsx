import React from 'react'
import { PrimaryText, SecondaryText } from '../styled'


interface TicketsViewProps {
}

const TicketsView = (props: TicketsViewProps) => {
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
          <PrimaryText className="text-2xl">View Tickets</PrimaryText>
        </div>
        <div></div>
      </div>
      <div className="py-6"></div>
    </div>
  )
}

export default TicketsView
