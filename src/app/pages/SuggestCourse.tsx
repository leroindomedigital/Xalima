import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, User, BookOpen, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function SuggestCourse() {
  const [formData, setFormData] = useState({ name: '', email: '', title: '', reason: '' });
  const [isSent, setIsSent] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError('');

    try {
      const response = await fetch("https://formsubmit.co/ajax/xalimacour@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `[Suggestion Cours] ${formData.title}`,
            Nom: formData.name,
            Email: formData.email,
            Titre_Suggéré: formData.title,
            Raison: formData.reason,
            _template: "table"
        })
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: '', email: '', title: '', reason: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-3 bg-indigo-600/10 rounded-xl mb-8"
          >
            <Sparkles className="h-6 w-6 text-indigo-400" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl font-black mb-8 leading-[0.95] tracking-[0.02em] uppercase">
            Aidez-nous à <br />
            <span className="text-indigo-500">façonner l'avenir</span>.
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-normal mb-8">
            Vous avez une idée de cours qui pourrait changer des vies ? Partagez-la avec nous et contribuons ensemble à l'excellence au Sénégal.
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
          <CardHeader className="p-10 border-b border-white/5">
            <CardTitle className="text-2xl font-black uppercase tracking-tight text-white text-center">Votre Suggestion</CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-indigo-400" /> Nom Complet
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 font-bold outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-indigo-400" /> Email Professionnel
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 font-bold outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" /> Titre du Cours Suggéré
                </label>
                <input 
                  type="text" 
                  name="title"
                  required 
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Intelligence Artificielle au Sénégal"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 font-bold outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-indigo-400" /> Pourquoi ce cours est important ?
                </label>
                <textarea 
                  required 
                  name="reason"
                  rows={4}
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Décrivez brièvement l'impact attendu..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 font-bold outline-none transition-all resize-none"
                />
              </div>

              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Suggestion envoyée avec succès à l'équipe Xalima !</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold"
                  >
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                type="submit" 
                disabled={isSending}
                className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg uppercase tracking-widest rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                {isSending ? 'ENVOI EN COURS...' : 'ENVOYER'}
              </Button>

              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                Suggestion envoyée à <span className="text-indigo-400">xalimacour@gmail.com</span>
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-16 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2026 XALIMA. L'EXCELLENCE SÉNÉGALAISE.</p>
        </div>
      </motion.div>
    </div>
  );
}
