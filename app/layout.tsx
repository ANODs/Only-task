import type { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'
import "./index.css"
const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-pt-sans'
})

export const metadata: Metadata = {
  title: 'Only - Historical Timeline',
  description: 'Created with effort (chill)!',
  icons: 'favicon.svg',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={ptSans.variable}>
      <body>{children}</body>
    </html>
  )
}
