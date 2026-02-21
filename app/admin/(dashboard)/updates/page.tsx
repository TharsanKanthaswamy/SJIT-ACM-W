import { createClient } from '@/lib/supabase/server'
import { UpdatesClient } from './UpdatesClient'

export default async function UpdatesAdminPage() {
    const supabase = await createClient()

    const { data: updates } = await supabase
        .from('updates')
        .select('*')
        .order('date', { ascending: false })

    return <UpdatesClient initialUpdates={updates || []} />
}
