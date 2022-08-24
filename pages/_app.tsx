import '../styles/global.scss'
import { EmptyLayout } from '@/components/layout'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios'
import { PublicAuth } from '@/components/auth'

export interface LayoutProps {
  children: ReactNode
  className?: string
}

export interface AuthProps {
  children: ReactNode
  className?: string
}

export type NextPageWithAuthLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
  Auth?: React.ComponentType<AuthProps>
}

type AppPropsWithAuthLayout = AppProps & {
  Component: NextPageWithAuthLayout
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      // if (query.state.data !== undefined) {
      toast.error((error as AxiosError<unknown, any>).message)
      // }
    },
  }),
})

function MyApp({ Component, pageProps }: AppPropsWithAuthLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const Auth = Component.Auth ?? PublicAuth
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        containerClassName="mt-[60px] lg:mt-0"
        toastOptions={{ className: '' }}
      ></Toaster>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
