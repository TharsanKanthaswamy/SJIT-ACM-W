import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link'
import Image from 'next/image'

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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/ACM-W_logo.webp"
                alt="ACM-W Logo"
                width={70}
                height={70}
                className="object-contain h-12 w-auto"
                priority
              />
              <span className="text-sm font-light text-blue-100 hidden sm:inline-block ml-2">St. Joseph&apos;s Institute of Technology</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/#about" className="hover:text-[#D2C1B6] transition-colors">About</Link>
              <Link href="/events" className="hover:text-[#D2C1B6] transition-colors">Events</Link>
              <Link href="/team" className="hover:text-[#D2C1B6] transition-colors">Team</Link>
              <Link href="/updates" className="hover:text-[#D2C1B6] transition-colors">Updates</Link>
              <Link href="/#contact" className="hover:text-[#D2C1B6] transition-colors">Contact</Link>
              <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                Join Us
              </button>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
