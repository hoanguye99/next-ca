import {
  useGetAllTicketStatus,
  useGetProjectSummary,
  useGetTimeSpent,
} from '@/hooks/query/dashboard'
import { PrimaryText } from '../styled'
import BarChart from './bar-chart'
import DoughnutChart from './doughnut-chart'
import LineChart from './line-chart'
import ProjectSummary from './project-summary'
import StatusInfo, { statusInfoData } from './status-info'

const Dashboard = () => {
  const getAllTicketStatus = useGetAllTicketStatus()
  const getProjectSummary = useGetProjectSummary()
  const getTimeSpent = useGetTimeSpent()
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <PrimaryText className="sm:text-2xl text-xl">Dashboard</PrimaryText>
        </div>
        <div></div>
      </div>

      <div className="py-6 grid grid-cols-8 gap-6">
        {statusInfoData.map((item) => (
          <div
            key={item.type}
            className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 min-h-[65px]"
          >
            <StatusInfo getAllTicketStatus={getAllTicketStatus} {...item} />
          </div>
        ))}

        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 ">
          <div className="border-b p-4">
            <PrimaryText className="">Status</PrimaryText>
          </div>
          <div className="p-5 h-[340px]">
            <BarChart getAllTicketStatus={getAllTicketStatus} />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Requests</PrimaryText>
          </div>
          <div className="p-5 h-[340px]">
            <DoughnutChart getAllTicketStatus={getAllTicketStatus} />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4 flex justify-between items-center">
            <PrimaryText className="">Projects</PrimaryText>
            <button className="text-[12px] w-fit text-blue-primary transition-all duration-75 hover:text-blue-hover active:text-blue-focus">
              View all
            </button>
          </div>
          <div className="p-5 h-[340px]">
            <div className="w-full h-full flex flex-col divide-y overflow-hidden">
              <ProjectSummary getProjectSummary={getProjectSummary} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Performance</PrimaryText>
          </div>
          <div className="p-5 pt-0 h-[340px]">
            <LineChart getTimeSpent={getTimeSpent} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
