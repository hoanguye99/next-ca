import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { NextPageWithLayout } from '../_app'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'

const DynamicCreateTicket = dynamic(() => import('@/components/create-ticket'), {
  ssr: false,
})

const CreateTicketPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Ticket</title>
      </Head>
      <DynamicCreateTicket />
    </>
  )
}

CreateTicketPage.Layout = MainLayout

export default CreateTicketPage
