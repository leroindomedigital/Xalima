import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Formation', path: '/formation' },
    { name: 'Cours universitaires', path: '/cours' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogin = () => {
    alert('Fonctionnalité de connexion à venir !\n\nVous pourrez bientôt vous connecter à votre compte Xalima.');
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate('/register');
  };

  return (
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
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg border border-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu Overlay - Solid, Minimalist & Pro */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-black flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <img src="/logo-xalima.png" alt="Xalima" className="h-6 w-auto" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                <div className="space-y-4">
                  {navLinks.map((link, i) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className={`block py-3 text-xs font-black uppercase tracking-[0.2em] transition-colors ${
                            isActive ? 'text-indigo-400' : 'text-white/40'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center">
                            {isActive && <div className="w-1 h-1 bg-indigo-500 rounded-full mr-3" />}
                            {link.name}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pt-8 space-y-4">
                  <div className="h-px bg-white/5 w-12" />
                  <Button
                    size="lg"
                    className="w-full h-12 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-xl text-[10px]"
                    onClick={handleSignup}
                  >
                    S'inscrire
                  </Button>
                  <button
                    className="w-full h-12 bg-white/5 text-white/60 font-black uppercase tracking-widest rounded-xl text-[10px] border border-white/10"
                    onClick={handleLogin}
                  >
                    Espace membre
                  </button>
                </div>
              </div>

              <div className="p-8 flex justify-center space-x-6">
                {['LinkedIn', 'TikTok', 'Instagram'].map((social) => (
                  <span key={social} className="text-[8px] font-black uppercase tracking-widest text-white/20">{social}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}