import Head from 'next/head'
import React from 'react'

const MetaHeader = () => {
  return (
    <Head>
      <link rel="icon" href="/images/favicon.png" />
      <meta
        name="description"
        content="FPT Information System CA Website"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <title>{siteTitle}</title>
    </Head>
  )
}

export const siteTitle = 'FPT CA Website';
export default MetaHeader
