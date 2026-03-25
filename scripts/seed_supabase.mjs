import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const university_courses = [
  { univ: "UCAD", cat: "sciences", filiere: "Informatique", title: "Programmation en Python", type: "Vidéo", duration: "2h 15min", url: "#" },
  { univ: "UGB", cat: "sciences", filiere: "Informatique", title: "Bases de Données SQL", type: "PDF", pages: 65, url: "#" },
  { univ: "UASZ", cat: "sciences", filiere: "Informatique", title: "Algorithmique & Complexité", type: "Vidéo", duration: "3h 05min", pages: 40, url: "#" },
  { univ: "UCAD", cat: "sciences", filiere: "Mathématiques", title: "Algèbre Linéaire", type: "PDF", pages: 80, url: "#" },
  { univ: "UGB", cat: "sciences", filiere: "Mathématiques", title: "Analyse Réelle", type: "Vidéo", duration: "2h 45min", url: "#" },
  { univ: "UCAD", cat: "sciences", filiere: "Physique-Chimie", title: "Thermodynamique", type: "Vidéo", duration: "1h 55min", url: "#" },
  { univ: "UCAD", cat: "sciences", filiere: "Biologie", title: "Génétique Moléculaire", type: "PDF", pages: 55, url: "#" },
  { univ: "UCAD", cat: "sante", filiere: "Médecine", title: "Anatomie Humaine - Thorax", type: "Vidéo", duration: "3h 20min", url: "#" },
  { univ: "UCAD", cat: "sante", filiere: "Médecine", title: "Physiologie Cardiaque", type: "PDF", pages: 110, url: "#" },
  { univ: "UASZ", cat: "sante", filiere: "Pharmacie", title: "Pharmacologie Générale", type: "PDF", pages: 75, url: "#" },
  { univ: "UCAD", cat: "droit_eco", filiere: "Droit", title: "Introduction au Droit OHADA", type: "Vidéo", duration: "1h 45min", url: "#" },
  { univ: "UGB", cat: "droit_eco", filiere: "Droit", title: "Droits de l'Homme", type: "PDF", pages: 45, url: "#" },
  { univ: "UCAD", cat: "droit_eco", filiere: "Sciences Économiques", title: "Microéconomie I", type: "Vidéo", duration: "2h 05min", url: "#" },
  { univ: "UGB", cat: "droit_eco", filiere: "Finance", title: "Analyse Financière", type: "PDF", pages: 90, url: "#" },
  { univ: "UCAD", cat: "droit_eco", filiere: "Marketing", title: "Stratégie Digitale", type: "Vidéo", duration: "1h 30min", url: "#" },
  { univ: "UASZ", cat: "droit_eco", filiere: "Comptabilité", title: "Comptabilité Analytique", type: "PDF", pages: 60, url: "#" },
  { univ: "UCAD", cat: "droit_eco", filiere: "Sciences Politiques", title: "Géopolitique Africaine", type: "Vidéo", duration: "2h 40min", url: "#" },
  { univ: "UGB", cat: "humaines", filiere: "Histoire", title: "Histoire Mandingue", type: "Vidéo", duration: "2h 15min", url: "#" },
  { univ: "UCAD", cat: "humaines", filiere: "Géographie", title: "Géographie du Littoral Sénégalais", type: "PDF", pages: 52, url: "#" },
  { univ: "UASZ", cat: "humaines", filiere: "Sociologie", title: "Sociologie des Médias au Sénégal", type: "Vidéo", duration: "1h 55min", url: "#" },
  { univ: "UGB", cat: "humaines", filiere: "Philosophie", title: "Épistémologie des Sciences", type: "PDF", pages: 70, url: "#" },
  { univ: "UCAD", cat: "humaines", filiere: "Lettres Modernes", title: "La Francophonie en Afrique", type: "Vidéo", duration: "2h 20min", url: "#" },
  { univ: "UGB", cat: "humaines", filiere: "Anglais", title: "Shakespeare & Post-colonialism", type: "PDF", pages: 48, url: "#" },
  { univ: "UASZ", cat: "humaines", filiere: "Communication & Journalisme", title: "Éthique Journalistique", type: "Vidéo", duration: "1h 40min", url: "#" }
];

const formations_data = [
  { title: 'Marketing Digital Avancé', description: 'Maîtrisez les stratégies de marketing digital.', price: '45 000 FCFA', duration: '8 semaines', level: 'Intermédiaire', image_url: '/images/formations/formation_1.jpg' },
  { title: 'Développement Web Full Stack', description: 'Apprenez React, Node.js, et plus.', price: '65 000 FCFA', duration: '12 semaines', level: 'Avancé', image_url: '/images/formations/formation_2.jpg' },
  { title: 'Entrepreneuriat & Business', description: 'De l\'idée au lancement.', price: '40 000 FCFA', duration: '6 semaines', level: 'Débutant', image_url: '/images/formations/formation_3.jpg' },
  { title: 'Bureautique Professionnelle', description: 'Excel, Word, PowerPoint.', price: '25 000 FCFA', duration: '4 semaines', level: 'Débutant', image_url: '/images/formations/formation_4.jpg' },
  { title: 'Design Graphique & Branding', description: 'Créez des visuels percutants.', price: '50 000 FCFA', duration: '8 semaines', level: 'Intermédiaire', image_url: '/images/formations/formation_5.jpg' }
];

async function seed() {
  console.log('Seeding courses_university...');
  for (const course of university_courses) {
    const { error } = await supabase.from('courses_university').insert([
      { 
        title: course.title, 
        faculty: course.filiere, 
        type: course.type.toLowerCase() === 'vidéo' ? 'video' : 'pdf',
        url: course.url,
        duration: course.duration,
        pages: course.pages,
        status: 'Publié'
      }
    ]);
    if (error) console.error('Error seeding course:', course.title, error.message);
  }

  console.log('Seeding formations...');
  for (const form of formations_data) {
    const { error } = await supabase.from('formations').insert([
      {
        title: form.title,
        price: form.price,
        description: form.description,
        image_url: form.image_url,
        level: form.level,
        duration: form.duration,
        status: 'Actif'
      }
    ]);
    if (error) console.error('Error seeding formation:', form.title, error.message);
  }

  console.log('Seeding completed!');
}

seed();
