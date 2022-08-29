import { MainLayout } from '@/components/layout/main'
import Head from 'next/head'
import React from 'react'
import { NextPageWithAuthLayout } from '../_app'
import { AllUserAuth } from '@/components/auth'
import Dashboard from '@/components/dashboard'

const DashboardPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Dashboard />
    </>
  )
}

DashboardPage.Layout = MainLayout
DashboardPage.Auth = AllUserAuth

export default DashboardPage
