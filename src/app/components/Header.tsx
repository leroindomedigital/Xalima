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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="/logo-xalima.png" 
              alt="Xalima" 
              className="h-10 w-auto filter drop-shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
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

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[150] bg-[#020617] lg:hidden flex flex-col p-8 pt-32"
            >
              {/* Close Button Inside Overlay */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-white active:scale-90 transition-transform"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col space-y-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-4xl font-black uppercase tracking-tight ${
                        location.pathname === link.path
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600'
                          : 'text-gray-500 hover:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <div className="h-px bg-white/10 w-full" />
                <div className="flex flex-col gap-4">
                  <Button
                    className="h-16 w-full bg-indigo-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl text-xs"
                    onClick={handleSignup}
                  >
                    Inscription Immédiate
                  </Button>
                  <button
                    className="h-16 w-full bg-white/5 text-gray-400 font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] border border-white/10"
                    onClick={handleLogin}
                  >
                    Accès Membre
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-8 text-gray-500 pt-4">
                  <span className="text-[10px] uppercase font-black tracking-widest hover:text-indigo-400 transition-colors">LinkedIn</span>
                  <span className="text-[10px] uppercase font-black tracking-widest hover:text-indigo-400 transition-colors">TikTok</span>
                  <span className="text-[10px] uppercase font-black tracking-widest hover:text-indigo-400 transition-colors">Instagram</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}