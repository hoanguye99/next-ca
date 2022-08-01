import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
import { NextPageWithLayout } from '../../../_app'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'
import { PrimaryText, SecondaryText } from '@/components/styled'

const DynamicTicketViews = dynamic(() => import('@/components/tickets'), {
  ssr: false,
})

const TicketsViewType: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <div className="container">
        <div className="flex justify-between items-center py-6">
          <div className="">
            <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
            <PrimaryText className="text-2xl">View Tickets</PrimaryText>
          </div>
          <div></div>
        </div>
        <div className="border-b">
          ['']
        </div>
        <DynamicTicketViews />
      </div>
    </>
  )
}

TicketsViewType.Layout = MainLayout

export default TicketsViewType
