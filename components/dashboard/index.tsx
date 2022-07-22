import React from 'react'
import { Button, PrimaryText, SecondaryText } from '../styled'
import BarChart from './bar-chart'
import Info1 from './info/info1'
import Info2 from './info/info2'
import Info3 from './info/info3'
import Info4 from './info/info4'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className="container">
      <div className="flex justify-between items-center py-6 border-b">
        <div className="">
          <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
          <PrimaryText className="text-2xl">Dashboard</PrimaryText>
        </div>
        <Button className="!transition-all ease-in-out hover:-translate-y-1 hover:shadow-lg text-sm">Create Report</Button>
      </div>

      <div className="py-6 grid grid-cols-8 gap-6">
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5">
          <Info1></Info1>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5">
          <Info2></Info2>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5">
          <Info3></Info3>
        </div>
        <div className="xl:col-span-2 lg:col-span-4 col-span-8 bg-white rounded-lg border border-gray-100 p-5">
          <Info4></Info4>

        </div>

        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 p-5">
          <BarChart />
        </div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100 p-5">1</div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100 p-5">1</div>
        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 p-5">1</div>
        <div className="lg:col-span-5 col-span-8 bg-white rounded-lg border border-gray-100 p-5">1</div>
        <div className="lg:col-span-3 col-span-8 bg-white rounded-lg border border-gray-100 p-5">1</div>
      </div>



    </div>
  )
}

export default Dashboard