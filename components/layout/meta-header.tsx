import Head from 'next/head'
import React from 'react'

const MetaHeader = () => {
  return (
    <Head>
      <link rel="icon" href="/images/zing-icon.png" />
      <meta
        name="description"
        content="A Next.js implementation of zing-mp3.com"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export const siteTitle = 'Next zing-mp3';
export default MetaHeader
