import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Download, Play, FileText, BookOpen, Search, Globe, 
  Video, Filter, ChevronRight, Clock,
  X, CheckCircle2, MonitorPlay, Stethoscope,
  Scale, Landmark, Cpu, Layout, Pause, Settings, Maximize, ZoomIn, ZoomOut, ChevronLeft, GraduationCap
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const UNIVERSITIES = ["Tous", "UCAD", "UGB", "UASZ"];

const CATEGORIES = [
  { id: "all", name: "Toutes les catégories", icon: Layout },
  { id: "sciences", name: "Sciences & Tech", icon: Cpu, color: "text-blue-400" },
  { id: "sante", name: "Santé & Bio", icon: Stethoscope, color: "text-emerald-400" },
  { id: "droit_eco", name: "Droit & Économie", icon: Scale, color: "text-amber-400" },
  { id: "humaines", name: "Sciences Humaines", icon: Globe, color: "text-indigo-400" }
];

const FILIERES_BY_CAT: Record<string, string[]> = {
  sciences: ["Informatique", "Mathématiques", "Physique-Chimie", "Biologie"],
  sante: ["Médecine", "Pharmacie"],
  droit_eco: ["Droit", "Sciences Économiques", "Gestion des Entreprises", "Finance", "Comptabilité", "Marketing", "Sciences Politiques"],
  humaines: ["Histoire", "Géographie", "Sociologie", "Philosophie", "Lettres Modernes", "Anglais", "Communication & Journalisme"]
};

const ALL_FILIERES_LIST = ["Tous", ...Object.values(FILIERES_BY_CAT).flat()];

type Course = {
  id: number;
  univ: string;
  cat: string;
  filiere: string;
  title: string;
  type: string;
  duration?: string;
  pages?: number;
  image: string;
  popular: boolean;
  level: string;
  url?: string;
};

