import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SharedGlow } from '@/components/SharedGlow'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'VACCS | Gaming Account Management',
    template: '%s | VACCS'
  },
  description: 'Manage gaming accounts with a secure, clean, dark-themed dashboard. Track current and peak ranks, region, and login details.',
  keywords: ['gaming accounts', 'account management', 'dashboard', 'tracking', 'gaming'],
  authors: [{ name: 'VACCS' }],
  creator: 'VACCS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaccs.vercel.app',
    title: 'VACCS | Gaming Account Management',
    description: 'Manage gaming accounts with a secure, clean, dark-themed dashboard.',
    siteName: 'VACCS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VACCS | Gaming Account Management',
    description: 'Manage gaming accounts with a secure, clean, dark-themed dashboard.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-amber-500/30 relative overflow-x-hidden`}>
        <SmoothScroll>
          <SharedGlow />
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
