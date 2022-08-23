import { AllUserAuth } from '@/components/auth'
import { EmptyLayout } from '@/components/layout'
import { useRouter } from 'next/router'
import { NextPageWithAuthLayout } from '../../_app'

const TicketsView: NextPageWithAuthLayout = () => {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/tickets/view/open-request')
  }

  return <></>
}

TicketsView.Layout = EmptyLayout
TicketsView.Auth = AllUserAuth

export default TicketsView
