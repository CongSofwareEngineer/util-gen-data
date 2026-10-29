import type { Metadata, Viewport } from 'next'

import './globals.css'
import MyModal from '@/components/MyModal'
import ReactQuery from '@/components/ReactQuery'
import Toast from '@/components/Toast'
import { GOOGLE_FONTS_URL, SITE_CONFIG } from '@/constants/app'
import { translate } from '@/utils/language'

const siteName = translate('site.name')
const siteDescription = translate('site.description')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    locale: 'vi',
    images: { url: SITE_CONFIG.thumbnail, width: 1200, height: 630, alt: siteName },
    url: SITE_CONFIG.url,
    type: 'website',
  },
  icons: {
    icon: { url: SITE_CONFIG.icon },
    apple: { url: SITE_CONFIG.icon },
  },
}

export const viewport: Viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
  interactiveWidget: 'resizes-content',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi' data-theme='thiep' className='h-full'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='stylesheet' href={GOOGLE_FONTS_URL} />
      </head>
      <body className='min-h-full'>
        <ReactQuery>
          {children}
          <MyModal />
          <Toast />
        </ReactQuery>
      </body>
    </html>
  )
}
