import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // I need this for admin tasks

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing URL or Service Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@xalima.sn',
    password: 'password123',
    email_confirm: true,
    user_metadata: { role: 'admin' }
  });

  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Admin created successfully:', data.user.id);
    
    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id, full_name: 'Admin Xalima', role: 'admin' }]);
      
    if (profileError) console.error('Error creating profile:', profileError.message);
    else console.log('Profile created successfully');
  }
}

createAdmin();
