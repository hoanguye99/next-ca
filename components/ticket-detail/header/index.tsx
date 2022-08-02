import LinkNavigation from '@/components/layout/common/link-navigation'
import { PrimaryText } from '@/components/styled'
import { useRouter } from 'next/router'
import React from 'react'


const Header = () => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query

  return (
    <div className="flex justify-between items-center py-6 border-b">
      <div className="">
        {typeof ticketSlugId === 'string' && typeof ticketType === 'string' && (
          <LinkNavigation
            nav={[
              {
                disp: ticketType.split('-').join(' ').toUpperCase(),
                link: router.asPath.split('/').slice(0, -1).join('/'),
              },
              {
                disp: ticketSlugId.split('.')[0],
                link: router.asPath,
              },
            ]}
          />
        )}

        <PrimaryText className="sm:text-2xl text-xl">Ticket Detail</PrimaryText>
      </div>
      <div></div>
    </div>
  )
}

export default Header
