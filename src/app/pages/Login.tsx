import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Accès Sécurisé Xalima</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Connexion</h1>
          <p className="text-gray-500 text-sm">Entrez vos identifiants pour accéder à votre console.</p>
        </div>

        <div className="bg-[#0c1222] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all font-medium placeholder:text-gray-500" 
                  placeholder="admin@xalima.sn" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all font-medium placeholder:text-gray-500" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 font-bold flex gap-3 items-center"
              >
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all group overflow-hidden"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>Accéder à la console</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Besoin d'aide ? <span className="text-indigo-400 cursor-pointer">Contacter le support technique</span>
            </p>
        </div>
      </motion.div>
    </div>
  );
}
