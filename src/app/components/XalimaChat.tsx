import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Message = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
};

const XALIMA_BRAIN: Record<string, { answer: string; quickReplies?: string[] }> = {
  'bonjour': {
    answer: "👋 Bonjour ! Je suis **JAMRA**, votre assistant Xalima. Comment puis-je vous aider aujourd'hui ?",
    quickReplies: ["📚 Voir les formations", "🎓 Cours universitaires", "💰 Tarifs", "📝 S'inscrire"]
  },
  'salut': {
    answer: "👋 Salut ! Bienvenue sur Xalima, la plateforme d'excellence sénégalaise. Que souhaitez-vous savoir ?",
    quickReplies: ["📚 Voir les formations", "🎓 Cours universitaires", "💰 Tarifs", "📝 S'inscrire"]
  },
  'formations': {
    answer: "🚀 Xalima propose **plus de 25 formations** dans plusieurs domaines :\n\n• Marketing Digital\n• Développement Web Full Stack\n• Design Graphique\n• Entrepreneuriat & Business\n• Data Science & IA\n• Cybersécurité\n• Et bien plus encore !\n\nToutes nos formations sont **certifiantes** et conçues par des experts.",
    quickReplies: ["💰 Combien ça coûte ?", "⏱ Quelle durée ?", "📝 S'inscrire maintenant", "🎓 Cours gratuits aussi ?"]
  },
  'cours universitaires': {
    answer: "🎓 Nos **Cours Universitaires sont 100% GRATUITS** !\n\nNous couvrons toutes les universités publiques du Sénégal :\n• **UCAD** - Université Cheikh Anta Diop\n• **UGB** - Université Gaston Berger\n• **UASZ** - Université Assane Seck\n\nDomaines : Sciences & Tech, Droit, Médecine, Lettres, Économie...",
    quickReplies: ["📥 Comment accéder ?", "📚 Quelles filières ?", "📝 S'inscrire", "💰 Formations payantes"]
  },
  'tarifs': {
    answer: "💰 Voici nos **tarifs** :\n\n🟢 **Cours Universitaires** → Gratuit!\n🔵 **Formations Pro** → 25 000 à 70 000 FCFA\n🟣 **Spécialisations** → 75 000 à 120 000 FCFA\n⭐ **Programmes Master** → 145 000 à 180 000 FCFA\n\nPaiement en plusieurs fois disponible !",
    quickReplies: ["📝 S'inscrire", "📚 Voir les formations", "📞 Nous contacter"]
  },
  'inscription': {
    answer: "📝 Pour vous **inscrire**, c'est très simple :\n\n1️⃣ Cliquez sur **\"Inscription\"** en haut de la page\n2️⃣ Remplissez vos informations (nom, email, téléphone...)\n3️⃣ Choisissez votre formation\n4️⃣ Vous recevrez une confirmation par email !\n\nEnviron **5 minutes** suffisent ✅",
    quickReplies: ["💰 Combien ça coûte ?", "📞 Contacter l'équipe", "🎓 Cours gratuits d'abord"]
  },
  'durée': {
    answer: "⏱ **Durées de nos formations** :\n\n• Formations Pro : **4 à 12 semaines**\n• Spécialisations : **12 à 16 semaines**\n• Programmes Master : **6 à 8 mois**\n\nVous apprenez **à votre rythme**, sans contrainte de temps ! 100% en ligne.",
    quickReplies: ["💰 Tarifs", "📝 S'inscrire", "📞 Nous contacter"]
  },
  'contact': {
    answer: "📞 **Contactez-nous** :\n\n📧 Email : xalimacour@gmail.com\n📱 Téléphone : +221 77 862 70 67\n📍 Localisation : Dakar, Sénégal\n\n💬 Réponse garantie en moins de **24 heures** !",
    quickReplies: ["📝 S'inscrire", "📚 Voir les formations"]
  },
  'certificat': {
    answer: "🏆 **Oui, toutes nos formations sont certifiantes !**\n\nNos certificats sont reconnus par les entreprises leaders au Sénégal et en Afrique de l'Ouest.\n\nUn diplôme Xalima, c'est votre passeport vers de meilleures opportunités professionnelles 🚀",
    quickReplies: ["📝 S'inscrire", "💰 Tarifs", "📚 Voir les formations"]
  },
  'paiement': {
    answer: "💳 **Modalités de paiement** :\n\n✅ Paiement en ligne sécurisé\n✅ Mobile Money (Wave, Orange Money)\n✅ Virement bancaire\n✅ Paiement en **2 ou 3 fois** pour les formations longues\n\nPour discuter d'un paiement personnalisé, contactez-nous !",
    quickReplies: ["📞 Nous contacter", "💰 Voir les tarifs", "📝 S'inscrire"]
  },
  'default': {
    answer: "🤔 Je n'ai pas bien compris votre question. Voici ce que je peux vous expliquer :",
    quickReplies: ["📚 Nos formations", "🎓 Cours gratuits", "💰 Tarifs", "📝 S'inscrire", "📞 Contact"]
  }
};

