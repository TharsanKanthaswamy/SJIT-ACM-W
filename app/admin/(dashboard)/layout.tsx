import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from './Sidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="h-screen pt-20 bg-gray-50 flex flex-col md:flex-row overflow-hidden">
            <DashboardSidebar email={user?.email} />

            <main className="flex-1 shadow-inner overflow-y-auto">
                <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
                    {children}
                </div>
            </main>
        </div>
    )
}
