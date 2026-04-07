import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  TrendingUp, Code, Briefcase, FileText, Palette, Globe, Smartphone, Video, Users2, 
  Leaf, Truck, Sun, BarChart3, ShieldCheck, Database, Cpu, Coins, LineChart, 
  Sprout, Network, Lock, BookOpen, GraduationCap, Star, X, Github, Mail, LockIcon, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function Formation() {
  const navigate = useNavigate();
  const [dynamicFormations, setDynamicFormations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap: Record<string, any> = {
    'TrendingUp': TrendingUp,
    'Code': Code,
    'Briefcase': Briefcase,
    'FileText': FileText,
    'Palette': Palette,
    'Globe': Globe,
    'Smartphone': Smartphone,
    'Video': Video,
    'Users2': Users2,
    'Leaf': Leaf,
    'Truck': Truck,
    'Sun': Sun,
    'BarChart3': BarChart3,
    'ShieldCheck': ShieldCheck,
    'Database': Database,
    'Cpu': Cpu,
    'Coins': Coins,
    'LineChart': LineChart,
    'Sprout': Sprout,
    'Network': Network
  };

  useEffect(() => {
    async function fetchFormations() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching formations:', error.message);
      } else if (data) {
        const mapped = data.map(f => ({
          ...f,
          icon: iconMap[f.icon_name] || GraduationCap, 
          certification: true, 
          image: f.image && f.image.trim() !== "" ? f.image : `/images/formations/formation_${(f.id % 5) + 1}.jpg`, // Image par défaut basée sur l'ID
          type: f.level === 'Master' ? 'Master' : (f.level === 'Spécialisation' ? 'Spécialisation' : 'Formation')
        }));
        setDynamicFormations(mapped);
      }
      setIsLoading(false);
    }
    fetchFormations();
  }, []);

  const formations = dynamicFormations.length > 0 ? dynamicFormations : [
    // Fallback static data (existing data)
    {
      id: 1,
      title: 'Marketing Digital Avancé',
      description: 'Maîtrisez les stratégies de marketing digital, SEO, réseaux sociaux et campagnes publicitaires.',
      price: '45 000 FCFA',
      duration: '8 semaines',
      icon: TrendingUp,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 2,
      title: 'Développement Web Full Stack',
      description: 'Apprenez React, Node.js, bases de données et déployez vos propres applications web.',
      price: '65 000 FCFA',
      duration: '12 semaines',
      icon: Code,
      level: 'Avancé',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_2.jpg',
    },
    {
      id: 3,
      title: 'Entrepreneuriat & Business',
      description: 'De l\'idée au lancement : créez et développez votre entreprise avec succès.',
      price: '40 000 FCFA',
      duration: '6 semaines',
      icon: Briefcase,
      level: 'Débutant',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_3.jpg',
    },
    {
      id: 4,
      title: 'Bureautique Professionnelle',
      description: 'Excel, Word, PowerPoint : maîtrisez les outils essentiels du monde professionnel.',
      price: '25 000 FCFA',
      duration: '4 semaines',
      icon: FileText,
      level: 'Débutant',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_4.jpg',
    },
    {
      id: 5,
      title: 'Design Graphique & Branding',
      description: 'Créez des visuels percutants avec Photoshop, Illustrator et Canva.',
      price: '50 000 FCFA',
      duration: '8 semaines',
      icon: Palette,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_5.jpg',
    },
    {
      id: 6,
      title: 'Communication Digitale',
      description: 'Développez votre présence en ligne et gérez efficacement votre e-réputation.',
      price: '35 000 FCFA',
      duration: '6 semaines',
      icon: Globe,
      level: 'Débutant',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 7,
      title: 'Développement Mobile Flutter',
      description: 'Créez des applications mobiles iOS et Android avec Flutter et Dart.',
      price: '70 000 FCFA',
      duration: '10 semaines',
      icon: Smartphone,
      level: 'Avancé',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_2.jpg',
    },
    {
      id: 8,
      title: 'Montage Vidéo Professionnel',
      description: 'Adobe Premiere Pro, After Effects : devenez monteur vidéo professionnel.',
      price: '55 000 FCFA',
      duration: '8 semaines',
      icon: Video,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_2.jpg',
    },
    {
      id: 9,
      title: 'Community Management',
      description: 'Gérez et animez les communautés sur les réseaux sociaux avec expertise.',
      price: '38 000 FCFA',
      duration: '6 semaines',
      icon: Users2,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_4.jpg',
    },
    {
      id: 21,
      title: 'Agrobusiness & Gestion Agricole',
      description: 'Développez des projets agricoles rentables, de la production à la commercialisation verte.',
      price: '40 000 FCFA',
      duration: '8 semaines',
      icon: Leaf,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_3.jpg',
    },
    {
      id: 22,
      title: 'Logistique & Supply Chain',
      description: 'Optimisez les flux de marchandises, transport, stockage et gestion des approvisionnements locaux.',
      price: '55 000 FCFA',
      duration: '10 semaines',
      icon: Truck,
      level: 'Intermédiaire',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 23,
      title: 'Initiation aux Énergies Renouvelables',
      description: 'Comprendre et concevoir des systèmes solaires et solutions écologiques adaptées.',
      price: '60 000 FCFA',
      duration: '10 semaines',
      icon: Sun,
      level: 'Débutant',
      certification: true,
      type: 'Formation',
      image: '/images/formations/formation_4.jpg',
    },

    // Spécialisations Avancées
    {
      id: 10,
      title: 'Data Science & Analytics',
      description: 'Spécialisation en analyse de données, Python, Machine Learning et visualisation.',
      price: '85 000 FCFA',
      duration: '14 semaines',
      icon: BarChart3,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_5.jpg',
    },
    {
      id: 11,
      title: 'Cybersécurité Avancée',
      description: 'Spécialisation en sécurité informatique, ethical hacking et protection des systèmes.',
      price: '95 000 FCFA',
      duration: '16 semaines',
      icon: ShieldCheck,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_4.jpg',
    },
    {
      id: 12,
      title: 'DevOps & Cloud Computing',
      description: 'Spécialisation AWS, Docker, Kubernetes et automatisation des déploiements.',
      price: '90 000 FCFA',
      duration: '14 semaines',
      icon: Database,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_5.jpg',
    },
    {
      id: 13,
      title: 'Intelligence Artificielle & Deep Learning',
      description: 'Spécialisation en IA, réseaux neuronaux, TensorFlow et applications pratiques.',
      price: '100 000 FCFA',
      duration: '16 semaines',
      icon: Cpu,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 14,
      title: 'UX/UI Design Avancé',
      description: 'Spécialisation en design d\'expérience utilisateur et interfaces modernes.',
      price: '75 000 FCFA',
      duration: '12 semaines',
      icon: Palette,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_2.jpg',
    },
    {
      id: 24,
      title: 'Développement Web3 & Blockchain',
      description: 'Création de Smart Contracts, DApps et compréhension de l\'écosystème crypto.',
      price: '120 000 FCFA',
      duration: '14 semaines',
      icon: Coins,
      level: 'Spécialisation',
      certification: true,
      type: 'Spécialisation',
      image: '/images/formations/formation_3.jpg',
    },

    // Programmes Master
    {
      id: 15,
      title: 'Master en Marketing Digital',
      description: 'Programme complet : stratégie digitale, analytics, growth hacking et ROI.',
      price: '150 000 FCFA',
      duration: '6 mois',
      icon: TrendingUp,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_4.jpg',
    },
    {
      id: 16,
      title: 'Master en Data Science',
      description: 'Programme avancé : Big Data, Machine Learning, Deep Learning et IA.',
      price: '180 000 FCFA',
      duration: '8 mois',
      icon: Database,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_5.jpg',
    },
    {
      id: 17,
      title: 'Master en Management de Projet Digital',
      description: 'Gestion de projets digitaux, Agile, Scrum et leadership d\'équipes tech.',
      price: '160 000 FCFA',
      duration: '6 mois',
      icon: Briefcase,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 18,
      title: 'Master en Finance & FinTech',
      description: 'Finance digitale, blockchain, cryptomonnaies et technologies financières.',
      price: '170 000 FCFA',
      duration: '7 mois',
      icon: LineChart,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_2.jpg',
    },
    {
      id: 19,
      title: 'Master en Ingénierie Logicielle',
      description: 'Architecture logicielle, microservices, design patterns et best practices.',
      price: '175 000 FCFA',
      duration: '8 mois',
      icon: Code,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_3.jpg',
    },
    {
      id: 20,
      title: 'Master en E-Business & E-Commerce',
      description: 'Commerce électronique, stratégies digitales et transformation numérique.',
      price: '155 000 FCFA',
      duration: '6 mois',
      icon: Globe,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_4.jpg',
    },
    {
      id: 25,
      title: 'Master en Management Agro-Industriel',
      description: 'Pilotage de la chaîne de valeur agricole, innovation et transformation industrielle.',
      price: '165 000 FCFA',
      duration: '8 mois',
      icon: Sprout,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_1.jpg',
    },
    {
      id: 26,
      title: 'Master en Ressources Humaines 4.0',
      description: 'Gestion des talents, digitalisation RH et management interculturel moderne.',
      price: '145 000 FCFA',
      duration: '6 mois',
      icon: Network,
      level: 'Master',
      certification: true,
      type: 'Master',
      image: '/images/formations/formation_5.jpg',
    },
  ];

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<any>(null);
  const [selectedFormationForSyllabus, setSelectedFormationForSyllabus] = useState<any>(null);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  
  const handleOpenSyllabus = (formation: any) => {
    setSelectedFormationForSyllabus(formation);
    setIsSyllabusModalOpen(true);
  };
  
  // Pagination state: tracks current page for each category title
  const [pages, setPages] = useState<Record<string, number>>({});
  const ITEMS_PER_PAGE = 6; // 3 columns * 2 lines = 6 items

  const handleStartRegistration = () => {
    navigate('/register');
  };

  const categories = [
    { title: 'Formations Professionnelles', items: formations.filter(f => f.type === 'Formation') },
    { title: 'Spécialisations Avancées', items: formations.filter(f => f.type === 'Spécialisation') },
    { title: 'Programmes Master', items: formations.filter(f => f.type === 'Master') },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <Helmet>
        <title>Formations Certifiantes | XALIMA Digital Academy</title>
        <meta name="description" content="Boostez votre carrière avec les formations intensives de Xalima. Marketing Digital, Développement Web, Entrepreneuriat. Certifications reconnues." />
        <meta name="keywords" content="formation certifiante Sénégal, marketing digital dakar, apprendre le code sénégal, xalima formations" />
      </Helmet>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Split Layout like Home */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-[9px] font-bold uppercase tracking-widest mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Excellence Sénégalaise</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              Bâtissez votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">futur digital</span>.
            </h1>
            <p className="text-sm sm:text-lg text-gray-500 border-l-2 border-indigo-500/30 pl-4 sm:pl-6 leading-relaxed mb-6 sm:mb-10 font-normal italic">
              Des programmes certifiants conçus par des experts pour répondre aux exigences du marché du travail au Sénégal.
            </p>
            <Button 
              size="lg"
              className="h-14 sm:h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm sm:text-lg uppercase tracking-wider shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
              onClick={() => navigate('/register')}
            >
              DÉMARRER MON PARCOURS
              <ArrowRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
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
                  src="/images/illustrations/formation_hero.jpg"
                  alt="Étudiante Xalima"
                  className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-10 left-10 right-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-black uppercase tracking-wider text-sm">Validé par les experts</div>
                      <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Diplômes certifiants 100%</div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Premium Highlights - Simplified v1 style */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { emoji: "🎓", title: "Certifications", desc: "Diplômes reconnus par les entreprises leaders au Sénégal." },
            { emoji: "👨‍🏫", title: "Mentorat d'Exception", desc: "Suivi personnalisé par les meilleurs experts du pays." },
            { emoji: "⏰", title: "Liberté Totale", desc: "Apprenez à votre rythme, sans contraintes de temps." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all"
            >
              <div className="text-2xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-black text-white mb-2 tracking-wide uppercase">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Categorized Formations */}
        <div className="space-y-16 sm:space-y-32">
          {categories.map((category, catIdx) => {
            const currentPage = pages[category.title] || 1;
            const totalPages = Math.ceil(category.items.length / ITEMS_PER_PAGE);
            const paginatedItems = category.items.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

            return (
            <div key={category.title}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg sm:text-3xl font-black tracking-tight uppercase">{category.title}</h2>
                <div className="h-px flex-grow mx-8 bg-gradient-to-r from-indigo-500/20 to-transparent hidden sm:block"></div>
                <Badge variant="outline" className="border-white/5 text-gray-500 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                  {category.items.length} Formations
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedItems.map((formation, i) => {
                  const IconComponent = formation.icon;
                  return (
                    <motion.div
                      key={formation.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col group overflow-hidden rounded-2xl h-full">
                        <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                          <ImageWithFallback
                            src={formation.image}
                            alt={formation.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020617] to-transparent"></div>
                          
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-indigo-600 text-white border-none px-3 py-1 rounded-full font-bold text-[10px] tracking-widest uppercase">
                              {formation.certification ? 'Certifiant' : 'Libre'}
                            </Badge>
                          </div>
                          
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/10 text-white">
                              <IconComponent className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <CardHeader className="p-4 sm:p-6">
                          <CardTitle className="text-white text-sm sm:text-lg font-black mb-1.5 tracking-wide uppercase transition-colors group-hover:text-indigo-400">
                            {formation.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-[10px] sm:text-sm leading-relaxed line-clamp-2 font-normal">
                            {formation.description}
                          </CardDescription>
                        </CardHeader>

                        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                          <div className="flex items-center">
                            <span className="mr-2 text-xs">⏱</span>
                            {formation.duration}
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-xs">📊</span>
                            {formation.level}
                          </div>
                          {formation.certification && (
                            <div className="flex items-center text-indigo-400">
                               <FileText className="w-3 h-3 mr-1.5" />
                               PDF
                            </div>
                          )}
                        </div>

                        <CardFooter className="p-4 pt-0 border-none mt-auto flex items-center justify-between bg-transparent">
                          <div className="text-base font-black text-white tracking-tight">
                            {formation.price}
                          </div>
                          <div className="flex gap-2 flex-col sm:flex-row">
                            <Button 
                              variant="ghost"
                              className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl h-9 px-4 font-bold text-[9px] uppercase tracking-widest transition-all active:scale-95 flex-grow"
                              onClick={() => handleOpenSyllabus(formation)}
                            >
                              VOIR PROGRAMME
                            </Button>
                            <Button 
                              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-9 px-4 font-bold text-[9px] uppercase tracking-widest transition-all active:scale-95 flex-grow"
                              onClick={() => handleStartRegistration()}
                            >
                              S'INSCRIRE
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-6">
                  <Button 
                    variant="outline" 
                    disabled={currentPage === 1}
                    onClick={() => setPages(p => ({ ...p, [category.title]: currentPage - 1 }))}
                    className="border-white/10 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
                  >
                    Précédent
                  </Button>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Page <span className="text-white">{currentPage}</span> sur <span className="text-white">{totalPages}</span>
                  </span>
                  <Button 
                    variant="outline" 
                    disabled={currentPage === totalPages}
                    onClick={() => setPages(p => ({ ...p, [category.title]: currentPage + 1 }))}
                    className="border-white/10 text-white bg-white/5 hover:bg-white/10 disabled:opacity-50"
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </div>
            );
          })}
        </div>

        {/* CTA Section - Simplified v1 style */}
        <div className="mt-40 bg-indigo-600/10 rounded-2xl p-12 lg:p-20 text-center border border-white/10 relative overflow-hidden">
          <h2 className="text-3xl lg:text-5xl font-black mb-6 uppercase tracking-tight">Besoin d'un programme sur-mesure ?</h2>
          <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto mb-12 font-normal">
            Notre catalogue s'enrichit chaque semaine. Envoyez-nous vos suggestions pour adapter nos programmes à vos ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button size="lg" className="h-16 px-10 bg-white text-black hover:bg-indigo-50 rounded-xl font-bold uppercase tracking-widest transition-all">
                Nous contacter
              </Button>
            </Link>
            <Link to="/suggerer-cours">
              <Button size="lg" className="h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-indigo-600/20 transition-all">
                Suggérer un cours
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Premium Login Modal - Simplified v1 style */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsLoginModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#020617] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="bg-indigo-600 p-3 rounded-xl">
                    <LockIcon className="w-6 h-6 text-white" />
                  </div>
                  <button onClick={() => setIsLoginModalOpen(false)}>
                    <X className="w-6 h-6 text-gray-500 hover:text-white transition-colors" />
                  </button>
                </div>

                <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Accès Étudiant</h2>
                <p className="text-gray-500 text-sm mb-10">Connectez-vous pour accéder à votre espace personnalisé.</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</Label>
                    <Input className="h-12 bg-white/5 border-white/10 rounded-lg focus:border-indigo-500" placeholder="votre@email.sn" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Mot de passe</Label>
                    <Input type="password" className="h-12 bg-white/5 border-white/10 rounded-lg focus:border-indigo-500" placeholder="••••••••" />
                  </div>
                  <Button 
                    className="w-full h-14 bg-indigo-600 uppercase font-black tracking-widest rounded-lg"
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      navigate('/dashboard');
                    }}
                  >
                    Se connecter
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Registration Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsRegisterModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0c1222] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black uppercase tracking-tight">Inscription</h2>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{selectedFormation?.title}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRegisterModalOpen(false)}>
                    <X className="w-6 h-6 text-gray-500 hover:text-white transition-colors" />
                  </button>
                </div>

                <form className="space-y-6" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('full_name') as string;
                  const email = formData.get('email') as string;
                  const phone = formData.get('phone') as string;
                  const level = formData.get('study_level') as string;

                  const { error } = await supabase
                    .from('registrations')
                    .insert([
                      { 
                        full_name: name, 
                        email: email, 
                        phone: phone, 
                        course_id: selectedFormation?.id,
                        status: 'En attente'
                      }
                    ]);

                  if (error) {
                    alert('Erreur lors de l\'inscription : ' + error.message);
                  } else {
                    setIsRegisterModalOpen(false); 
                    alert('Inscription envoyée avec succès !'); 
                  }
                }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nom et Prénom</Label>
                      <Input name="full_name" required className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-indigo-500" placeholder="Ex: Amadou Diallo" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</Label>
                       <Input name="email" required type="email" className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-indigo-500" placeholder="votre@email.sn" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Téléphone</Label>
                      <Input name="phone" required className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-indigo-500" placeholder="+221 ..." />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Niveau d'étude</Label>
                       <select 
                         name="study_level" 
                         required 
                         className="w-full h-12 bg-[#1a2333] border border-white/10 rounded-xl px-4 text-sm text-white focus:border-indigo-500 focus:outline-none cursor-pointer appearance-none"
                         style={{ colorScheme: 'dark' }}
                       >
                          <option value="" className="bg-[#1a2333] text-white">Sélectionner</option>
                          <option value="bac" className="bg-[#1a2333] text-white">BAC</option>
                          <option value="licence 1" className="bg-[#1a2333] text-white">Licence 1</option>
                          <option value="licence 2" className="bg-[#1a2333] text-white">Licence 2</option>
                          <option value="licence 3" className="bg-[#1a2333] text-white">Licence 3</option>
                          <option value="master 1" className="bg-[#1a2333] text-white">Master 1</option>
                          <option value="master 2" className="bg-[#1a2333] text-white">Master 2</option>
                          <option value="professionnel" className="bg-[#1a2333] text-white">Professionnel</option>
                       </select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      type="submit"
                      className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all text-sm"
                    >
                      Confirmer l'inscription
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Syllabus & PDF Viewer Modal */}
      <AnimatePresence>
        {isSyllabusModalOpen && selectedFormationForSyllabus && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setIsSyllabusModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl bg-[#0c1222] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 sm:p-10 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">Programme : <span className="text-indigo-400">{selectedFormationForSyllabus.title}</span></h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] font-mono">{selectedFormationForSyllabus.level} • {selectedFormationForSyllabus.duration}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSyllabusModalOpen(false)}
                  className="w-12 h-12 rounded-xl hover:bg-white/5 flex items-center justify-center transition-colors border border-transparent hover:border-white/10 group"
                >
                  <X className="w-6 h-6 text-gray-500 group-hover:text-white" />
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="flex-grow overflow-y-auto p-8 sm:p-12 scrollbar-hide">
                <div className="grid lg:grid-cols-2 gap-12 h-full">
                  
                  {/* Left: Syllabus Text */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-indigo-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tight">Détails du <span className="text-indigo-500">Syllabus</span></h3>
                    </div>
                    
                    {selectedFormationForSyllabus.syllabus ? (
                      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap font-normal text-sm sm:text-base selection:bg-indigo-500/30">
                        {selectedFormationForSyllabus.syllabus}
                      </div>
                    ) : (
                      <div className="p-12 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                         <Star className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-pulse" />
                         <p className="text-gray-500 italic">Le syllabus détaillé sera bientôt disponible pour cette formation.</p>
                      </div>
                    )}

                    <div className="pt-8">
                       <Button 
                          className="w-full h-16 bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
                          onClick={() => { setIsSyllabusModalOpen(false); handleStartRegistration(); }}
                       >
                          Démarrer l'inscription maintenant
                       </Button>
                    </div>
                  </div>

                  {/* Right: PDF Viewer or Placeholder */}
                  <div className="space-y-8 h-full flex flex-col">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-rose-500 rounded-full" />
                      <h3 className="text-xl font-black uppercase tracking-tight">Document <span className="text-rose-500">Officiel (PDF)</span></h3>
                    </div>

                    {selectedFormationForSyllabus.pdf_url ? (
                      <div className="flex-grow bg-[#050816] rounded-3xl border border-white/10 overflow-hidden relative min-h-[400px]">
                         <iframe 
                            src={selectedFormationForSyllabus.pdf_url.includes('google.com') ? selectedFormationForSyllabus.pdf_url : `https://docs.google.com/viewer?url=${encodeURIComponent(selectedFormationForSyllabus.pdf_url)}&embedded=true`}
                            className="w-full h-full border-none"
                            title="Aperçu PDF"
                         />
                      </div>
                    ) : (
                      <div className="flex-grow bg-[#050816]/50 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                         <Smartphone className="w-16 h-16 text-gray-700 mb-6" />
                         <h4 className="text-white font-bold mb-2">Lecture en direct bientôt disponible</h4>
                         <p className="text-gray-500 text-sm max-w-xs">Consultez le syllabus à gauche pour les détails du programme.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}