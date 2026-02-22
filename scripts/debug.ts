import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) { process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
    const { data: buckets } = await supabase.storage.listBuckets()
    console.log("Available Buckets:", buckets?.map(b => ({ name: b.name, public: b.public })))

    const { data: files } = await supabase.storage.from('assests').list()
    console.log("Files in 'assests':", files?.map(f => f.name))

    const { data: files2 } = await supabase.storage.from('assets').list()
    console.log("Files in 'assets':", files2?.map(f => f.name))

    const { data: events, error: e1 } = await supabase.from('events').select('*')
    console.log("Events count:", events?.length, "Error:", e1)

    const { data: team, error: e2 } = await supabase.from('teamMembers').select('*')
    console.log("Team count:", team?.length, "Error:", e2)
}

check()
