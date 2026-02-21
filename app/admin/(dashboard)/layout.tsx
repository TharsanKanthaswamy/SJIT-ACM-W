import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { LayoutDashboard, Users, Calendar } from 'lucide-react'
import { SignOutButton } from '@/components/SignOutButton'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-extrabold text-[#1B3C53]">ACM-W Admin</h2>
                    <p className="text-xs text-gray-500 mt-1 truncate">{user?.email}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/updates" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1B3C53] font-semibold transition-colors">
                        <LayoutDashboard size={20} />
                        Updates
                    </Link>
                    <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1B3C53] font-semibold transition-colors">
                        <Users size={20} />
                        Team
                    </Link>
                    <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-[#1B3C53] font-semibold transition-colors">
                        <Calendar size={20} />
                        Events
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100 mt-auto">
                    <SignOutButton />
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
