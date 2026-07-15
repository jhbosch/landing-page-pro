import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900']
})

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'MotoRex | Motos y Vehículos Premium',
  description: 'Encuentra el vehículo perfecto para tu próxima aventura. Las mejores marcas de motos, scooters, ATVs y más con financiamiento a tu medida.',
  keywords: ['motos', 'vehículos', 'motorcycles', 'scooters', 'ATV', 'dealership', 'financing'],
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
  themeColor: '#0B0C10',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
