import { LayoutProps } from '@/pages/_app'
import MetaHeader from './meta-header'
import { useUserLogout } from '@/hooks/useUserLogout'

import { useAppDispatch } from '@/app/hooks'
import { Footer } from '@/components/footer'
import Header from './common/header'
import Sidebar from './common/side-bar'

export function MainLayout({ children }: LayoutProps) {
  const dispatch = useAppDispatch()
  const { handleLogoutButton } = useUserLogout()

  // useEffect(() => {
  //   dispatch(getCartAsync())
  //   dispatch(getAllOrdersAsync())
  //   dispatch(getListBankAsync())
  //   dispatch(getPaymentMethodsAsync())
  // }, [])

  const data = [
    {
      link: '/homepage',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      text: 'Trang chủ',
    },
    {
      link: '/about',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      <Sidebar
        handleLogoutButton={handleLogoutButton}
        currentPath="/homepage"
        data={data}
      />
      <div
        id="body-overflow"
        className="flex-1 lg:h-full lg:mt-0 h-body mt-[70px] overflow-y-auto"
      >
        <div className="lg:min-h-screen min-h-body">
          <Header handleLogoutButton={handleLogoutButton} data={data} />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}