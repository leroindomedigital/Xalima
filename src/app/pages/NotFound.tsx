import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo/Icon Area */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full" />
              <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl relative">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4 drop-shadow-2xl">
            404
          </h1>
          
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4">
              Page <span className="text-indigo-400">introuvable</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto italic font-medium">
               Désolé, mais la connaissance que vous cherchez n'est pas encore disponible ou le chemin a changé.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
               onClick={() => navigate('/')}
               className="h-16 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
            >
               <Home className="w-4 h-4" />
               Retour à l'accueil
            </Button>
            <Button 
               variant="outline"
               onClick={() => navigate(-1)}
               className="h-16 px-8 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 active:scale-95 transition-all"
            >
               <ArrowLeft className="w-4 h-4" />
               Page précédente
            </Button>
          </div>

          {/* Platform Footer */}
          <div className="mt-20 flex items-center justify-center gap-2 opacity-30">
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Plateforme XALIMA</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
