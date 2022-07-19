import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>HomefPffage</div>
    </>
  )
}

HomePage.Layout = MainLayout

export default HomePage
