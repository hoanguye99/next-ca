import { useGetTicketDetail } from '@/hooks/query/ticket-detail'
import { useRouter } from 'next/router'
import { PrimaryText } from '../styled'
import Comments from './comments'
import Dates from './dates'
import DetailsWrapper from './details'
import HeaderWrapper from './header'
import PeopleWrapper from './people'
import TimeTracking from './time-tracking'
import WorkLogWrapper from './work-log'

const TicketDetail = () => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query
  const getTicketDetail = useGetTicketDetail(ticketSlugId)
  if (getTicketDetail.status === 'error') console.log(getTicketDetail.error)

  return (
    <div className="container">
      <HeaderWrapper getTicketDetail={getTicketDetail} />
      <div className="py-6 grid grid-cols-12 gap-6">
        <div className="sm:col-span-8	col-span-12 flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b p-4">
              <PrimaryText className="">Details</PrimaryText>
            </div>
            <div className="p-4">
              <DetailsWrapper
                getTicketDetail={getTicketDetail}
              ></DetailsWrapper>
              {getTicketDetail.status === 'success' && (
                <Comments getTicketDetailData={getTicketDetail.data}></Comments>
              )}
            </div>
          </div>
          <WorkLogWrapper getTicketDetail={getTicketDetail}></WorkLogWrapper>
        </div>
        <div className="sm:col-span-4 col-span-12 flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b p-4">
              <PrimaryText className="">People</PrimaryText>
            </div>
            <div className="p-4">
              <PeopleWrapper getTicketDetail={getTicketDetail}></PeopleWrapper>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b p-4">
              <PrimaryText className="">Time Tracking</PrimaryText>
            </div>
            <div className="p-5 min-h-[340px]">
              <TimeTracking getTicketDetail={getTicketDetail}></TimeTracking>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b p-4">
              <PrimaryText className="">Dates</PrimaryText>
            </div>
            <div className="p-4">
              <Dates getTicketDetail={getTicketDetail}></Dates>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
