'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden ml-auto flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white hover:text-[#D2C1B6] transition-colors focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg">
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-24 left-0 w-full bg-[#1B3C53]/95 backdrop-blur-xl flex flex-col items-center py-8 gap-6 border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
            >
                <Link href="/#about" onClick={() => setIsOpen(false)} className="text-xl font-semibold text-white hover:text-[#D2C1B6] transition-colors">About</Link>
                <Link href="/events" onClick={() => setIsOpen(false)} className="text-xl font-semibold text-white hover:text-[#D2C1B6] transition-colors">Events</Link>
                <Link href="/team" onClick={() => setIsOpen(false)} className="text-xl font-semibold text-white hover:text-[#D2C1B6] transition-colors">Team</Link>
                <Link href="/updates" onClick={() => setIsOpen(false)} className="text-xl font-semibold text-white hover:text-[#D2C1B6] transition-colors">Updates</Link>
                <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-xl font-semibold text-white hover:text-[#D2C1B6] transition-colors">Contact</Link>

                <a
                    href="https://services.acm.org/public/qj/proflevel/proflevel_control.cfm?level=3&country=India&form_type=Student&promo=ACMMSDEPT&pay=DD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-10 py-3 text-lg font-bold border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all text-white"
                >
                    Join Us
                </a>
            </div>
        </div>
    )
}
