import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BookOpen, GraduationCap, Award, Users, ArrowRight, CheckCircle2, 
  Star, Zap, Play, Sparkles, Globe, ShieldCheck, Rocket, 
  MessageSquare, ChevronRight, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: any = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: GraduationCap,
      title: "Cursus Complet",
      desc: "De la licence au master, des ressources validées par l'UCAD et l'UGB.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Booster Digital",
      desc: "Formations intensives en Tech, Marketing et Business pour le marché local.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Certifications",
      desc: "Obtenez des certificats reconnus pour valoriser votre CV.",
      color: "from-indigo-600 to-indigo-400"
    }
  ];

  const testimonials = [
    {
      name: "Abdoulaye Diallo",
      role: "Étudiant en Master, UCAD",
      content: "Xalima a littéralement sauvé mon année. Les résumés de cours sont d'une clarté exceptionnelle.",
      image: "/images/illustrations/students_premium.png"
    },
    {
      name: "Mariama Sarr",
      role: "Développeuse Junior",
      content: "La formation en Développement Web m'a permis de décrocher mon premier stage en 3 mois.",
      image: "/images/illustrations/coding_premium.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden" ref={scrollRef}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Professional Institutional Hero */}
      <section className="relative min-h-[95vh] flex items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#020617]">
        {/* Subtle Background Text Layer */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 opacity-[0.02] pointer-events-none">
          <h1 className="text-[25rem] font-black tracking-tighter uppercase whitespace-nowrap select-none">EXCELLENCE</h1>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Grounded Narrative */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-12"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Établissement Supérieur d'Élite</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl sm:text-7xl lg:text-8xl font-black leading-[1.1] sm:leading-[1.05] tracking-tight"
                >
                  Bâtir le <br /> 
                  <span className="text-white">Sénégal de Demain</span>.
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed font-normal italic border-l-2 border-indigo-500/30 pl-4 sm:pl-6"
                >
                  L'alliance de l'excellence académique et de la maîtrise technologique pour propulser votre carrière au sommet.
                </motion.p>
              </div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-0"
              >
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-14 px-6 md:px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm md:text-base shadow-xl shadow-indigo-600/20 transition-all tracking-wider"
                  >
                    S'INSCRIRE MAINTENANT
                  </Button>
                </Link>
                <Link to="/cours" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-6 md:px-8 bg-white/5 border-indigo-600 text-white hover:bg-indigo-600/10 rounded-xl font-bold text-sm md:text-base transition-all tracking-wider"
                  >
                    PORTAIL ÉTUDIANT
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Institutional Power Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(79,70,229,0.1)] group">
                <ImageWithFallback
                  src="/images/illustrations/students_hero_new.jpg"
                  alt="Xalima Campus"
                  className="w-full h-[700px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                
                {/* Fixed Trust Badge */}
                <div className="absolute bottom-12 left-12 right-12 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-black uppercase tracking-wider">Accréditation d'État</div>
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Sénégal Numérique 2030</div>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-white/10" />
                    <div className="text-right">
                      <div className="text-indigo-400 font-bold">100%</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest">Taux de Réussite</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimalist Institutional Stats Bar */}
      <section className="py-12 sm:py-32 bg-[#020617] relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Users,
                value: "+500", 
                label: "Étudiants actifs" 
              },
              { 
                icon: Award,
                value: "50+", 
                label: "Formations disponibles" 
              },
              { 
                icon: BookOpen,
                value: "+100", 
                label: "Cours universitaires" 
              },
              { 
                icon: CheckCircle2,
                value: "95%", 
                label: "Taux de satisfaction" 
              }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-[#0c1222] border border-white/5 flex items-center justify-between group hover:border-indigo-500/20 transition-all duration-500"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/10 transition-colors">
                    <stat.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-white text-sm font-black tracking-wider uppercase">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Services - Refined 2-Column Grid */}
      <section className="py-20 sm:py-48 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-6xl font-black leading-tight tracking-tight uppercase">
              Nos <span className="text-indigo-500">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Card 1: Formations Numériques */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] bg-[#0c1222] border border-white/10 flex flex-col space-y-10 group hover:border-indigo-500/30 transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/10 transition-colors">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">Formations <br /> Numériques</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Accédez à des formations professionnelles de qualité avec certifications à la clé
                </p>
              </div>

              <ul className="space-y-5 flex-grow">
                {[
                  "Marketing numérique",
                  "Informatique et développement",
                  "Entrepreneuriat",
                  "Bureautique"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-gray-200 font-bold">
                    <div className="w-5 h-5 rounded-full border border-indigo-500 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/formation">
                <Button className="w-full h-16 bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl font-black text-lg uppercase tracking-wide transition-all shadow-xl shadow-indigo-600/20">
                  Voir les formations
                </Button>
              </Link>
            </motion.div>

            {/* Card 2: Cours Universitaires Gratuits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-12 rounded-[3rem] bg-[#0c1222] border border-white/10 flex flex-col space-y-10 group hover:border-indigo-500/30 transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/10 transition-colors">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tight leading-none">Cours <br /> Universitaires Gratuits</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Des ressources pédagogiques gratuites pour les étudiants des universités publiques
                </p>
              </div>

              <ul className="space-y-5 flex-grow">
                {[
                  "Cours PDF téléchargeables",
                  "Vidéos explicatives",
                  "Géographie, Histoire et plus",
                  "Résumés et supports pédagogiques"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4 text-gray-200 font-bold">
                    <div className="w-5 h-5 rounded-full border border-indigo-500 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/cours">
                <Button variant="outline" className="w-full h-16 bg-transparent border-indigo-600 text-white hover:bg-indigo-600/10 rounded-2xl font-black text-lg uppercase tracking-wide transition-all">
                  Accéder aux cours
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Localized Case Study - High Professional Style */}
      <section className="py-48 px-4 sm:px-6 lg:px-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 order-2 lg:order-1">
              <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em]">
                Impact National : Horizon 2030
              </Badge>
              <h2 className="text-5xl sm:text-7xl font-black leading-[1.1] tracking-tight">
                 Forger le leadership <br />
                 dans les <span className="text-indigo-500">nouveaux métiers</span>.
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed font-normal italic border-l-2 border-indigo-500/30 pl-8">
                "Nous ne formons pas seulement des diplômés, nous préparons les architectes de la souveraineté numérique du Sénégal."
              </p>
              
              <div className="grid sm:grid-cols-2 gap-10 pt-4">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-black text-white uppercase tracking-widest text-sm">Praticité Directe</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Contenus de pointe, immédiatement applicables sur le marché Africain.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-black text-white uppercase tracking-widest text-sm">Mobilité Totale</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Étudiez librement selon votre rythme, où que vous soyez au pays.</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl h-[600px]">
                <ImageWithFallback
                  src="/images/illustrations/professional_meeting.jpg"
                  alt="Formation Professionnelle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay" />
                <div className="absolute bottom-10 left-10 p-10 bg-black/60 backdrop-blur-3xl rounded-[3rem] border border-white/10 max-w-sm">
                   <div className="text-4xl font-black text-white mb-2">100%</div>
                   <div className="text-indigo-400 text-xs font-bold uppercase tracking-[0.4em]">Adaptabilité Marché</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Testimonials - Real Voice */}
      <section className="py-40 px-4 bg-gradient-to-b from-[#020617] to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/3 space-y-8">
              <h2 className="text-5xl font-black tracking-tight uppercase">Témoignages de <br /> <span className="text-indigo-500">l'Excellence</span>.</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Rejoignez une communauté d'ambitieux qui redéfinissent les limites du possible au Sénégal.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="h-14 w-14 rounded-full border-white/10 text-white"><ArrowRight className="rotate-180" /></Button>
                <Button className="h-14 w-14 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"><ArrowRight /></Button>
              </div>
            </div>
            
            <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden group">
                  <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-indigo-600/10 blur-3xl rounded-full"></div>
                  <MessageSquare className="w-12 h-12 text-indigo-500 mb-10 opacity-50" />
                  <p className="text-2xl font-medium text-gray-200 mb-12 leading-relaxed italic">"{t.content}"</p>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/30">
                      <ImageWithFallback src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-black text-xl text-white">{t.name}</div>
                      <div className="text-gray-500 font-bold text-sm uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}