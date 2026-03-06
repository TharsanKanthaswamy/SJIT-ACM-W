require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log("Checking events...");
    const { data: events, error: eventsErr } = await supabase.from('events').select('*').limit(5);
    console.log("Events data:", events);
    console.log("Events error:", eventsErr);

    console.log("\nChecking team_members...");
    const { data: team, error: teamErr } = await supabase.from('team_members').select('*').limit(5);
    console.log("Team data:", team);
    console.log("Team error:", teamErr);
}

checkData();
