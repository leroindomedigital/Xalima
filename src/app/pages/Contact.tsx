import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, MessageSquare, Facebook, Twitter, Linkedin, Instagram, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const Tiktok = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2">
    <circle cx="8" cy="18" r="4"/>
    <path d="M12 18V2l7 4"/>
  </svg>
);

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Centered v1 style */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>Support sénégalais 24/7</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.95] tracking-[0.02em] uppercase">
              Parlons de <br /> votre <span className="text-indigo-500">succès</span>.
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-normal">
              Que vous soyez étudiant ou professionnel, notre équipe à Dakar est là pour propulser vos ambitions avec expertise.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-8"
          >
            {[
              { icon: Mail, label: "Email", value: "xalimacour@gmail.com" },
              { icon: Phone, label: "Téléphone", value: "+221 77 862 70 67" },
              { icon: MapPin, label: "Localisation", value: "Dakar, Sénégal" }
            ].map((item, i) => (
              <div key={i} className="flex items-center p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-indigo-500/30 transition-all">
                <div className="bg-indigo-600/10 p-4 rounded-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="ml-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                  <p className="text-base font-bold text-white">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-white/5">
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram, Tiktok].map((Icon, i) => (
                  <a key={i} href="#" className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-indigo-600 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? ( // Changed from !isSubmitting to !isSubmitted to match state variable
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10 bg-white/5 p-10 lg:p-16 rounded-[2rem] border border-white/10"
                >
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-black mb-4 uppercase tracking-tight">Envoyez un message</h2>
                    <p className="text-lg text-gray-500 font-normal">Réponse garantie en moins de 24 heures.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                          Nom Complet
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jean Diouf"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-700 focus:border-indigo-500 rounded-xl font-bold"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                          Email Professionnel
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean@exemple.sn"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-700 focus:border-indigo-500 rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                        Votre Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Comment pouvons-nous vous aider ?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-700 focus:border-indigo-500 rounded-xl font-bold resize-none p-4"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-16 bg-indigo-600 text-white hover:bg-indigo-700 font-black text-lg uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-3"
                    >
                      <span>ENVOYER</span>
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-20 bg-indigo-600/10 rounded-[2rem] border border-indigo-500/20"
                >
                  <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tight">Message Envoyé !</h2>
                  <p className="text-lg text-gray-400 max-w-sm mx-auto leading-relaxed font-normal">
                    Merci, <span className="text-white font-bold">{formData.name}</span>. <br /> 
                    Nous vous répondrons très bientôt.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}