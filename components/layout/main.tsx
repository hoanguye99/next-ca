import { LayoutProps } from '@/pages/_app'
import MetaHeader from './meta-header'
import { Footer } from '@/components/common/footer'
import Header from './common/header'
import Sidebar from './common/side-bar'
import { useRouter } from 'next/router'
import { useRefreshToken } from '@/hooks'
import useAuthenAllUser from '@/hooks/useAuthenAllUser'
import { Scrollbars } from 'react-custom-scrollbars-2'

export function MainLayout({ children }: LayoutProps) {
  const router = useRouter()
  useRefreshToken()
  useAuthenAllUser()

  const data = [
    {
      link: '/homepage',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      text: 'Dashboard',
    },
    {
      link: '/tickets/create',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      text: 'Create Ticket',
    },
    {
      link: '/tickets/view',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
      text: 'View Tickets',
    },
    {
      link: '/about',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      text: 'About',
    },
  ]

  return (
    <div className="bg-[#f9fbfd] flex flex-row h-screen">
      <MetaHeader />
      <Sidebar currentPath={router.asPath} data={data} />
      <div
        id="body-overflow"
        className="flex-1 lg:h-full lg:mt-0 h-body mt-[70px]"
      >
        <Scrollbars
          universal
          autoHide
          autoHideTimeout={2000}
          autoHideDuration={150}
        >
          <div className="lg:min-h-screen min-h-body">
            <Header data={data} />
            {children}
          </div>
          <Footer />
        </Scrollbars>
      </div>
    </div>
  )
}
