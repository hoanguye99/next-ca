import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'
import { Button, PrimaryText, SecondaryText } from '../styled'
import BarChart from './bar-chart'
import DashBoardData from './dashboard-data'
import LineChart from './line-chart'
import OpenRequestTable from './open-request-table'
import ProjectSummary from './project-summary'
import DoughnutChart from './doughnut-chart'
import StatusInfo, { statusInfoData } from './status-info'

type Props = {}

const Dashboard = (props: Props) => {
  const userDetail = useAppSelector(selectUserDetail)
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
            <DashBoardData
              type="all-ticket-status"
              fetcher={() => staffApi.getAllTicketStatusByStaff(userDetail)}
              render={(data) => <StatusInfo data={data} {...item} />}
            />
          </div>
        ))}

        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 ">
          <div className="border-b p-4">
            <PrimaryText className="">Status</PrimaryText>
          </div>
          <div className="p-5 h-[340px]">
            <DashBoardData
              type="all-ticket-status"
              fetcher={() => staffApi.getAllTicketStatusByStaff(userDetail)}
              render={(data) => <BarChart data={data} />}
            />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Requests</PrimaryText>
          </div>
          <div className="p-5 h-[340px]">
            <DashBoardData
              type="all-ticket-status"
              fetcher={() => staffApi.getAllTicketStatusByStaff(userDetail)}
              render={(data) => <DoughnutChart data={data} />}
            />
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
              <DashBoardData
                type="project-summary"
                fetcher={() => staffApi.getAllProjects(userDetail)}
                render={(data) => <ProjectSummary data={data} />}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Performance</PrimaryText>
          </div>
          <div className="p-5 pt-0 h-[340px]">
            <DashBoardData
              type="get-time-spent"
              fetcher={() => staffApi.getTimeSpent(userDetail)}
              render={(data) => <LineChart data={data} />}
            />
          </div>
        </div>
        <div className="col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="p-4">
            <PrimaryText className="">Open Requests</PrimaryText>
          </div>
          <div className="">
            <DashBoardData
              type="all-ticket-status"
              fetcher={() => staffApi.getAllTicketStatusByStaff(userDetail)}
              render={(data) => <OpenRequestTable data={data} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
