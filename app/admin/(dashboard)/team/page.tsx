import { createClient } from '@/lib/supabase/server'
import { TeamClient } from './TeamClient'

export default async function TeamAdminPage() {
    const supabase = await createClient()

    const { data: team } = await supabase
        .from('teamMembers')
        .select('*')
        .order('orderPosition', { ascending: true })

    return <TeamClient initialTeam={team || []} />
}
