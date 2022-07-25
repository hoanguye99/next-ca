import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import React from 'react'
import { Button, PrimaryText, SecondaryText } from '../styled'
import BarChart from './bar-chart'
import DashBoardData from './dashboard-data'
import Info1 from './info/info1'
import Info2 from './info/info2'
import Info3 from './info/info3'
import Info4 from './info/info4'
import LineChart from './line-chart'
import PieChart from './pie-chart'
import ProjectSummary from './project-summary'

type Props = {}

const Dashboard = (props: Props) => {
  const userDetail = useAppSelector(selectUserDetail)
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
          <PrimaryText className="text-2xl">Dashboard</PrimaryText>
        </div>
        <Button className="!transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg text-sm">
          Create Report
        </Button>
      </div>

      <div className="py-6 grid grid-cols-8 gap-6">
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5 min-h-[65px]">
          <Info1></Info1>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5 min-h-[65px]">
          <Info2></Info2>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5 min-h-[65px]">
          <Info3></Info3>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5 min-h-[65px]">
          <Info4></Info4>
        </div>

        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 ">
          <div className="border-b p-4">
            <PrimaryText className="">Orders</PrimaryText>
          </div>
          <div className="p-5 pt-0 h-[340px]">
            <BarChart />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Devices</PrimaryText>
          </div>
          <div className="p-5 h-[340px]">
            <PieChart />
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
            <LineChart />
          </div>
        </div>
        <div className="col-span-8 bg-white rounded-lg border border-gray-100">
          <div className="border-b p-4">
            <PrimaryText className="">Goals</PrimaryText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
