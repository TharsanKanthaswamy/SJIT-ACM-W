import { createClient } from '@/lib/supabase/server'
import { TeamClient } from './TeamClient'

export default async function TeamAdminPage() {
    const supabase = await createClient()

    const { data: team } = await supabase
        .from('team_members')
        .select('*')
        .order('order_position', { ascending: true })

    return <TeamClient initialTeam={team || []} />
}
