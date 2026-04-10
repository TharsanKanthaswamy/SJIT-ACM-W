import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link'
import Image from 'next/image'
import { MobileNav } from '@/components/MobileNav'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SJIT ACM-W Chapter | St. Joseph's Institute of Technology",
  description:
    "Official ACM-W Student Chapter of St. Joseph's Institute of Technology (SJIT), Chennai. Explore events, team, initiatives, and opportunities for women in computing.",
  icons: {
    icon: "https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/ACM-W_logo.webp?v=1",
  },
  verification: {
    google: "n6HEnPCuUr1V-1bxwIk3IMb_shu15Im6v0oK2XUhl60",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable} font-sans`}>
        <nav className="fixed top-0 w-full z-50 bg-[#1B3C53]/90 backdrop-blur-md border-b border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="https://kburhhdhrzmnbfrutqnu.supabase.co/storage/v1/object/public/assets/ACM-W_logo.webp"
                alt="ACM-W Logo"
                width={150}
                height={150}
                className="object-contain h-[7rem] w-auto -ml-2"
                priority
              />
              <span className="text-lg sm:text-xl font-bold text-white inline-block ml-2 tracking-wide">ADS SJIT ACM-W</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-base font-semibold">
              <Link href="/#about" className="hover:text-[#D2C1B6] transition-colors">About</Link>
              <Link href="/events" className="hover:text-[#D2C1B6] transition-colors">Events</Link>
              <Link href="/team" className="hover:text-[#D2C1B6] transition-colors">Team</Link>
              <Link href="/updates" className="hover:text-[#D2C1B6] transition-colors">Updates</Link>
              <Link href="/#contact" className="hover:text-[#D2C1B6] transition-colors">Contact</Link>
              <a href="https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=ACMMSDEPT&pay=DD" target="_blank" rel="noopener noreferrer" className="px-8 py-2.5 text-lg border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all">
                Join Us
              </a>
            </div>
            {/* Mobile Navigation */}
            <MobileNav />
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
