import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { NextPageWithLayout } from '../_app'
// import Dashboard from '@/components/dashboard'
import dynamic from 'next/dynamic'

const DynamicDashboard = dynamic(() => import('@/components/dashboard'), {
  ssr: false,
})

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <DynamicDashboard />
    </>
  )
}

HomePage.Layout = MainLayout

export default HomePage
