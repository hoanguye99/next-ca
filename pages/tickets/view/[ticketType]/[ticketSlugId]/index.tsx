import { AllUserAuth } from '@/components/auth'
import { MainLayout } from '@/components/layout/main'
import TicketDetail from '@/components/ticket-detail'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'


const TicketDetailPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <TicketDetail />
    </>
  )
}

TicketDetailPage.Layout = MainLayout
TicketDetailPage.Auth = AllUserAuth


export default TicketDetailPage
