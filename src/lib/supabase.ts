import { createClient } from '@supabase/supabase-js';

// Nettoyage de l'URL pour éviter les erreurs Vercel (espaces ou guillemets accidentels)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/['"]/g, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/['"]/g, '');

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.warn('⚠️ Supabase URL or Anon Key is missing or invalid. Check Vercel Environment Variables.');
}

// Initialisation sécurisée
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
