import { EmptyLayout } from '@/components/layout'
import { useRouter } from 'next/router'
import React from 'react'
import { NextPageWithLayout } from '../../_app'
// import Dashboard from '@/components/dashboard'

const TicketsView: NextPageWithLayout = () => {
  const router = useRouter()
   // Make sure we're in the browser
   if (typeof window !== 'undefined') {
     router.push('/tickets/view/open-request')
   }

  return (
    <>
    </>
  )
}

TicketsView.Layout = EmptyLayout

export default TicketsView
