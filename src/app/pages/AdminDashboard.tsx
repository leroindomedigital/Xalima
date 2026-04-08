import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Users, Settings, 
  Plus, Search, Bell, Filter, MoreVertical,
  Download, FileText, CheckCircle2, X,
  TrendingUp, Wallet, GraduationCap, AlertCircle,
  ChevronRight, ArrowRight, ShieldCheck, PieChart,
  MessageSquare, Star, Clock, Video, Film, Bot, Sparkles, Brain,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingPDF, setIsAddingPDF] = useState(false);
  const [isAddingUnivCourse, setIsAddingUnivCourse] = useState(false);
  const [isAddingKB, setIsAddingKB] = useState(false);
  const [isAddingFormation, setIsAddingFormation] = useState(false);
  
  const [dbRegistrations, setDbRegistrations] = useState<any[]>([]);
  const [dbUnivCourses, setDbUnivCourses] = useState<any[]>([]);
  const [dbFormations, setDbFormations] = useState<any[]>([]);
  const [chatbotKB, setChatbotKB] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newKB, setNewKB] = useState({ category: 'Général', keywords: '', content: '' });

  const [newUnivCourse, setNewUnivCourse] = useState({
    title: '', faculty: 'Mathématiques', type: 'video', url: '', duration: '', pages: '', univ: 'UCAD', cat: 'sciences'
  });

  const [newFormation, setNewFormation] = useState({
    title: '', description: '', price: '', level: 'Formation', icon_name: 'BookOpen', syllabus: '', pdf_url: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    
    // Fetch registrations
    const { data: regs } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    if (regs) setDbRegistrations(regs);

    // Fetch university courses
    const { data: univ } = await supabase.from('courses_university').select('*').order('id', { ascending: false });
    if (univ) setDbUnivCourses(univ);

    // Fetch formations
    const { data: forms } = await supabase.from('formations').select('*').order('id', { ascending: false });
    if (forms) setDbFormations(forms);

    // Fetch chatbot knowledge
    const { data: kb } = await supabase.from('chatbot_knowledge').select('*').order('created_at', { ascending: false });
    if (kb) setChatbotKB(kb || []);

    setIsLoading(false);
  }

  const handleSaveKB = async () => {
    const { error } = await supabase.from('chatbot_knowledge').insert([
      {
        category: newKB.category,
        question_trigger: newKB.keywords,
        content: newKB.content
      }
    ]);

    if (error) {
      alert('Erreur : ' + error.message);
    } else {
      setIsAddingKB(false);
      setNewKB({ category: 'Général', keywords: '', content: '' });
      fetchData();
    }
  };

  const handleSaveUnivCourse = async () => {
    const { error } = await supabase.from('courses_university').insert([
      {
        title: newUnivCourse.title,
        faculty: newUnivCourse.faculty,
        type: newUnivCourse.type,
        url: newUnivCourse.url,
        univ: newUnivCourse.univ,
        cat: newUnivCourse.cat,
        duration: newUnivCourse.type === 'video' ? (newUnivCourse.duration || 'N/A') : null,
        pages: newUnivCourse.type === 'pdf' ? (parseInt(newUnivCourse.pages) || 0) : null,
      }
    ]);

    if (error) {
      alert('Erreur lors de l\'ajout : ' + error.message);
    } else {
      setIsAddingUnivCourse(false);
      setNewUnivCourse({ title: '', faculty: 'Mathématiques', type: 'video', url: '', duration: '', pages: '', univ: 'UCAD', cat: 'sciences' });
      fetchData();
    }
  };

  const handleSaveFormation = async () => {
    const { error } = await supabase.from('formations').insert([
      {
        title: newFormation.title,
        description: newFormation.description,
        price: newFormation.price,
        level: newFormation.level,
        icon_name: newFormation.icon_name,
        syllabus: newFormation.syllabus,
        pdf_url: newFormation.pdf_url,
        image: `/images/formations/formation_${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]);

    if (error) {
      alert('Erreur lors de l\'ajout : ' + error.message);
    } else {
      setIsAddingFormation(false);
      setNewFormation({ title: '', description: '', price: '', level: 'Formation', icon_name: 'BookOpen', syllabus: '', pdf_url: '' });
      fetchData();
    }
  };

  const deleteFormation = async (id: number) => {
    if (!confirm('Supprimer cette formation ?')) return;
    const { error } = await supabase.from('formations').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchData();
  };

  const confirmPayment = async (regId: string) => {
    const { error } = await supabase
      .from('registrations')
      .update({ status: 'Payé' })
      .eq('id', regId);

    if (error) {
      alert('Erreur lors de la confirmation : ' + error.message);
    } else {
      fetchData();
    }
  };

  const deleteRegistration = async (regId: string) => {
    if (!confirm('Supprimer cette inscription ?')) return;
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', regId);

    if (error) {
      alert('Erreur lors de la suppression : ' + error.message);
    } else {
      fetchData();
    }
  };

  const deleteUnivCourse = async (id: number) => {
    if (!confirm('Supprimer ce cours universitaire ?')) return;
    const { error } = await supabase.from('courses_university').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchData();
  };

  const stats = [
    { label: "Inscriptions", value: dbRegistrations.length.toString(), icon: Users, color: "text-blue-400", trend: "+5%" },
    { label: "Cours Univ.", value: dbUnivCourses.length.toString(), icon: Film, color: "text-indigo-400", trend: "Stable" },
    { label: "Formations", value: dbFormations.length.toString(), icon: BookOpen, color: "text-purple-400", trend: "Stable" },
    { label: "Revenu Est.", value: (dbRegistrations.filter(r => r.status === 'Payé').length * 50000).toLocaleString() + " FCFA", icon: Wallet, color: "text-emerald-400", trend: "+12%" },
  ];

  const recentRegistrations = dbRegistrations.slice(0, 10).map(reg => ({
    id: reg.id,
    name: reg.full_name,
    email: reg.email,
    course: reg.course_id ? `Formation #${reg.course_id}` : "Non spécifié",
    date: new Date(reg.created_at).toLocaleDateString('fr-FR'),
    amount: "À définir",
    status: reg.status || "En attente"
  }));

  const courses = [
    { id: 1, title: "Développement Web Full Stack", enrollments: 145, revenue: "9.425.000 FCFA", pdfs: 12, status: "Actif" },
    { id: 2, title: "Marketing Digital Avancé", enrollments: 89, revenue: "4.005.000 FCFA", pdfs: 8, status: "Actif" },
    { id: 3, title: "UX/UI Design & Branding", enrollments: 56, revenue: "2.800.000 FCFA", pdfs: 15, status: "Actif" },
    { id: 4, title: "Agrobusiness & Tech", enrollments: 112, revenue: "4.480.000 FCFA", pdfs: 6, status: "Maintenance" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">Administration Système</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Tableau de <span className="text-indigo-500">Pilotage</span></h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group hidden sm:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input className="w-64 bg-white/5 border-white/10 rounded-2xl pl-12 h-12 focus:border-indigo-500 transition-all font-medium placeholder:text-gray-500" placeholder="Rechercher..." />
             </div>
              <Button 
                variant="outline" 
                className="h-12 w-12 rounded-2xl border-white/10 p-0 relative group"
                onClick={fetchData}
                disabled={isLoading}
              >
                <RefreshCw className={`w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-all ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
             <Button variant="outline" className="h-12 w-12 rounded-2xl border-white/10 p-0 relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]"></span>
             </Button>
             <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-black text-white">{user?.email?.split('@')[0] || 'Admin'}</p>
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest cursor-pointer hover:text-red-400 transition-colors" onClick={signOut}>Déconnexion</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-black text-lg border border-indigo-400/30">
                   {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Admin Sidebar - Horizontal Scroll on Mobile */}
          <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {[
              { id: 'overview', icon: LayoutDashboard, label: "Vue d'ensemble" },
              { id: 'courses', icon: BookOpen, label: "Gestion Formations" },
              { id: 'univ_courses', icon: Film, label: "Cours Univ. (Vidéos/PDF)" },
              { id: 'students', icon: Users, label: "Inscriptions" },
              { id: 'chatbot', icon: Bot, label: "IA & Chatbot JAMRA" },
              { id: 'suggestions', icon: MessageSquare, label: "Suggestions" },
              { id: 'finance', icon: Wallet, label: "Finances & Revenus" },
              { id: 'analytics', icon: PieChart, label: "Analytiques" },
              { id: 'settings', icon: Settings, label: "Paramètres" },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.25rem] transition-all font-bold group ${
                  activeTab === item.id 
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 shrink-0 ${activeTab === item.id ? "text-white" : "text-gray-400"}`} />
                <span className="text-sm whitespace-nowrap">{item.label}</span>
                <ChevronRight className={`ml-auto w-4 h-4 hidden lg:block ${activeTab === item.id ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}

            <div className="mt-12 p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 relative overflow-hidden">
               <div className="relative z-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                     <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-black text-white mb-2 uppercase tracking-wide text-xs">Nouveau Programme</h4>
                  <p className="text-[10px] text-gray-400 mb-6 leading-relaxed">Ajoutez une nouvelle formation certifiante au catalogue.</p>
                  <Button className="w-full bg-indigo-600 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700">
                     Créer
                  </Button>
               </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-4 space-y-10">
            
            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all group overflow-hidden relative">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <stat.icon className="w-24 h-24" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                           <div className={`p-3 rounded-2xl bg-white/5 w-fit ${stat.color}`}>
                              <stat.icon className="w-6 h-6" />
                           </div>
                           <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[10px] font-black">{stat.trend}</Badge>
                        </div>
                        <p className="text-3xl font-black mb-1 text-white">{stat.value}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="grid xl:grid-cols-2 gap-10">
                  {/* Recent Activity */}
                  <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] p-10">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-black uppercase tracking-tight text-white">Inscriptions <span className="text-indigo-500">Récentes</span></h3>
                       <Button variant="ghost" className="text-xs font-bold text-gray-400 hover:text-white">Tout voir</Button>
                    </div>
                    <div className="space-y-6">
                      {recentRegistrations.map((reg) => (
                        <div key={reg.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              {reg.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{reg.name}</p>
                              <p className="text-[10px] text-gray-400">{reg.course}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="font-black text-sm">{reg.amount}</p>
                             <Badge className={`text-[10px] font-bold border-none px-2 py-0 ${reg.status === 'Payé' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                {reg.status}
                             </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PDF Management Preview */}
                  <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
                    <div>
                       <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                             <FileText className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-black uppercase tracking-tight">Centre de <span className="text-indigo-500">Ressources</span></h3>
                       </div>
                       <p className="text-gray-400 leading-relaxed mb-8">
                          Gérez vos supports de cours au format PDF. Centralisez vos documents par formation pour un accès étudiant optimisé.
                       </p>
                       <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                             <p className="text-2xl font-black text-white">124</p>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Supports PDF</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                             <p className="text-2xl font-black text-white">4.2 GB</p>
                             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Espace utilisé</p>
                          </div>
                       </div>
                    </div>
                    <Button 
                      className="bg-white text-indigo-600 hover:bg-gray-100 h-14 rounded-2xl font-black uppercase tracking-widest group"
                      onClick={() => setActiveTab('courses')}
                    >
                       Gérer les Ressources
                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black uppercase tracking-tight">Gestion des <span className="text-indigo-500">Formations</span></h3>
                   <div className="flex gap-4">
                      <Button variant="outline" className="border-white/10 rounded-xl px-6 h-12 flex gap-2">
                         <Filter className="w-4 h-4" />
                         Filtrer
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 h-12 flex gap-2" onClick={() => setIsAddingFormation(true)}>
                         <Plus className="w-4 h-4" />
                         Ajouter
                      </Button>
                   </div>
                </div>

                <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                      <thead>
                         <tr className="border-b border-white/10">
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Programme</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Étudiants</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenu</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PDFs</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                            <th className="px-8 py-6"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {dbFormations.map((course) => (
                            <tr key={course.id} className="hover:bg-white/5 transition-colors group">
                               <td className="px-8 py-6 font-bold text-white">{course.title}</td>
                               <td className="px-8 py-6 font-medium text-gray-300">0</td>
                               <td className="px-8 py-6 font-black text-indigo-400">{course.price} FCFA</td>
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                     <Badge className="bg-white/5 border-white/10 text-xs py-1 px-3 flex gap-2">
                                        <FileText className="w-3.5 h-3.5" />
                                        0
                                     </Badge>
                                  </div>
                               </td>
                               <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                     <div className={`w-2 h-2 rounded-full bg-emerald-500`} />
                                     <span className="text-xs font-bold">Actif</span>
                                  </div>
                               </td>
                               <td className="px-8 py-6 text-right">
                                  <button className="text-gray-500 hover:text-red-400" onClick={() => deleteFormation(course.id)}><X className="w-5 h-5" /></button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

                <div className="p-12 border-2 border-dashed border-white/10 rounded-[3rem] text-center space-y-4 hover:border-indigo-500/20 transition-all cursor-pointer" onClick={() => setIsAddingFormation(true)}>
                   <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-10 h-10 text-indigo-500" />
                   </div>
                   <h4 className="text-xl font-black uppercase tracking-tight text-white">Nouvelle Formation</h4>
                   <p className="text-gray-400 max-w-sm mx-auto text-sm">Cliquez ici pour créer un nouveau programme certifiant avec syllabus et PDF.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'univ_courses' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black uppercase tracking-tight">Cours <span className="text-indigo-500">Universitaires</span></h3>
                   <div className="flex gap-4">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 h-12 flex gap-2" onClick={() => setIsAddingUnivCourse(true)}>
                         <Plus className="w-4 h-4" />
                         Ajouter un Cours
                      </Button>
                   </div>
                </div>

                <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                      <thead>
                         <tr className="border-b border-white/10">
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Titre du Cours</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Faculté</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ajouté le</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {dbUnivCourses.length === 0 ? (
                            <tr>
                               <td colSpan={5} className="py-12 text-center text-gray-500 italic">Aucun cours universitaire ajouté pour le moment. Cliquez sur "Ajouter un Cours".</td>
                            </tr>
                         ) : (
                            dbUnivCourses.map((course) => (
                               <tr key={course.id} className="hover:bg-white/5 transition-colors group">
                                  <td className="px-8 py-6 font-bold text-white max-w-[250px] truncate">{course.title}</td>
                                  <td className="px-8 py-6 font-medium text-gray-300">{course.faculty}</td>
                                  <td className="px-8 py-6">
                                     <Badge className={`${course.type === 'video' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'} border-none text-[10px] font-bold uppercase tracking-widest flex items-center w-fit gap-1.5`}>
                                        {course.type === 'video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                        {course.type}
                                     </Badge>
                                  </td>
                                  <td className="px-8 py-6 font-medium text-gray-400 text-sm">{new Date(course.created_at).toLocaleDateString('fr-FR')}</td>
                                  <td className="px-8 py-6 flex items-center justify-between">
                                     <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-emerald-500`} />
                                        <span className="text-xs font-bold">Publié</span>
                                     </div>
                                     <button className="text-gray-500 hover:text-red-400" onClick={() => deleteUnivCourse(course.id)}><X className="w-4 h-4" /></button>
                                  </td>
                               </tr>
                            ))
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </motion.div>
            )}

             {activeTab === 'students' && (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="space-y-10"
               >
                 <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Suivi des <span className="text-indigo-500">Inscriptions</span></h3>
                    <Button variant="outline" className="border-white/10 rounded-xl px-6 h-12 flex gap-2" onClick={fetchData}>
                       <Clock className="w-4 h-4" />
                       Actualiser
                    </Button>
                 </div>

                 <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left min-w-[1000px]">
                       <thead>
                          <tr className="border-b border-white/10">
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Étudiant</th>
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Formation / Module</th>
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Paiement</th>
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Statut</th>
                             <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {dbRegistrations.length === 0 ? (
                             <tr>
                                <td colSpan={6} className="py-12 text-center text-gray-500 italic">Aucune inscription enregistrée.</td>
                             </tr>
                          ) : (
                             dbRegistrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
                                   <td className="px-8 py-6">
                                      <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20">
                                            {reg.full_name?.charAt(0) || '?'}
                                         </div>
                                         <div>
                                            <p className="font-bold text-white">{reg.full_name}</p>
                                            <p className="text-[10px] text-gray-500">{reg.email}</p>
                                         </div>
                                      </div>
                                   </td>
                                   <td className="px-8 py-6 font-medium text-gray-300">
                                      {reg.interest || 'Non spécifié'}
                                      {reg.level && <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mt-1">{reg.level}</p>}
                                   </td>
                                   <td className="px-8 py-6">
                                      {reg.payment_method ? (
                                         <Badge className={`border-none text-[10px] font-black uppercase tracking-widest ${
                                            reg.payment_method === 'wave' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                                         }`}>
                                            {reg.payment_method}
                                         </Badge>
                                      ) : (
                                         <span className="text-gray-600 text-xs">N/A</span>
                                      )}
                                   </td>
                                   <td className="px-8 py-6">
                                      <code className="bg-white/5 px-3 py-1 rounded text-xs font-mono text-indigo-300">
                                         {reg.transaction_id || '---'}
                                      </code>
                                   </td>
                                   <td className="px-8 py-6">
                                      <div className="flex items-center gap-2">
                                         <div className={`w-2 h-2 rounded-full ${reg.status === 'Payé' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                                         <span className={`text-xs font-bold ${reg.status === 'Payé' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                            {reg.status || 'En attente'}
                                         </span>
                                      </div>
                                   </td>
                                   <td className="px-8 py-6">
                                      <div className="flex items-center gap-2">
                                         {reg.status !== 'Payé' && (
                                            <Button 
                                               size="sm" 
                                               className="bg-emerald-600 hover:bg-emerald-700 h-8 rounded-lg text-[9px] font-black uppercase tracking-widest px-3"
                                               onClick={() => confirmPayment(reg.id)}
                                            >
                                               Valider
                                            </Button>
                                         )}
                                         <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-400"
                                            onClick={() => deleteRegistration(reg.id)}
                                         >
                                            <X className="w-4 h-4" />
                                         </Button>
                                      </div>
                                   </td>
                                </tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </motion.div>
             )}

            {activeTab === 'chatbot' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black uppercase tracking-tight">Base de Connaissances <span className="text-indigo-500">JAMRA</span></h3>
                   <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 h-12 flex gap-2" onClick={() => setIsAddingKB(true)}>
                      <Plus className="w-4 h-4" />
                      Ajouter une Connaissance
                   </Button>
                </div>

                <div className="bg-indigo-600/5 border border-indigo-500/10 p-8 rounded-[2rem] flex items-center gap-6">
                   <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Brain className="w-8 h-8 text-white" />
                   </div>
                   <div>
                      <h4 className="font-black text-white uppercase tracking-wider mb-1">Intelligence Artificielle Locale</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Collez ici les textes extraits de vos cours PDF. Le chatbot **JAMRA** utilisera ces informations pour répondre aux questions spécifiques des étudiants sur les cours, les facultés et les inscriptions.
                      </p>
                   </div>
                </div>

                <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                      <thead>
                         <tr className="border-b border-white/10">
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catégorie</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mots-clés / Triggers</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aperçu du contenu</th>
                            <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="px-8 py-6"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {chatbotKB.length === 0 ? (
                            <tr>
                               <td colSpan={5} className="py-12 text-center text-gray-500 italic">Aucune connaissance ajoutée. Cliquez sur "Ajouter une Connaissance" pour commencer.</td>
                            </tr>
                         ) : (
                            chatbotKB.map((kb) => (
                               <tr key={kb.id} className="hover:bg-white/5 transition-colors group">
                                  <td className="px-8 py-6 font-bold text-indigo-400">{kb.category}</td>
                                  <td className="px-8 py-6 font-medium text-white">{kb.question_trigger}</td>
                                  <td className="px-8 py-6 font-medium text-gray-400 text-sm max-w-[300px] truncate">{kb.content}</td>
                                  <td className="px-8 py-6 font-medium text-gray-500 text-xs">{new Date(kb.created_at).toLocaleDateString('fr-FR')}</td>
                                  <td className="px-8 py-6 text-right">
                                     <button className="text-gray-500 hover:text-white" onClick={async () => {
                                        if(confirm('Supprimer cette connaissance ?')) {
                                           await supabase.from('chatbot_knowledge').delete().eq('id', kb.id);
                                           fetchData();
                                        }
                                     }}><X className="w-4 h-4" /></button>
                                  </td>
                               </tr>
                            ))
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Simulated PDF Tool Modal */}
      <AnimatePresence>
         {isAddingPDF && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddingPDF(false)} />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden p-12">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                           <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black uppercase tracking-tight">Ajouter <span className="text-indigo-500">un Support</span></h3>
                           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Formation : Full Stack Web</p>
                        </div>
                     </div>
                     <button onClick={() => setIsAddingPDF(false)}>
                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                     </button>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nom du Document</label>
                        <Input className="bg-white/5 border-white/10 rounded-2xl h-14" placeholder="Ex: Introduction aux React Hooks.pdf" />
                     </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Type de Ressource</label>
                           <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none">
                              <option value="formation">Formation Payante</option>
                              <option value="univ">Cours Universitaire</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Niveau d'étude</label>
                           <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none">
                              <option value="L1">Licence 1</option>
                              <option value="L2">Licence 2</option>
                              <option value="L3">Licence 3</option>
                              <option value="M1">Master 1</option>
                              <option value="M2">Master 2</option>
                           </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Filière / Département</label>
                         <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none">
                            <option value="geo">Géographie</option>
                            <option value="hist">Histoire</option>
                            <option value="droit">Droit</option>
                            <option value="tech">Informatique</option>
                            <option value="eco">Économie</option>
                            <option value="gestion">Gestion</option>
                         </select>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Lien du Fichier (Simulé)</label>
                         <Input className="bg-white/5 border-white/10 rounded-2xl h-14 text-white placeholder:text-gray-500" placeholder="https://cdn.xalima.sn/courses/pdf/..." />
                      </div>
                     
                     <div className="flex items-center gap-4 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl">
                        <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0" />
                        <p className="text-[11px] text-gray-400 leading-relaxed font-bold italic">
                           Ce document sera immédiatement disponible pour tous les étudiants inscrits à ce module dans leur espace d'apprentissage.
                        </p>
                     </div>

                     <div className="flex gap-4">
                        <Button variant="outline" className="flex-grow h-16 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest" onClick={() => setIsAddingPDF(false)}>Annuler</Button>
                        <Button className="flex-grow h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20" onClick={() => setIsAddingPDF(false)}>Enregistrer</Button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* University Course Modal */}
      <AnimatePresence>
         {isAddingUnivCourse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddingUnivCourse(false)} />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden p-12 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                           <Film className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-xl font-black uppercase tracking-tight">Ajouter <span className="text-indigo-500">Un Cours</span></h3>
                           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Section Universitaire</p>
                        </div>
                     </div>
                     <button onClick={() => setIsAddingUnivCourse(false)}>
                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                     </button>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Titre du Cours</label>
                        <Input 
                           value={newUnivCourse.title}
                           onChange={(e) => setNewUnivCourse({...newUnivCourse, title: e.target.value})}
                           className="bg-white/5 border-white/10 rounded-2xl h-14" 
                           placeholder="Ex: Analyse Mathématique L1" 
                        />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Type de Contenu</label>
                           <select 
                              value={newUnivCourse.type}
                              onChange={(e) => setNewUnivCourse({...newUnivCourse, type: e.target.value})}
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
                              style={{ colorScheme: 'dark' }}
                           >
                              <option value="video">Vidéo (MP4 / YouTube)</option>
                              <option value="pdf">Document PDF</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Faculté</label>
                           <select 
                              value={newUnivCourse.faculty}
                              onChange={(e) => setNewUnivCourse({...newUnivCourse, faculty: e.target.value})}
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
                              style={{ colorScheme: 'dark' }}
                           >
                              <option value="Mathématiques">Mathématiques</option>
                              <option value="Informatique">Informatique</option>
                              <option value="Droit">Droit</option>
                              <option value="Médecine">Médecine</option>
                              <option value="Histoire">Histoire</option>
                              <option value="Géographie">Géographie</option>
                              <option value="Gestion">Gestion</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Lien du fichier (URL)</label>
                        <Input 
                           value={newUnivCourse.url}
                           onChange={(e) => setNewUnivCourse({...newUnivCourse, url: e.target.value})}
                           className="bg-white/5 border-white/10 rounded-2xl h-14 text-white placeholder:text-gray-500" 
                           placeholder="https://... (Lien de la vidéo ou du PDF)" 
                        />
                     </div>

                     {newUnivCourse.type === 'video' ? (
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Durée estimée</label>
                           <Input 
                              value={newUnivCourse.duration}
                              onChange={(e) => setNewUnivCourse({...newUnivCourse, duration: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14 text-white placeholder:text-gray-500" 
                              placeholder="Ex: 45 min" 
                           />
                        </div>
                     ) : (
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nombre de pages</label>
                           <Input 
                              type="number"
                              value={newUnivCourse.pages}
                              onChange={(e) => setNewUnivCourse({...newUnivCourse, pages: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14 text-white placeholder:text-gray-500" 
                              placeholder="Ex: 120" 
                           />
                        </div>
                     )}

                     <div className="flex items-center gap-4 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl mt-4">
                        <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0" />
                        <p className="text-[11px] text-gray-400 leading-relaxed font-bold italic">
                           En enregistrant, ce cours sera visible sur la plateforme publique pour les étudiants des facultés correspondantes.
                        </p>
                     </div>

                     <div className="flex gap-4 pt-4">
                        <Button variant="outline" className="flex-grow h-16 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest" onClick={() => setIsAddingUnivCourse(false)}>Annuler</Button>
                        <Button 
                           className="flex-grow h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20" 
                           onClick={handleSaveUnivCourse}
                           disabled={!newUnivCourse.title || !newUnivCourse.url}
                        >
                           Publier le Cours
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Add Formation Modal */}
      <AnimatePresence>
         {isAddingFormation && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddingFormation(false)} />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-3xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden p-12 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                           <Plus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black uppercase tracking-tight text-white font-sans">Nouvelle <span className="text-indigo-500">Formation</span></h3>
                           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Catalogue Certifiant</p>
                        </div>
                     </div>
                     <button onClick={() => setIsAddingFormation(false)}>
                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                     </button>
                  </div>

                  <div className="space-y-8">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Titre de la Formation</label>
                           <Input 
                              value={newFormation.title}
                              onChange={(e) => setNewFormation({...newFormation, title: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14" 
                              placeholder="Ex: Marketing Digital 360" 
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Prix (FCFA)</label>
                           <Input 
                              value={newFormation.price}
                              onChange={(e) => setNewFormation({...newFormation, price: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14" 
                              placeholder="Ex: 45 000" 
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Niveau / Type</label>
                           <select 
                              value={newFormation.level}
                              onChange={(e) => setNewFormation({...newFormation, level: e.target.value})}
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white focus:border-indigo-500 focus:outline-none"
                              style={{ colorScheme: 'dark' }}
                           >
                              <option value="Formation">Formation Classique</option>
                              <option value="Spécialisation">Spécialisation</option>
                              <option value="Master">Programme Master</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Icône (Lucide Name)</label>
                           <select 
                              value={newFormation.icon_name}
                              onChange={(e) => setNewFormation({...newFormation, icon_name: e.target.value})}
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-white focus:border-indigo-500 focus:outline-none"
                              style={{ colorScheme: 'dark' }}
                           >
                              <option value="TrendingUp">Marketing / Graph</option>
                              <option value="Code">Développement / Code</option>
                              <option value="Briefcase">Business / Management</option>
                              <option value="Palette">Design / Art</option>
                              <option value="BookOpen">Éducation / Autre</option>
                           </select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Description Simple</label>
                        <Input 
                           value={newFormation.description}
                           onChange={(e) => setNewFormation({...newFormation, description: e.target.value})}
                           className="bg-white/5 border-white/10 rounded-2xl h-14" 
                           placeholder="Résumé court de 2 lignes..." 
                        />
                     </div>

                     <div className="space-y-6 p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[2rem]">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Syllabus Détaillé (Le contenu du PDF)</label>
                           <textarea 
                              value={newFormation.syllabus}
                              onChange={(e) => setNewFormation({...newFormation, syllabus: e.target.value})}
                              className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-indigo-500 focus:outline-none font-medium leading-relaxed"
                              placeholder="Copiez ici le texte extrait de votre PDF..."
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">URL du PDF (Lecture directe)</label>
                           <Input 
                              value={newFormation.pdf_url}
                              onChange={(e) => setNewFormation({...newFormation, pdf_url: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14" 
                              placeholder="https://..." 
                           />
                        </div>
                     </div>

                     <div className="flex gap-4 pt-6">
                        <Button variant="outline" className="flex-grow h-16 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest" onClick={() => setIsAddingFormation(false)}>Annuler</Button>
                        <Button 
                           className="flex-grow h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20" 
                           onClick={handleSaveFormation}
                           disabled={!newFormation.title || !newFormation.description}
                        >
                           Publier la Formation
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Chatbot KB Modal */}
      <AnimatePresence>
         {isAddingKB && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddingKB(false)} />
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-[#020617] border border-white/10 rounded-[3rem] overflow-hidden p-12">
                  <div className="flex justify-between items-center mb-10">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                           <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black uppercase tracking-tight">Ajouter <span className="text-indigo-500">un Savoir</span></h3>
                           <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Base de connaissances IA JAMRA</p>
                        </div>
                     </div>
                     <button onClick={() => setIsAddingKB(false)}>
                        <X className="w-6 h-6 text-gray-400 hover:text-white" />
                     </button>
                  </div>

                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Catégorie</label>
                           <select 
                              value={newKB.category}
                              onChange={(e) => setNewKB({...newKB, category: e.target.value})}
                              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
                           >
                              <option value="Formation">Formation</option>
                              <option value="Droit">Droit</option>
                              <option value="Médecine">Médecine</option>
                              <option value="Inscription">Inscription</option>
                              <option value="Tarifs">Tarifs</option>
                              <option value="Filières">Filières</option>
                              <option value="Général">Général</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Mots-clés déclencheurs</label>
                           <Input 
                              value={newKB.keywords}
                              onChange={(e) => setNewKB({...newKB, keywords: e.target.value})}
                              className="bg-white/5 border-white/10 rounded-2xl h-14 text-white placeholder:text-gray-500" 
                              placeholder="Ex: ADN, génétique, hérédité" 
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Contenu (Texte extrait du PDF)</label>
                        <textarea 
                           value={newKB.content}
                           onChange={(e) => setNewKB({...newKB, content: e.target.value})}
                           className="w-full min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-indigo-500 focus:outline-none font-medium leading-relaxed"
                           placeholder="Copiez-collez ici le contenu exhaustif du document..."
                        />
                     </div>

                     <div className="flex gap-4 pt-4">
                        <Button variant="outline" className="flex-grow h-16 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest" onClick={() => setIsAddingKB(false)}>Annuler</Button>
                        <Button 
                           className="flex-grow h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20" 
                           onClick={handleSaveKB}
                           disabled={!newKB.keywords || !newKB.content}
                        >
                           Enregistrer Savoir
                        </Button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
