import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, GraduationCap, ChevronLeft, AlertCircle, User, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as any)?.from?.pathname;
  const initialMode = (location.state as any)?.mode;

  useEffect(() => {
    if (initialMode === 'register') {
      setIsRegister(true);
    }
  }, [initialMode]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isRegister) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });

        if (signUpError) throw signUpError;
        
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({ 
              id: data.user.id, 
              full_name: fullName,
              role: 'student' 
            });
          
          if (profileError) console.error("Profile creation error:", profileError.message);
          
          setSuccess("Compte créé ! Vous pouvez maintenant vous connecter.");
          setIsRegister(false);
        }
      } else {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;

        const isAdmin = email.toLowerCase() === 'leroindomedigital@gmail.com';
        
        if (isAdmin) {
          navigate('/admin', { replace: true });
        } else {
          navigate(from || '/', { replace: true });
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err.message);
      setError(err.message === 'User already registered' ? "Cet email est déjà utilisé." : "Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16 relative z-10">
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 hidden md:block"
        >
           <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-indigo-400 text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-2xl backdrop-blur-md">
              <Sparkles className="w-5 h-5" />
              <span>Xalima Ecosystem</span>
           </div>
           
           <h1 className="text-7xl font-black leading-tight tracking-tighter mb-8 uppercase cursor-default">
              {isRegister ? "Créez votre" : "Accédez à"} <br />
              <span className="text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">{isRegister ? "Avenir" : "Espace"}</span>
           </h1>
           
           <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed mb-12">
              Rejoignez l'élite académique du Sénégal. Accédez à vos cours, suivez vos formations et certifiez vos compétences.
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

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#0c1222]/80 border border-white/10 rounded-[3rem] p-10 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <div className="mb-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-2">{isRegister ? "S'Inscrire" : "Connexion"}</h2>
                    <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
                  </div>
                  <GraduationCap className="w-12 h-12 text-white/20" />
               </div>

               <form onSubmit={handleAuth} className="space-y-6">
                  <AnimatePresence mode="wait">
                     {error && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 font-bold flex gap-3 items-center backdrop-blur-md">
                           <AlertCircle className="w-4 h-4 shrink-0" />
                           <span>{error}</span>
                        </motion.div>
                     )}
                     {success && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-400 font-bold flex gap-3 items-center backdrop-blur-md">
                           <ShieldCheck className="w-4 h-4 shrink-0" />
                           <span>{success}</span>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {isRegister && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Nom Complet</Label>
                      <div className="relative group/input">
                         <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-indigo-500 transition-colors" />
                         <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-16 bg-white/5 border-white/5 rounded-2xl pl-14 focus:border-indigo-500/50 transition-all font-semibold" placeholder="Ex: Mohamed Sylla" />
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email</Label>
                    <div className="relative group/input">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-indigo-500 transition-colors" />
                       <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-16 bg-white/5 border-white/5 rounded-2xl pl-14 focus:border-indigo-500/50 transition-all font-semibold" placeholder="votre@email.sn" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Mot de passe</Label>
                    <div className="relative group/input">
                       <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-indigo-500 transition-colors" />
                       <Input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-16 bg-white/5 border-white/5 rounded-2xl pl-14 focus:border-indigo-500/50 transition-all font-semibold" placeholder="••••••••" />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-16 bg-white text-[#020617] font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl active:scale-[0.98] transition-all group mt-6">
                    {loading ? <div className="w-6 h-6 border-2 border-[#020617] border-t-transparent rounded-full animate-spin mx-auto" /> : (
                      <div className="flex items-center justify-center gap-3">
                        <span>{isRegister ? "Devenir membre" : "Lancer la Session"}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  <div className="pt-6 text-center">
                    <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-400 transition-colors">
                      {isRegister ? "Déjà un compte ? Se connecter" : "Nouveau ? Créer un profil Xalima"}
                    </button>
                  </div>
               </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