function getBotResponse(input: string): { answer: string; quickReplies?: string[] } {
  const lower = input.toLowerCase();
  if (lower.includes('bonjour') || lower.includes('bonsoir') || lower.includes('hello') || lower.includes('hi')) return XALIMA_BRAIN['bonjour'];
  if (lower.includes('salut')) return XALIMA_BRAIN['salut'];
  if (lower.includes('formation') || lower.includes('cours payant') || lower.includes('programme')) return XALIMA_BRAIN['formations'];
  if (lower.includes('universitaire') || lower.includes('ucad') || lower.includes('ugb') || lower.includes('uasz') || lower.includes('gratuit')) return XALIMA_BRAIN['cours universitaires'];
  if (lower.includes('prix') || lower.includes('tarif') || lower.includes('coût') || lower.includes('combien') || lower.includes('fcfa')) return XALIMA_BRAIN['tarifs'];
  if (lower.includes('inscription') || lower.includes('inscrire') || lower.includes('rejoindre') || lower.includes('comment')) return XALIMA_BRAIN['inscription'];
  if (lower.includes('durée') || lower.includes('duree') || lower.includes('temps') || lower.includes('semaine') || lower.includes('mois')) return XALIMA_BRAIN['durée'];
  if (lower.includes('contact') || lower.includes('email') || lower.includes('téléphone') || lower.includes('appel')) return XALIMA_BRAIN['contact'];
  if (lower.includes('certificat') || lower.includes('diplôme') || lower.includes('reconnu')) return XALIMA_BRAIN['certificat'];
  if (lower.includes('paiement') || lower.includes('payer') || lower.includes('wave') || lower.includes('orange money')) return XALIMA_BRAIN['paiement'];
  return XALIMA_BRAIN['default'];
}

function formatText(text: string) {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
  });
}

export function XalimaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'bot',
      text: "👋 Bonjour ! Je suis **JAMRA**, votre assistant Xalima. Comment puis-je vous aider ?",
      quickReplies: ["📚 Voir les formations", "🎓 Cours universitaires", "💰 Tarifs", "📝 S'inscrire"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      // 1. Check Hardcoded Brain First
      let response = getBotResponse(text);
      let answer = response.answer;
      let quickReplies = response.quickReplies;

      // 2. If it's a default response, try the Database Knowledge Base
      if (answer === XALIMA_BRAIN['default'].answer) {
        try {
          const { data: kbItems } = await supabase
            .from('chatbot_knowledge')
            .select('*');
          
          if (kbItems) {
            const lowerText = text.toLowerCase();
            // Find a match where any keyword is in the user text
            const match = kbItems.find(item => {
              const keywords = item.question_trigger.toLowerCase().split(',').map((k: string) => k.trim());
              return keywords.some((k: string) => lowerText.includes(k) && k.length > 2);
            });

            if (match) {
              answer = match.content;
              quickReplies = ["❓ Autre question", "📚 Voir formations"];
            }
          }
        } catch (err) {
          console.error("Chatbot KB Error:", err);
        }
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        from: 'bot',
        text: answer,
        quickReplies: quickReplies
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-[200] w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-indigo-400/30"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-black text-white border-2 border-[#020617]">1</span>
            )}
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[200] w-[350px] sm:w-[380px] max-h-[85vh] flex flex-col bg-[#0a0f1e] border border-white/10 rounded-[2rem] shadow-2xl shadow-indigo-900/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-blue-600 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-wider">JAMRA</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Assistant Xalima</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" style={{ maxHeight: '50vh' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-1 ${msg.from === 'bot' ? 'bg-indigo-600' : 'bg-white/10'}`}>
                    {msg.from === 'bot' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-gray-300" />}
                  </div>
                  <div className={`max-w-[75%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm space-y-1 ${
                      msg.from === 'bot'
                        ? 'bg-white/5 border border-white/10 text-gray-100 rounded-tl-none'
                        : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}>
                      {formatText(msg.text)}
                    </div>
                    {/* Quick Replies */}
                    {msg.quickReplies && msg.from === 'bot' && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((qr, i) => (
                          <button
                            key={i}
                            onClick={() => sendMessage(qr)}
                            className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/40 transition-colors whitespace-nowrap"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-[#0c1222] shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 outline-none font-medium"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-11 h-11 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
              <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-2">Xalima Assistant IA · Plateforme d'Excellence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
