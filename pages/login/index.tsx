import { EmptyLayout } from '@/components/layout'
import Login from '@/components/login'
import { NextPageWithLayout } from '@/pages/_app'
import Head from 'next/head'

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Login />
    </>
  )
}

LoginPage.Layout = EmptyLayout

export default LoginPage
