import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Auth bypass for rapid management
    setTimeout(() => {
      navigate('/admin', { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Immersive Background Particles/Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        {/* Left Side: Branding/Identity */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 text-center md:text-left hidden md:block"
        >
           <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-indigo-400 text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl backdrop-blur-md">
              <ShieldCheck className="w-5 h-5" />
              <span>Identity Service</span>
           </div>
           
           <h1 className="text-7xl font-black leading-tight tracking-tighter mb-8 uppercase cursor-default">
              Accédez à <br />
              votre <span className="text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">Console</span>
           </h1>
           
           <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed mb-12">
              Gérez vos contenus académiques, suivez les inscriptions et pilotez l'avenir de Xalima en un seul endroit.
           </p>

           <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest"
           >
              <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                 <ChevronLeft className="w-5 h-5" />
              </div>
              Retour au site
           </button>
        </motion.div>

        {/* Right Side: Login Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#0c1222]/80 border border-white/10 rounded-[3rem] p-10 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden group">
            {/* Logo pulses in bg */}
            <div className="absolute -top-12 -right-12 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
               <GraduationCap className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-10">
               <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Connexion</h2>
                  <div className="h-1.5 w-12 bg-indigo-600 rounded-full mb-8 mx-auto md:mx-0" />
               </div>

               <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Console d'administration</Label>
                    <div className="relative group/input">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-indigo-500 transition-colors" />
                       <Input 
                         required
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="h-16 bg-white/5 border-white/5 rounded-2xl pl-14 focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-semibold placeholder:text-gray-600 border-b-2 border-b-white/5 text-lg" 
                         placeholder="admin@xalima.sn" 
                       />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Clef d'accès</Label>
                    <div className="relative group/input">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-indigo-500 transition-colors" />
                       <Input 
                         required
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="h-16 bg-white/5 border-white/5 rounded-2xl pl-14 focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-semibold placeholder:text-gray-600 border-b-2 border-b-white/5 text-lg" 
                         placeholder="••••••••" 
                       />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-16 bg-white hover:bg-white/90 text-[#020617] font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl active:scale-[0.98] transition-all group mt-4 overflow-hidden"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-[#020617] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>Lancer la Session</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
               </form>
            </div>
          </div>

          {/* Helper Footnote */}
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.5 }}
             className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
          >
             © 2026 leroindomedigital · Système de Gestion Intégré
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
