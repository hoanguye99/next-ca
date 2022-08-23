import { AllUserAuth } from '@/components/auth'
import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import { NextPageWithAuthLayout } from './_app'


const About: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>About Page</title>
      </Head>
      <p>About Page</p>
    </>
  )
}

About.Layout = MainLayout
About.Auth = AllUserAuth


export default About
