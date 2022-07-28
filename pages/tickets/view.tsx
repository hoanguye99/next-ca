import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
import { NextPageWithLayout } from '../_app'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'

const DynamicTicketViews = dynamic(() => import('@/components/tickets'), {
  ssr: false,
})

const CreateTicketPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <DynamicTicketViews />
    </>
  )
}

CreateTicketPage.Layout = MainLayout

export default CreateTicketPage
