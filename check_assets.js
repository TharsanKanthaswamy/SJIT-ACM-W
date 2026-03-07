const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://kburhhdhrzmnbfrutqnu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidXJoaGRocnptbmJmcnV0cW51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU2NTM5NiwiZXhwIjoyMDg3MTQxMzk2fQ.vBTUbEkiY3zoEjcAEPQ5-i5chfI9a-lqqHGf4RJ5Sao';
const c = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

(async () => {
    const { data: files, error } = await c.storage.from('assets').list('', { limit: 100 });
    if (error) {
        console.error('Error listing assets:', error);
        return;
    }

    console.log('Files in assets bucket:');
    files.forEach(f => console.log(`- ${f.name} (${f.metadata ? 'file' : 'folder'})`));
})();
