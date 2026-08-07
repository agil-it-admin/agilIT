import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Mulish } from 'next/font/google'
import { QuoteModalProvider } from '@/components/quote-modal-provider'
import './globals.css'

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Colonegotiator — Enterprise Colocation Sourcing',
  description:
    'Vendor-neutral enterprise colocation sourcing for mid-to-large organizations. Cabinets through ~1 MW, typically on 3–5 year terms. Free advisory, negotiated pricing, credibility you can take to procurement.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${mulish.variable} ${geistMono.variable} bg-background`}
    >
      <body className={`${mulish.className} font-sans antialiased`}>
        <QuoteModalProvider>{children}</QuoteModalProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
