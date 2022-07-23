import { EmptyLayout } from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { NextPageWithLayout } from './_app'


const Default: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    void router.push('/login')
  })
  return (
    <div></div>
  )
}

Default.Layout = EmptyLayout

export default Default