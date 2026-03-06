import { createClient } from '@supabase/supabase-js'

/**
 * Creates an admin Supabase client using the service role key.
 * This bypasses RLS and should ONLY be used server-side for
 * trusted operations like storage uploads from admin actions.
 */
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}
