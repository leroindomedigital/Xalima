import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erreur : VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquantes dans le fichier .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const email = 'admin@xalima.sn';
  const password = 'Xalima@2026';

  console.log(`Tentative de création de l'admin : ${email}...`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("already registered")) {
        console.log("✅ L'utilisateur admin@xalima.sn existe déjà.");
    } else {
        console.error("❌ Erreur lors de la création :", error.message);
    }
  } else {
    console.log("🎉 Compte admin créé avec succès !");
    console.log("👉 Email :", email);
    console.log("👉 MDP :", password);
    console.log("\n⚠️ Pensez à aller dans votre console Supabase pour désactiver la 'Confirmation d'Email' si vous voulez vous connecter tout de suite sans valider de lien.");
  }
}

createAdmin();
