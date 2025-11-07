import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dopamine Reset Tracker - 14-Day Cigarette Withdrawal',
  description: '14-day program to help cigarette smokers reset dopamine and quit smoking with automatic progress tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
