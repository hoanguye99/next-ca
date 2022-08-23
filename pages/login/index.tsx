import { EmptyLayout } from '@/components/layout'
import Login from '@/components/login'
import { NextPageWithAuthLayout } from '@/pages/_app'
import Head from 'next/head'

const LoginPage: NextPageWithAuthLayout = () => {
  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <Login />
    </>
  )
}

LoginPage.Layout = EmptyLayout

export default LoginPage
