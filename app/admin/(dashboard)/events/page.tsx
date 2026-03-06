import { createClient } from '@/lib/supabase/server'
import { EventsClient } from './EventsClient'

export default async function EventsAdminPage() {
    const supabase = await createClient()

    const { data: events } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false })

    return <EventsClient initialEvents={events || []} />
}
