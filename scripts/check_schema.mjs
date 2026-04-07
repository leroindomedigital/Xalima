import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const tables = ['formations', 'chatbot_knowledge', 'courses_university'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.error(`Error checking ${t}:`, error.message);
      continue;
    }
    if (data && data.length > 0) {
      console.log(`Columns in ${t}:`, Object.keys(data[0]));
    } else {
      console.log(`Table ${t} is empty.`);
    }
  }
}

check();
