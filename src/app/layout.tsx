import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SharedGlow } from '@/components/SharedGlow'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard | Gaming Accounts',
  description: 'Manage gaming accounts with a clean, dark-themed dashboard.',
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
