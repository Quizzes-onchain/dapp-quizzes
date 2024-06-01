import '@/public/assets/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import Layout from '../layouts'
import GeneralProvider from '../providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_HOST || 'https://quizzes.vertiree.com/'),
  title: 'Quizzes on-chain',
  description: 'Choose from millions of quizzes covering math, science, English, history and more.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Quizzes on-chain',
    description: 'Choose from millions of quizzes covering math, science, English, history and more.',
    url: process.env.NEXT_PUBLIC_APP_HOST || 'https://quizzes.vertiree.com/',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  width: '100%',
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <GeneralProvider>
          <Layout>{children}</Layout>
        </GeneralProvider>
      </body>
    </html>
  )
}
