const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to DB");

        // Fix teamMembers schema if necessary, though it seems the table is team_members.
        // Let's just make the buckets public
        const query = `
      UPDATE storage.buckets
      SET public = true
      WHERE id IN ('event-images', 'team-images', 'update-images', 'assests');
    `;
        const res = await client.query(query);
        console.log("Updated buckets to public:", res.rowCount);

        // add policies for anon to view objects
        const policyQuery = `
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_policies WHERE policyname = 'Public can view images' AND tablename = 'objects' AND schemaname = 'storage'
          ) THEN
              CREATE POLICY "Public can view images" 
              ON storage.objects FOR SELECT TO public 
              USING (bucket_id IN ('event-images', 'team-images', 'update-images', 'assests'));
          END IF;
      END
      $$;
    `;
        await client.query(policyQuery);
        console.log("Policies updated.");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
run();
