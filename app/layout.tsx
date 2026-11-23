import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Birthday, Adii! 🎂',
  description: 'A little birthday scrapbook made with love for Adii.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fff8fa',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}