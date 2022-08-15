import { useGetAllTicketStatus } from '@/hooks/query/dashboard'
import { RequestDetail } from '@/models/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import Link from 'next/link'
import EmptyView from '../common/empty-view'
import InitialImage from '../common/get-initial'
import { InputSearch, LinkButton, PrimaryText } from '../styled'

interface TicketsTypeViewProps {
  ticketType: string
  asPath: string
}

const TicketsTypeView = (props: TicketsTypeViewProps) => {
  const getAllTicketStatus = useGetAllTicketStatus()
  const dispData =
  getAllTicketStatus.data !== undefined
      ? getAllTicketStatus.data.tickets.find((obj) => obj.type === props.ticketType)
      : undefined
  return (
    <div className="py-6">
      <div className="flex flex-row items-center gap-3">
        <div className="flex-1">
          <InputSearch className="" placeholder="Search Tickets"></InputSearch>
        </div>
        <Link href="/tickets/create" passHref>
          <LinkButton className="!transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg text-sm">
            Create Ticket
          </LinkButton>
        </Link>
      </div>
      {dispData !== undefined ? (
        <div className="mt-6 grid grid-cols-6 gap-6">
          {dispData.details.map((ticket) => (
            <TicketOverview
              key={ticket.id}
              asPath={props.asPath}
              {...ticket}
            ></TicketOverview>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyView>
            <p className="text-2xl text-gray-400">No Request to show</p>
          </EmptyView>
        </div>
      )}
    </div>
  )
}

interface TicketsOveriewProps extends RequestDetail {
  asPath: string
}

const TicketOverview = (props: TicketsOveriewProps) => {
  return (
    <div className="xl:col-span-2 md:col-span-3 col-span-6 bg-white rounded-lg border shadow-md hover:shadow-lg border-gray-100 h-[200px]">
      <Link href={`${props.asPath}/${props.issue_key}`}>
        <a>
          <div className="p-5 h-full flex flex-col justify-between">
            <div>
              <PrimaryText className="text-sm">{props.issue_key}</PrimaryText>
              <div className="flex mt-1 gap-2 items-center">
                <InitialImage name={props.customer_name}></InitialImage>
                <p className="text-xs text-gray-500">{props.customer_name}</p>
              </div>
            </div>
            <p className="text-sm">{props.summary}</p>
            <div className="flex justify-between items-center text-gray-400 text-xs">
              <p>{props.request_type_name}</p>
              <p className="">Due {dayjs(props.resolved_date).fromNow()}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default TicketsTypeView
