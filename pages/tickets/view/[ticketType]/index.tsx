import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'
import { PrimaryText, SecondaryText } from '@/components/styled'
import { statusInfoData } from '@/components/dashboard/status-info'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NotFoundPage from '@/components/common/not-found'
import { NextPageWithLayout } from '@/pages/_app'

const DynamicTicketViews = dynamic(() => import('@/components/ticket-type-view'), {
  ssr: false,
})

const TicketsViewType: NextPageWithLayout = () => {
  const router = useRouter()
  const { ticketType } = router.query
  if (
    typeof ticketType === 'string' &&
    !statusInfoData
      .map((item) => item.type)
      .includes(ticketType.split('-').join('_').toUpperCase())
  ) {
    return <NotFoundPage />
  }
  return (
    <>
      <Head>
        <title>View Tickets</title>
      </Head>
      <div className="container">
        <div className="flex justify-between items-center py-6">
          <div className="">
            <PrimaryText className="sm:text-2xl text-xl">
              View Tickets
            </PrimaryText>
          </div>
          <div></div>
        </div>
        <div className="border-b flex gap-6">
          {statusInfoData.map((item) => (
            <Tab
              type={item.type}
              selected={
                typeof ticketType === 'string'
                  ? ticketType.split('-').join('_').toUpperCase() === item.type
                  : false
              }
            ></Tab>
          ))}
        </div>
        {typeof ticketType === 'string' && <DynamicTicketViews ticketType={ticketType.split('-').join('_').toUpperCase()} asPath={router.asPath} />}
      </div>
    </>
  )
}

interface TabProps {
  selected: boolean
  type: string
}

const Tab = (props: TabProps) => {
  return (
    <div
      key={props.type}
      className={`${props.selected ? 'border-b-2 border-b-blue-primary' : ''}`}
    >
      <Link scroll={true} href={props.type.split('_').join('-').toLowerCase()}>
        <a>
          <PrimaryText
            className={`sm:text-sm text-[10px] pb-2.5 ${
              props.selected
                ? 'text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {props.type.split('_').join(' ')}
          </PrimaryText>
        </a>
      </Link>
    </div>
  )
}

TicketsViewType.Layout = MainLayout

export default TicketsViewType
