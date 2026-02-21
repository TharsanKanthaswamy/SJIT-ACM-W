'use client'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors"
        >
            <LogOut size={20} />
            Sign Out
        </button>
    )
}
