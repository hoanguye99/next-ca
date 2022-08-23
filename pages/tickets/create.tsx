import { AllUserAuth } from '@/components/auth'
import CreateTicket from '@/components/create-ticket'
import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import { NextPageWithAuthLayout } from '../_app'



const CreateTicketPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Create Ticket</title>
      </Head>
      <CreateTicket />
    </>
  )
}

CreateTicketPage.Layout = MainLayout
CreateTicketPage.Auth = AllUserAuth


export default CreateTicketPage
