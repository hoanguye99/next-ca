import '../styles/global.scss'
import { EmptyLayout } from '@/components/layout'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { injectStore } from '@/api/axios-client'
injectStore(store)
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import toast, { Toaster } from 'react-hot-toast'
import { AxiosError } from 'axios'

export interface LayoutProps {
  children: ReactNode
  className?: string
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          containerClassName="mt-[60px] lg:mt-0"
          toastOptions={{ className: '' }}
        ></Toaster>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
