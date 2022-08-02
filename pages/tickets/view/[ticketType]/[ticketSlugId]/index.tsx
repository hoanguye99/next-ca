import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from '@/pages/_app'

const DynamicTicketDetail = dynamic(
  () => import('@/components/ticket-detail'),
  {
    ssr: false,
  }
)

const TicketDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <DynamicTicketDetail />
    </>
  )
}

TicketDetailPage.Layout = MainLayout

export default TicketDetailPage
