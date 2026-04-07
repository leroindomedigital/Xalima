import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/formation' },
    { name: 'Cours Universitaires', path: '/cours' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate('/login', { state: { mode: 'register' } });
  };

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/5 bg-[#020617]/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="/logo-xalima.png" 
              alt="Xalima" 
              className="h-8 sm:h-10 w-auto filter drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-gray-500 hover:text-indigo-400'
                  }`}
                >
                  {link.name}
                </Link>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-indigo-500"
                  />
                )}
              </motion.div>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-[10px] font-black uppercase text-white">
                       {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                       {profile?.full_name || 'Utilisateur'}
                    </span>
                 </div>
                 <button 
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-rose-400 transition-colors"
                    title="Déconnexion"
                 >
                    <LogOut size={18} />
                 </button>

                 {user.email === 'leroindomedigital@gmail.com' && (
                    <Link to="/admin">
                       <Button size="sm" className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600 hover:text-white px-4">
                          Console Admin
                       </Button>
                    </Link>
                 )}
              </div>
            ) : (
              <>
                <button
                  className="text-[10px] font-bold tracking-[0.2em] text-gray-500 hover:text-white transition-colors cursor-pointer px-4 py-2"
                  onClick={handleSignup}
                >
                  Inscription
                </button>
                <Button
                  className="h-10 px-6 bg-indigo-600 border-none text-white hover:bg-indigo-700 transition-all duration-300 rounded-lg font-bold text-[10px] tracking-[0.2em] cursor-pointer active:scale-95"
                  onClick={handleLogin}
                >
                  Connexion
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg border border-white/5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>
    </header>

    {/* Full Screen Mobile Menu Overlay */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-6 h-[100dvh]"
        >
          {/* Close button at top right */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-3 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
          >
            <X size={28} />
          </button>
          
          <img src="/logo-xalima.png" alt="Xalima" className="h-12 w-auto absolute top-8 left-6 filter drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]" />

          {/* Huge Main Links - Center of screen */}
          <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8 my-auto">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, type: "spring" }}
                >
                  <Link
                    to={link.path}
                    className="relative group flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={`text-3xl font-black uppercase tracking-widest transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-mobile-link"
                        className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Call to Action Buttons */}
          <div className="w-full max-w-sm space-y-4 mb-8">
            {user ? (
               <div className="text-center space-y-6">
                  <div className="space-y-1">
                     <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Connecté en tant que</p>
                     <p className="text-white text-2xl font-black uppercase tracking-tight">{profile?.full_name || 'Utilisateur'}</p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full h-16 bg-white/5 border border-white/10 text-rose-400 font-black uppercase tracking-[0.2em] rounded-2xl text-xs"
                    onClick={handleSignOut}
                  >
                    Se déconnecter
                  </Button>
               </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-4">
                <Button
                  size="lg"
                  className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl text-xs shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all"
                  onClick={handleSignup}
                >
                  S'inscrire maintenant
                </Button>
                <button
                  className="w-full py-4 text-gray-500 font-black uppercase tracking-widest text-[10px]"
                  onClick={handleLogin}
                >
                  Déjà membre ? Se connecter
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}