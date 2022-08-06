import { useGetTicketDetail } from '@/hooks/query'
import { useRouter } from 'next/router'
import { Button, PrimaryText } from '../styled'
import Comments from './comments'
import Dates from './dates'
import Details from './details'
import Header from './header'
import People from './people'
import TimeTracking from './time-tracking'
import WorkLog from './work-log'

const TicketDetail = () => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query
  const {
    status: status1,
    data: getTicketDetailData,
    error: error1,
  } = useGetTicketDetail(ticketSlugId)
  if (status1 === 'error') console.log(error1)

  return (
    <div className="container">
      {getTicketDetailData !== undefined && (
        <>
          <Header getTicketDetailData={getTicketDetailData} />
          <div className="py-6 grid grid-cols-12 gap-6">
            <div className="sm:col-span-8	col-span-12 flex flex-col gap-6">
              <div className="bg-white rounded-lg border border-gray-100">
                <div className="border-b p-4">
                  <PrimaryText className="">Details</PrimaryText>
                </div>
                <div className="p-4">
                  <Details getTicketDetailData={getTicketDetailData}></Details>
                </div>
              </div>
              <WorkLog getTicketDetailData={getTicketDetailData}></WorkLog>
              <div className="bg-white rounded-lg border border-gray-100">
                <div className="border-b p-4">
                  <PrimaryText className="">Comments</PrimaryText>
                </div>
                <div className="">
                  <Comments
                    getTicketDetailData={getTicketDetailData}
                  ></Comments>
                </div>
              </div>
            </div>
            <div className="sm:col-span-4 col-span-12 flex flex-col gap-6">
              <div className="bg-white rounded-lg border border-gray-100">
                <div className="border-b p-4">
                  <PrimaryText className="">People</PrimaryText>
                </div>
                <div className="p-4">
                  <People getTicketDetailData={getTicketDetailData}></People>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-100">
                <div className="border-b p-4">
                  <PrimaryText className="">Dates</PrimaryText>
                </div>
                <div className="p-4">
                  <Dates getTicketDetailData={getTicketDetailData}></Dates>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-100">
                <div className="border-b p-4">
                  <PrimaryText className="">Time Tracking</PrimaryText>
                </div>
                <div className="p-5 h-[340px]">
                  <TimeTracking
                    getTicketDetailData={getTicketDetailData}
                  ></TimeTracking>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TicketDetail
