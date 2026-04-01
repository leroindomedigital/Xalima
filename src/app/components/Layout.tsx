import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-black">
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#020617] border-t border-white/5 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="space-y-6">
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter">XALIMA</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-normal">
                La plateforme de référence pour la formation digitale et l'excellence académique au Sénégal.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-4">
                {['Accueil', 'Formation', 'Cours universitaires', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={item === 'Accueil' ? '/' : `/${item.toLowerCase().split(' ')[0]}`} className="text-gray-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Ressources</h4>
              <ul className="space-y-4">
                {['À propos', 'Blog', 'FAQ', 'Aide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Légal</h4>
              <ul className="space-y-4">
                {['Conditions', 'Confidentialité', 'Mentions'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 XALIMA. CONSTRUIT POUR L'AVENIR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
