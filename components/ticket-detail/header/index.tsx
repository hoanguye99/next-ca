import LinkNavigation from '@/components/layout/common/link-navigation'
import { Button, PrimaryText } from '@/components/styled'
import { useRouter } from 'next/router'
import React from 'react'

const Header = () => {
  const router = useRouter()
  const { ticketType, ticketSlugId } = router.query

  return (
    <div className="py-6 border-b">
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <PrimaryText className="sm:text-2xl text-xl">Ticket Detail</PrimaryText>
        <div className="sm:flex-1 flex justify-between">
          <Button>Edit</Button>
          <Button>Open</Button>
        </div>
      </div>
    </div>
  )
}

export default Header
