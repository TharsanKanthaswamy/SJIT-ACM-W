import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function check() {
    const { data: team, error } = await supabase.from('team_members').select('*').limit(1)
    console.log("Error:", error?.message)
    console.log("Team Columns:", team && team[0] ? Object.keys(team[0]) : "No data")
}
check()
