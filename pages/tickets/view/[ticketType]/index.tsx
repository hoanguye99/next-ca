import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
// import Dashboard from '@/components/dashboard'
import { AllUserAuth } from '@/components/auth'
import NotFoundPage from '@/components/common/not-found'
import { statusInfoData } from '@/components/dashboard/status-info'
import { PrimaryText } from '@/components/styled'
import TicketsTypeView from '@/components/ticket-type-view'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Link from 'next/link'
import { useRouter } from 'next/router'


const TicketsViewType: NextPageWithAuthLayout = () => {
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
              key={item.type}
              type={item.type}
              selected={
                typeof ticketType === 'string'
                  ? ticketType.split('-').join('_').toUpperCase() === item.type
                  : false
              }
            ></Tab>
          ))}
        </div>
        {typeof ticketType === 'string' && (
          <TicketsTypeView
            ticketType={ticketType.split('-').join('_').toUpperCase()}
            asPath={router.asPath}
          />
        )}
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
      <Link href={props.type.split('_').join('-').toLowerCase()}>
        <a>
          <PrimaryText
            className={`sm:text-sm text-[10px] pb-2.5 ${
              props.selected ? 'text-black' : 'text-gray-400 hover:text-black'
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
TicketsViewType.Auth = AllUserAuth


export default TicketsViewType
