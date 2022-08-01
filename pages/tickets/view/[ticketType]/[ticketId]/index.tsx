import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/pages/_app'
import { PrimaryText, SecondaryText } from '@/components/styled'

const DynamicTicketDetail = dynamic(() => import('@/components/ticket-detail'), {
  ssr: false,
})

const TicketDetailPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { ticketId } = router.query
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <div className="container">
        <div className="flex justify-between items-center py-6 border-b">
          <div className="">
            <SecondaryText className="text-[10px]">OVERVIEW</SecondaryText>
            <PrimaryText className="sm:text-2xl text-xl">
              Ticket Detail
            </PrimaryText>
          </div>
          <div></div>
        </div>
        {typeof ticketId === 'string' && <DynamicTicketDetail ticketId={ticketId} />}
      </div>
    </>
  )
}

TicketDetailPage.Layout = MainLayout

export default TicketDetailPage
