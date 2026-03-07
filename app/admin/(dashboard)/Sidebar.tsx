'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { CalendarDays, Users, Rss, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function DashboardSidebar({ email }: { email?: string }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const navItems = [
        { href: '/admin/events', label: 'Events', icon: CalendarDays },
        { href: '/admin/team', label: 'Team', icon: Users },
        { href: '/admin/updates', label: 'Updates', icon: Rss },
    ]

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <aside className="w-full md:w-64 bg-[#1B3C53] text-white flex flex-col h-full border-r border-[#153043]">
            <div className="p-6 border-b border-white/10 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 rounded-full bg-white overflow-hidden">
                        <Image src="/logo.webp" alt="ACM-W Logo" fill className="object-contain" sizes="32px" />
                    </div>
                    <span className="font-extrabold text-xl tracking-wide">Admin</span>
                </div>
                {email && <p className="text-xs text-white/50 mt-2 truncate w-full" title={email}>{email}</p>}
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? 'bg-white/10 text-white shadow-sm'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-start gap-3 text-red-300 hover:bg-white/5 hover:text-red-200 px-4 py-3 h-auto rounded-xl"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                </Button>
            </div>
        </aside>
    )
}
