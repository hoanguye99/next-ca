import React from 'react'

interface TicketDetailProps {
  ticketId: string
}

const TicketDetail = (props: TicketDetailProps) => {
  return <div className="py-6">Hold up {props.ticketId}</div>
}

export default TicketDetail
