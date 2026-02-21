import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'St. Joseph\'s ACM-W Student Chapter',
  description: 'Empowering Women in Computing at St. Joseph\'s Institute of Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
