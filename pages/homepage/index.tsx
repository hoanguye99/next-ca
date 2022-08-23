import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
import { NextPageWithAuthLayout } from '../_app'
import { AllUserAuth } from '@/components/auth'
import Dashboard from '@/components/dashboard'

const HomePage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Dashboard />
    </>
  )
}

HomePage.Layout = MainLayout
HomePage.Auth = AllUserAuth

export default HomePage