const ALL_COURSES: Course[] = [
  // SCIENCES & TECH
  { id: 1, univ: "UCAD", cat: "sciences", filiere: "Informatique", title: "Programmation en Python", type: "Vidéo", duration: "2h 15min", image: "/images/cours/cours_1.jpg", popular: true, level: "L1" },
  { id: 2, univ: "UGB", cat: "sciences", filiere: "Informatique", title: "Bases de Données SQL", type: "PDF", pages: 65, image: "/images/cours/cours_2.jpg", popular: false, level: "L2" },
  { id: 3, univ: "UASZ", cat: "sciences", filiere: "Informatique", title: "Algorithmique & Complexité", type: "Vidéo + PDF", duration: "3h 05min", pages: 40, image: "/images/cours/cours_3.jpg", popular: true, level: "L1" },
  
  { id: 4, univ: "UCAD", cat: "sciences", filiere: "Mathématiques", title: "Algèbre Linéaire", type: "PDF", pages: 80, image: "/images/cours/cours_4.jpg", popular: false, level: "L1" },
  { id: 5, univ: "UGB", cat: "sciences", filiere: "Mathématiques", title: "Analyse Réelle", type: "Vidéo", duration: "2h 45min", image: "/images/cours/cours_5.jpg", popular: true, level: "L2" },

  { id: 6, univ: "UCAD", cat: "sciences", filiere: "Physique-Chimie", title: "Thermodynamique", type: "Vidéo", duration: "1h 55min", image: "/images/cours/cours_6.jpg", popular: false, level: "L2" },
  { id: 7, univ: "UCAD", cat: "sciences", filiere: "Biologie", title: "Génétique Moléculaire", type: "PDF", pages: 55, image: "/images/cours/cours_7.jpg", popular: true, level: "L3" },

  // SANTÉ
  { id: 8, univ: "UCAD", cat: "sante", filiere: "Médecine", title: "Anatomie Humaine - Thorax", type: "Vidéo", duration: "3h 20min", image: "/images/cours/cours_8.jpg", popular: true, level: "L1" },
  { id: 9, univ: "UCAD", cat: "sante", filiere: "Médecine", title: "Physiologie Cardiaque", type: "PDF", pages: 110, image: "/images/cours/cours_9.jpg", popular: false, level: "L2" },
  { id: 10, univ: "UASZ", cat: "sante", filiere: "Pharmacie", title: "Pharmacologie Générale", type: "PDF + Vidéo", duration: "2h 10min", pages: 75, image: "/images/cours/cours_10.jpg", popular: true, level: "L3" },

  // DROIT & ÉCO
  { id: 11, univ: "UCAD", cat: "droit_eco", filiere: "Droit", title: "Introduction au Droit OHADA", type: "Vidéo", duration: "1h 45min", image: "/images/cours/cours_1.jpg", popular: true, level: "L1" },
  { id: 12, univ: "UGB", cat: "droit_eco", filiere: "Droit", title: "Droits de l'Homme", type: "PDF", pages: 45, image: "/images/cours/cours_2.jpg", popular: false, level: "L3" },
  
  { id: 13, univ: "UCAD", cat: "droit_eco", filiere: "Sciences Économiques", title: "Microéconomie I", type: "Vidéo", duration: "2h 05min", image: "/images/cours/cours_3.jpg", popular: true, level: "L1" },
  { id: 14, univ: "UGB", cat: "droit_eco", filiere: "Finance", title: "Analyse Financière", type: "PDF", pages: 90, image: "/images/cours/cours_4.jpg", popular: true, level: "Master" },
  { id: 15, univ: "UCAD", cat: "droit_eco", filiere: "Marketing", title: "Stratégie Digitale", type: "Vidéo", duration: "1h 30min", image: "/images/cours/cours_5.jpg", popular: false, level: "L3" },
  { id: 16, univ: "UASZ", cat: "droit_eco", filiere: "Comptabilité", title: "Comptabilité Analytique", type: "PDF", pages: 60, image: "/images/cours/cours_6.jpg", popular: false, level: "L2" },
  { id: 17, univ: "UCAD", cat: "droit_eco", filiere: "Sciences Politiques", title: "Géopolitique Africaine", type: "Vidéo", duration: "2h 40min", image: "/images/cours/cours_7.jpg", popular: true, level: "L3" },

  // SCIENCES HUMAINES
  { id: 18, univ: "UGB", cat: "humaines", filiere: "Histoire", title: "Histoire Mandingue", type: "Vidéo", duration: "2h 15min", image: "/images/cours/cours_8.jpg", popular: true, level: "L1" },
  { id: 19, univ: "UCAD", cat: "humaines", filiere: "Géographie", title: "Géographie du Littoral Sénégalais", type: "PDF", pages: 52, image: "/images/cours/cours_9.jpg", popular: false, level: "L2" },
  { id: 20, univ: "UASZ", cat: "humaines", filiere: "Sociologie", title: "Sociologie des Médias au Sénégal", type: "Vidéo", duration: "1h 55min", image: "/images/cours/cours_10.jpg", popular: false, level: "L3" },
  { id: 21, univ: "UGB", cat: "humaines", filiere: "Philosophie", title: "Épistémologie des Sciences", type: "PDF", pages: 70, image: "/images/cours/cours_1.jpg", popular: true, level: "L2" },
  { id: 22, univ: "UCAD", cat: "humaines", filiere: "Lettres Modernes", title: "La Francophonie en Afrique", type: "Vidéo", duration: "2h 20min", image: "/images/cours/cours_2.jpg", popular: true, level: "L3" },
  { id: 23, univ: "UGB", cat: "humaines", filiere: "Anglais", title: "Shakespeare & Post-colonialism", type: "PDF", pages: 48, image: "/images/cours/cours_3.jpg", popular: false, level: "L3" },
  { id: 24, univ: "UASZ", cat: "humaines", filiere: "Communication & Journalisme", title: "Éthique Journalistique", type: "Vidéo", duration: "1h 40min", image: "/images/cours/cours_4.jpg", popular: true, level: "L1" },
];

const fillerFields = ["Pharmacologie", "Gestion des RH", "Audit", "Commerce International", "Droit Civil", "Psychologie"];
fillerFields.forEach((field, i) => {
  ALL_COURSES.push({
    id: 100 + i,
    univ: i % 2 === 0 ? "UCAD" : "UGB",
    cat: i < 3 ? "droit_eco" : "humaines",
    filiere: field,
    title: `Introduction à ${field}`,
    type: "PDF + Vidéo",
    duration: "2h 00min",
    pages: 40,
    image: `/images/cours/cours_${(i % 10) + 1}.jpg`,
    popular: false,
    level: "L1"
  });
});

