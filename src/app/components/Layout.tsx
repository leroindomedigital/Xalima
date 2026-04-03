import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from './Header';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { XalimaChat } from './XalimaChat';

const TiktokIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="18" r="4"/>
    <path d="M12 18V2l7 4"/>
  </svg>
);

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
              <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Nous Suivre</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61586029179039", label: "Facebook" },
                  { Icon: Twitter, href: "https://x.com/xalima2026", label: "Twitter" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/xalimaa/about/?viewAsMember=true", label: "LinkedIn" },
                  { Icon: Instagram, href: "https://www.instagram.com/xali_ma2026/", label: "Instagram" },
                  { Icon: TiktokIcon, href: "https://www.tiktok.com/@xalimacour1?lang=fr", label: "TikTok" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-white/5 p-2.5 rounded-xl border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 transition-all"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
                  </a>
                ))}
              </div>
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
      <XalimaChat />
    </div>
  );
}
