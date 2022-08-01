import Link from 'next/link'
import React from 'react'
import { LinkButton, PrimaryText, SecondaryText } from '../styled'

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <SecondaryText className="text-[11px] mb-5">404 ERROR</SecondaryText>
      <PrimaryText className="text-3xl">There’s no page here 😭</PrimaryText>
      <SecondaryText className="text-[14px] my-3 mb-6">Looks like you ended up here by accident?</SecondaryText>
      <Link href="/homepage" passHref>
        <LinkButton className="">
          Return to your dashboard
        </LinkButton>
      </Link>
    </div>
  )
}

export default NotFoundPage
