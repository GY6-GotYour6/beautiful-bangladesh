import React from 'react'
import { Outfit, Caveat } from 'next/font/google'
import { SiteHeader } from '@/components/nav/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import './styles.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['500', '700'],
  display: 'swap',
})

export const metadata = {
  description:
    'Discover Beautiful Bangladesh — destinations, creator reels, food, and culture across the country.',
  title: 'Beautiful Bangladesh',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${outfit.variable} ${caveat.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', background: '#faf7f2' }}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
