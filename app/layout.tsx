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
        <nav className="fixed top-0 w-full z-50 bg-[#1B3C53]/90 backdrop-blur-md border-b border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold font-sans tracking-tight">ACM-W</span>
              <span className="text-sm font-light text-blue-100 hidden sm:inline-block">St. Joseph's Institute of Technology</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#about" className="hover:text-[#D2C1B6] transition-colors">About</a>
              <a href="#events" className="hover:text-[#D2C1B6] transition-colors">Events</a>
              <a href="#team" className="hover:text-[#D2C1B6] transition-colors">Team</a>
              <a href="#contact" className="hover:text-[#D2C1B6] transition-colors">Contact</a>
              <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                Join Us
              </button>
            </div>
          </div>
        </nav>
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
