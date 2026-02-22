'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, Users, Rss, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/app/actions'
import { useToast } from '@/hooks/use-toast'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const { toast } = useToast()

    const handleLogout = async () => {
        await logoutAdmin()
        router.push('/')
        router.refresh()
        toast({
            title: "Logged out",
            description: "You have been successfully logged out of the admin panel.",
        })
    }

    const navItems = [
        { href: '/admin/events', label: 'Events', icon: CalendarDays },
        { href: '/admin/team', label: 'Team', icon: Users },
        { href: '/admin/updates', label: 'Updates', icon: Rss },
    ]

    // Don't show sidebar on the login page
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1B3C53] text-white flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <LayoutDashboard className="h-6 w-6 text-white/80" />
                    <span className="font-extrabold text-xl tracking-wide">ACM-W Admin</span>
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

                <div className="p-4 border-t border-white/10">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-start gap-3 text-red-300 hover:bg-white/5 hover:text-red-200 px-4 py-3 h-auto rounded-xl"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 shadow-inner h-screen overflow-y-auto">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
