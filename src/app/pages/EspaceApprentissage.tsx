import { motion } from 'framer-motion';
import { 
  BookOpen, Trophy, Clock, Star, Play, 
  ArrowRight, Search, Bell, Settings, 
  LayoutDashboard, BookMarked, Award, GraduationCap, 
  ChevronRight, Calendar, Users, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';

export function EspaceApprentissage() {
  const activeCourses = [
    {
      id: 1,
      title: "Développement Web Full Stack",
      instructor: "Dr. Moussa Diop",
      progress: 65,
      lastAccessed: "Il y a 2 heures",
      image: "/images/illustrations/coding_premium.png",
      category: "Tech"
    },
    {
      id: 2,
      title: "Marketing Digital Stratégique",
      instructor: "Awa Ndiaye",
      progress: 32,
      lastAccessed: "Hier",
      image: "/images/illustrations/business_premium.png",
      category: "Marketing"
    }
  ];

  const recommendations = [
    {
      id: 3,
      title: "IA & Machine Learning",
      level: "Avancé",
      rating: 4.9,
      students: 120,
      image: "/images/illustrations/coding_premium.png"
    },
    {
      id: 4,
      title: "Agrobusiness Moderne",
      level: "Intermédiaire",
      rating: 4.8,
      students: 85,
      image: "/images/illustrations/agriculture_premium.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation / Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black tracking-tight mb-2">
              Bonjour, <span className="text-indigo-500">Amadou</span> ! 👋
            </h1>
            <p className="text-gray-400">Ravi de vous revoir. Continuons votre apprentissage.</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="relative group flex-grow md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Chercher un cours..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <Button variant="outline" className="w-12 h-12 rounded-2xl border-white/10 p-0 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]"></span>
            </Button>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-500/50 shadow-lg shadow-indigo-600/20">
              A
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { icon: LayoutDashboard, label: "Tableau de Bord", active: true },
              { icon: BookOpen, label: "Mes Formations", active: false },
              { icon: BookMarked, label: "Contenus Favoris", active: false },
              { icon: Award, label: "Certifications", active: false },
              { icon: Calendar, label: "Planning", active: false },
              { icon: Users, label: "Communauté", active: false },
              { icon: Settings, label: "Paramètres", active: false },
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${
                  item.active 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.active && <ChevronRight className="ml-auto w-4 h-4" />}
              </button>
            ))}
            
            {/* Premium Upgrade Card */}
            <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden group">
              <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <p className="text-white font-black text-lg mb-2">Passer en Premium</p>
                <p className="text-white/80 text-xs mb-4">Accès illimité à tous les masters et sessions IA.</p>
                <Button className="w-full bg-white text-indigo-600 font-black rounded-xl text-xs hover:bg-gray-100">
                  Découvrir
                </Button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, label: "Cours en cours", val: "2", color: "text-indigo-400" },
                { icon: Trophy, label: "Certificats", val: "12", color: "text-yellow-400" },
                { icon: Clock, label: "Heures apprises", val: "154h", color: "text-blue-400" },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-indigo-500/30 transition-all group"
                >
                  <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-black mb-1">{stat.val}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Active Courses Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black tracking-tight">Voulez-vous <span className="text-indigo-500">continuer</span> ?</h2>
                <button className="text-sm font-bold text-indigo-500 hover:underline">Voir tout</button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {activeCourses.map((course) => (
                  <motion.div 
                    key={course.id}
                    whileHover={{ y: -5 }}
                    className="group relative bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] overflow-hidden"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <ImageWithFallback src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-indigo-600/50">
                            <Play className="w-6 h-6 fill-current" />
                         </div>
                      </div>
                    </div>
                    <div className="px-8 pb-8 -mt-10 relative z-10">
                      <Badge className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 mb-4 rounded-full">{course.category}</Badge>
                      <h3 className="text-xl font-black mb-1 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-6">Par {course.instructor}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                          <span>Progression</span>
                          <span className="text-indigo-400">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-indigo-500 rounded-full"
                          />
                        </div>
                        <p className="text-[10px] text-gray-600 pt-2 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> Dernière activité : {course.lastAccessed}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommendations Section */}
            <section className="bg-indigo-600/5 border border-indigo-500/10 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] -z-10"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-2xl font-black mb-2">Suggéré pour <span className="text-indigo-500">votre profil</span></h2>
                  <p className="text-gray-400 text-sm">Basé sur vos intérêts en Technologie et Design.</p>
                </div>
                <Button className="bg-indigo-600 rounded-2xl px-6 h-12">Personnaliser</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {recommendations.map((course) => (
                  <div key={course.id} className="flex gap-6 items-center p-4 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold">{course.rating}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest px-2 border-l border-white/10 ml-2">
                          {course.students} Étudiants
                        </span>
                      </div>
                      <h4 className="font-black text-lg mb-3 leading-tight">{course.title}</h4>
                      <div className="flex items-center justify-between">
                         <Badge className="bg-white/5 text-gray-400 font-bold border-none">{course.level}</Badge>
                         <button className="p-2 bg-white/5 rounded-xl hover:bg-indigo-600 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
