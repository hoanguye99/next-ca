import { useGetConfigTicket } from '@/hooks/query'
import { useGetAllTicketStatus } from '@/hooks/query/useGetAllTicketStatus'
import { RequestDetail } from '@/models/api'
import Link from 'next/link'
import React from 'react'
import { Button, InputSearch, NormalText, PrimaryText, SecondaryText } from '../styled'

interface TicketsViewProps {}

const TicketsView = (props: TicketsViewProps) => {
  const { status, data, error } = useGetAllTicketStatus()
  if (status === 'error') console.log(error)
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
          <PrimaryText className="text-2xl">View Tickets</PrimaryText>
        </div>
        <div></div>
      </div>
      <div className="py-6">
        <div className="flex flex-row items-center gap-3">
          <div className="flex-1">
            <InputSearch
              className=""
              placeholder="Search Tickets"
            ></InputSearch>
          </div>
          <Link href="/tickets/create" passHref>
            <Button className="!transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg text-sm">
              <a>Create Ticket</a>
            </Button>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-6 gap-6">
          {data !== undefined &&
            data.tickets
              .find((obj) => obj.type === 'OPEN_REQUEST')
              ?.details.map((ticket) => (
                <TicketOverview key={ticket.id} {...ticket}></TicketOverview>
              ))}
        </div>
      </div>
    </div>
  )
}

interface TicketsOveriewProps extends RequestDetail {}

const TicketOverview = (props: TicketsOveriewProps) => {
  const {
    status: status1,
    data: getConfigTicketData,
    error: error1,
  } = useGetConfigTicket()
  if (status1 === 'error') console.log(error1)

  const projectName =
    getConfigTicketData === undefined
      ? ""
      : getConfigTicketData.projects.find(
          (project) => project.project_id === props.project_id
        )?.name
  return (
    <div className="xl:col-span-2 md:col-span-3 col-span-6 bg-white rounded-lg border shadow-sm hover:shadow-md hover:cursor-pointer border-gray-100 p-5 h-[170px]">
      <div className="h-full flex flex-col justify-between">
        <div>
          <NormalText className="text-sm">{projectName || ""}</NormalText>
          <SecondaryText className="text-xs">{props.customer_name}</SecondaryText>
        </div>
        <p>{props.summary}</p>
        <p className="text-gray-400 text-xs">Due date: {props.resolved_date}</p>
      </div>
    </div>
  )
}

export default TicketsView
