import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { MainLayout } from '@/components/layout';
import { increment, selectCount } from '@/features/counter/counterSlice';
import Head from 'next/head';
import { useEffect } from 'react'
import { NextPageWithLayout } from './_app';

const About: NextPageWithLayout = () => {
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

export default About