export function CoursUniversitaires() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedFiliere, setSelectedFiliere] = useState('Tous');
  const [selectedUniv, setSelectedUniv] = useState('Tous');
  
  // Modals & Tracking state
  const [activeVideoCourse, setActiveVideoCourse] = useState<Course | null>(null);
  const [activePdfCourse, setActivePdfCourse] = useState<Course | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<number, number>>({});
  const [dynamicCourses, setDynamicCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load courses from Supabase
  useEffect(() => {
    async function fetchCourses() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('courses_university')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching courses:', error.message);
      } else if (data) {
        const mapped: Course[] = data.map((c: any, i: number) => ({
          id: c.id,
          univ: c.univ || 'UCAD',
          cat: c.cat || 'all',
          filiere: c.faculty,
          title: c.title,
          type: c.type === 'video' ? 'Vidéo' : 'PDF',
          duration: c.duration,
          pages: c.pages,
          image: `/images/cours/cours_${(i % 10) + 1}.jpg`,
          popular: false,
          level: 'L1',
          url: c.url
        }));
        setDynamicCourses(mapped);
      }
      setIsLoading(false);
    }

    fetchCourses();

    const savedProgress = localStorage.getItem('xalima_course_progress');
    if (savedProgress) {
      try {
        setCourseProgress(JSON.parse(savedProgress));
      } catch(e) {}
    }
  }, []);

  // Save progress when it changes
  useEffect(() => {
    localStorage.setItem('xalima_course_progress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  const updateProgress = (courseId: number, progress: number) => {
    setCourseProgress(prev => ({ ...prev, [courseId]: progress }));
  };

  const filteredCourses = useMemo(() => {
    const list = dynamicCourses.length > 0 ? dynamicCourses : ALL_COURSES;
    return list.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.filiere.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCat === 'all' || course.cat === selectedCat;
      const matchesFiliere = selectedFiliere === 'Tous' || course.filiere === selectedFiliere;
      const matchesUniv = selectedUniv === 'Tous' || course.univ === selectedUniv;
      
      return matchesSearch && matchesCat && matchesFiliere && matchesUniv;
    });
  }, [searchQuery, selectedCat, selectedFiliere, selectedUniv, dynamicCourses]);

  const activeFilieres = useMemo(() => {
    if (selectedCat === 'all') return ALL_FILIERES_LIST;
    return ["Tous", ...FILIERES_BY_CAT[selectedCat]];
  }, [selectedCat]);


  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20 overflow-x-hidden">
      <Helmet>
        <title>Cours Universitaires Gratuits | UCAD, UGB, UASZ | XALIMA</title>
        <meta name="description" content="Accédez gratuitement à des centaines de supports de cours (PDF, Vidéos) pour les universités publiques du Sénégal. Tout pour réussir votre licence et master." />
        <meta name="keywords" content="cours ucad gratuit, supports de cours sénégal, révision examen sénégal, xalima cours univ" />
      </Helmet>
      {/* Visual Background Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-start text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Plus de 1000 supports pédagogiques certifiés</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-[1.05] tracking-tight">
              L'Université <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600">Sénégalaise</span>.
            </h1>
            <p className="text-sm sm:text-lg text-gray-400 border-l-2 border-indigo-500/30 pl-4 sm:pl-6 leading-relaxed mb-8 font-normal italic">
               Explorez un catalogue riche couvrant toutes les <span className="text-white font-bold">universités publiques</span> du Sénégal.
            </p>
            
            <div className="relative w-full max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <Input 
                 className="relative w-full h-14 bg-[#0c1222]/80 backdrop-blur-xl border-white/10 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-indigo-500/50 transition-all outline-none"
                 placeholder="Rechercher une filière..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(79,70,229,0.15)] group">
              <ImageWithFallback
                src="/images/illustrations/cours_hero.jpg"
                alt="Étudiant universitaire Xalima"
                className="w-full h-[500px] object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent opacity-70" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black uppercase tracking-wider text-sm">UCAD · UGB · UASZ</div>
                    <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Cours 100% gratuits</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Catalog Highlights */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10">
           {[
             { label: "25+ Filières", icon: Layout },
             { label: "Vidéos 4K", icon: Video },
             { label: "Supports PDF", icon: FileText },
             { label: "UCAD / UGB / UASZ", icon: Landmark }
           ].map((badge, i) => (
             <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <badge.icon className="w-4 h-4 text-indigo-500" />
                <span className="text-[9px] font-black uppercase tracking-widest">{badge.label}</span>
             </div>
           ))}
        </div>


        {/* Navigation Categories */}
        <div className="mb-12">
           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCat(cat.id); setSelectedFiliere('Tous'); }}
                  className={`flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 rounded-2xl transition-all duration-300 font-black text-[10px] sm:text-xs uppercase tracking-widest border ${
                    selectedCat === cat.id 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-105' 
                      : 'bg-[#0c1222] border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <cat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${selectedCat === cat.id ? 'text-white' : cat.color}`} />
                  {cat.name}
                </button>
              ))}
           </div>
        </div>

        {/* Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 p-4 sm:p-8 bg-white/5 rounded-2xl border border-white/10">
           <div className="space-y-2">
              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest pl-2">Affiner par Filière</label>
              <select 
                value={selectedFiliere}
                onChange={(e) => setSelectedFiliere(e.target.value)}
                className="w-full h-10 bg-[#020617] border border-white/10 rounded-xl px-4 text-[10px] font-bold text-white focus:border-indigo-500 outline-none"
              >
                 {activeFilieres.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest pl-2">Université d'Origine</label>
              <select 
                value={selectedUniv}
                onChange={(e) => setSelectedUniv(e.target.value)}
                className="w-full h-10 bg-[#020617] border border-white/10 rounded-xl px-4 text-[10px] font-bold text-white focus:border-indigo-500 outline-none"
              >
                 {UNIVERSITIES.map(u => <option key={u} value={u}>{u === 'Tous' ? 'Toutes les Universités' : u}</option>)}
              </select>
           </div>
           <div className="flex items-end">
              <div className="w-full h-10 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center px-4">
                 <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                    {filteredCourses.length} Cours Disponibles
                 </span>
              </div>
           </div>
        </div>

        {/* Dynamic Catalog Rendering */}
        <AnimatePresence mode="wait">
           <motion.div 
             key={`${selectedCat}-${selectedFiliere}-${searchQuery}`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="space-y-24"
           >
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {filteredCourses.map(course => (
                     <CourseCard 
                       key={course.id} 
                       course={course} 
                       progress={courseProgress[course.id] || 0}
                       onPlayVideo={() => setActiveVideoCourse(course)}
                       onReadPdf={() => setActivePdfCourse(course)}
                     />
                   ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                   <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
                      <Search className="w-10 h-10 text-gray-500" />
                   </div>
                   <h3 className="text-2xl font-black uppercase mb-4">Matière non trouvée</h3>
                   <p className="text-gray-500 max-w-sm mx-auto">Nous enrichissons le catalogue chaque jour. N'hésitez pas à nous demander cette matière !</p>
                </div>
              )}
           </motion.div>
        </AnimatePresence>

      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoCourse && (
          <VideoPlayerModal 
            course={activeVideoCourse} 
            initialProgress={courseProgress[activeVideoCourse.id] || 0}
            onClose={(finalProgress) => {
              updateProgress(activeVideoCourse.id, finalProgress);
              setActiveVideoCourse(null);
            }} 
          />
        )}
      </AnimatePresence>

      {/* PDF Modal Reader */}
      <AnimatePresence>
        {activePdfCourse && (
          <PdfReaderModal 
            course={activePdfCourse}
            initialProgress={courseProgress[activePdfCourse.id] || 0}
            onClose={(finalProgress) => {
              updateProgress(activePdfCourse.id, finalProgress);
              setActivePdfCourse(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// Course Card Component
// -------------------------------------------------------------
function CourseCard({ course, progress, onPlayVideo, onReadPdf }: { course: Course, progress: number, onPlayVideo: () => void, onReadPdf: () => void }) {
  const hasVideo = course.type.includes('Vidéo');
  const hasPdf = course.type.includes('PDF');

  return (
    <Card className="bg-[#0c1222]/50 backdrop-blur-sm border border-white/10 hover:border-indigo-500/30 transition-all duration-500 flex flex-col group overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] h-full shadow-2xl shadow-black/50">
      <div className="relative h-40 sm:h-56 w-full overflow-hidden">
        <ImageWithFallback src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
        
        <div className="absolute top-5 left-5">
          <Badge className="bg-indigo-600/80 backdrop-blur-md text-white border border-white/10 px-4 py-1.5 rounded-xl font-black text-[9px] uppercase tracking-widest">
            {course.univ}
          </Badge>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3">
           <div className="bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-lg border border-white/10 text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3 text-indigo-400" /> {course.duration || `${course.pages} Pages`}
           </div>
           
           {/* Progress Bar Display */}
           {progress > 0 && (
             <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden backdrop-blur-md">
                <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: `${progress}%` }} 
                   className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
             </div>
           )}
        </div>

        <button 
           onClick={hasVideo ? onPlayVideo : onReadPdf}
           className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
           <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
             {hasVideo ? <Play className="w-8 h-8 text-white fill-white" /> : <FileText className="w-8 h-8 text-white" />}
             {progress > 0 && <span className="absolute -bottom-6 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">Reprendre {progress}%</span>}
           </div>
        </button>
      </div>

      <CardHeader className="p-5 sm:p-8 pb-3 sm:pb-4">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
           {hasVideo && <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
           {hasPdf && <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />}
           <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest">{course.filiere}</span>
           <div className="h-1 w-1 rounded-full bg-white/20" />
           <span className="text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-widest">{course.level}</span>
        </div>
        <CardTitle className="text-white text-base sm:text-lg font-black leading-tight uppercase group-hover:text-indigo-400 transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 flex-grow">
         <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold mb-6">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Contenus disponibles : {hasVideo && "🎥 Vidéos"} {hasVideo && hasPdf && ", "} {hasPdf && "📄 PDF"}
         </div>
      </CardContent>

      <CardFooter className="p-5 sm:p-8 pt-0 mt-auto flex flex-col gap-3">
        {hasVideo ? (
          <Button onClick={onPlayVideo} className="w-full h-11 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group/btn">
            Regarder la vidéo <Play className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
          </Button>
        ) : (
          <Button onClick={onReadPdf} className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95 group/btn">
            Consulter le PDF <FileText className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Button>
        )}
        
        {hasVideo && hasPdf && (
           <Button variant="outline" onClick={onReadPdf} className="w-full h-10 sm:h-11 bg-white/5 border-white/10 rounded-xl font-black text-[9px] uppercase hover:bg-white/10">
              <Download className="w-3.5 h-3.5 mr-2" /> Voir le PDF
           </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// -------------------------------------------------------------
// Interactive Video Player Modal
// -------------------------------------------------------------
function VideoPlayerModal({ course, initialProgress, onClose }: { course: Course, initialProgress: number, onClose: (progress: number) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [showControls, setShowControls] = useState(true);

  // Simulate playback 1% per 0.5s if playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 100 : p + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => onClose(progress)} />
        
        <motion.div 
           initial={{ scale: 0.95, opacity: 0, y: 20 }} 
           animate={{ scale: 1, opacity: 1, y: 0 }} 
           exit={{ scale: 0.95, opacity: 0, y: 20 }} 
           className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl group"
           onMouseEnter={() => setShowControls(true)}
           onMouseLeave={() => setShowControls(false)}
        >
           {/* Video Content - Real Player */}
           <div className="w-full h-full flex items-center justify-center relative bg-black">
              {course.url ? (
                 course.url.includes('youtube.com') || course.url.includes('youtu.be') || course.url.includes('vimeo.com') ? (
                    <iframe 
                       src={course.url.replace('watch?v=', 'embed/')} 
                       className="w-full h-full border-none"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                    />
                 ) : (
                    <video 
                       src={course.url} 
                       controls 
                       className="w-full h-full"
                       poster={course.image}
                    />
                 )
              ) : (
                 <div className="text-center p-12">
                    <MonitorPlay className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <h4 className="text-white font-bold mb-2">Vidéo non disponible</h4>
                    <p className="text-gray-500 text-sm">Le lien de cette vidéo n'a pas encore été configuré.</p>
                 </div>
              )}
           </div>

           {/* Controls Bar */}
           <AnimatePresence>
             {showControls && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-6"
                >
                   {/* Progress Bar */}
                   <div 
                      className="w-full h-2 bg-white/20 rounded-full mb-6 cursor-pointer relative overflow-hidden group/bar"
                      onClick={(e) => {
                         const rect = e.currentTarget.getBoundingClientRect();
                         const x = e.clientX - rect.left;
                         setProgress(Math.round((x / rect.width) * 100));
                      }}
                   >
                      <div className="absolute top-0 left-0 bottom-0 bg-indigo-500" style={{ width: `${progress}%` }} />
                      <div className="absolute top-0 bottom-0 bg-white w-2 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ left: `calc(${progress}% - 4px)` }} />
                   </div>

                   {/* Controls */}
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                         <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400 transition-colors">
                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
                         </button>
                         <div className="text-xs font-bold tracking-widest text-gray-300">
                             {progress}% <span className="text-gray-600 mx-2">|</span> {course.duration}
                         </div>
                      </div>
                      
                      <div className="text-center absolute left-1/2 -translate-x-1/2 hidden md:block">
                         <h4 className="text-sm font-black uppercase tracking-widest">{course.title}</h4>
                         <p className="text-[9px] text-gray-400 uppercase tracking-widest">{course.univ} - {course.filiere}</p>
                      </div>

                      <div className="flex items-center gap-5">
                         <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                         <Maximize className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                   </div>
                </motion.div>
             )}
           </AnimatePresence>

           {/* Close Button */}
           <button onClick={() => onClose(progress)} className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
              <X className="w-5 h-5" />
           </button>
        </motion.div>
     </div>
  );
}

// -------------------------------------------------------------
// Interactive PDF Reader Modal (Enhanced for Real Content)
// -------------------------------------------------------------
function PdfReaderModal({ course, onClose }: { course: Course, initialProgress: number, onClose: (progress: number) => void }) {
  const [useFallback, setUseFallback] = useState(false);
  
  return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => onClose(0)} />
        
        <motion.div 
           initial={{ scale: 0.95, opacity: 0, y: 20 }} 
           animate={{ scale: 1, opacity: 1, y: 0 }} 
           exit={{ scale: 0.95, opacity: 0, y: 20 }} 
           className="relative w-full max-w-6xl h-full flex flex-col bg-[#0f172a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
        >
           {/* Top Toolbar */}
           <div className="h-20 flex-none bg-[#020617] border-b border-white/10 flex items-center justify-between px-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                    <FileText className="w-6 h-6 text-blue-400" />
                 </div>
                 <div className="hidden sm:block">
                    <h4 className="text-sm font-black uppercase tracking-tight text-white truncate max-w-[200px] sm:max-w-md">{course.title}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{course.univ} · {course.filiere}</p>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end mr-4">
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest animate-pulse">Lecture Sécurisée</p>
                    <button 
                       onClick={() => setUseFallback(!useFallback)}
                       className="text-[10px] text-gray-500 hover:text-white underline font-bold"
                    >
                       Problème d'affichage ? Cliquer ici
                    </button>
                 </div>
                 
                 <Button 
                   className="h-11 bg-white hover:bg-gray-100 text-[#020617] rounded-xl text-[10px] font-black uppercase px-6 hidden sm:flex shadow-lg"
                   onClick={() => course.url && window.open(course.url, '_blank')}
                 >
                    <Maximize className="w-4 h-4 mr-2" /> Ouvrir en Plein Écran
                 </Button>
                 
                 <button onClick={() => onClose(0)} className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors ml-2 group">
                    <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                 </button>
              </div>
           </div>

           {/* PDF Document Area - Double Layer Viewer */} 
           <div className="flex-1 bg-[#050816] relative overflow-hidden group">
              {course.url && course.url !== '#' ? (
                 <div className="w-full h-full relative">
                    {/* Primary Native Viewer or Google Fallback */}
                    <iframe 
                       src={useFallback 
                          ? `https://docs.google.com/viewer?url=${encodeURIComponent(course.url)}&embedded=true` 
                          : `${course.url}#toolbar=1&navpanes=1`}
                       className="w-full h-full border-none bg-transparent"
                       title={`Lecture : ${course.title}`}
                    />
                    
                    {/* Direct link as last resort if both fail visually for user */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-indigo-600 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-2xl flex items-center gap-3 border border-indigo-400/30"
                       >
                          <Download className="w-4 h-4" /> Si rien ne s'affiche, télécharger le cours
                       </a>
                    </div>
                 </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[#050816]">
                   <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/10 ring-4 ring-indigo-500/10">
                      <Clock className="w-10 h-10 text-indigo-500 animate-pulse" />
                   </div>
                   <h4 className="text-white font-black uppercase text-xl mb-3">Cours en préparation</h4>
                   <p className="text-gray-500 text-sm max-w-sm uppercase tracking-widest font-bold">
                      Notre équipe pédagogique finalise le support pour ce cours. <br />
                      <span className="text-indigo-400/50">Revenez d'ici quelques instants !</span>
                   </p>
                </div>
              )}
           </div>
        </motion.div>
     </div>
  );
}
