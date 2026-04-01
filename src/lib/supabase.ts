import { createClient } from '@supabase/supabase-js';

// Nettoyage rigoureux des variables d'environnement
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabaseUrl = rawUrl.trim().replace(/['"]/g, '');
const supabaseAnonKey = rawKey.trim().replace(/['"]/g, '');

// Diagnostic Console pour le débogage en production
if (typeof window !== 'undefined') {
  if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
    console.error("❌ ERREUR CRITIQUE : L'URL Supabase est manquante ou est un placeholder !");
    console.log("Vérifiez vos variables d'environnement sur Vercel (VITE_SUPABASE_URL).");
  } else {
    console.log("✅ Connexion Supabase initialisée vers :", supabaseUrl.substring(0, 15) + "...");
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-debug.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
