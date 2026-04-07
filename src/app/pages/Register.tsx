import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, GraduationCap, MapPin, 
  Send, ArrowRight, CheckCircle2, ChevronRight,
  Sparkles, ShieldCheck, Globe, AlertCircle, Smartphone
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export function Register() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1); // 1: Info, 2: Payment Choice, 3: Payment Confirmation
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'om' | null>(null);
  const [transactionId, setTransactionId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    city: '',
    interest: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsError(false);
    setErrorMessage('');
    
    try {
      const { error } = await supabase.from('registrations').insert([
        {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          level: formData.level,
          city: formData.city,
          interest: formData.interest,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          status: 'En attente'
        }
      ]);

      if (error) {
        // Fallback for missing columns if not yet migrated
        if (error.code === '42703' || error.message?.includes('column')) {
          const { error: error2 } = await supabase.from('registrations').insert([
            {
              full_name: formData.name,
              email: formData.email,
              phone: formData.phone,
              status: `En attente (${paymentMethod} - ID: ${transactionId})`
            }
          ]);
          if (error2) throw error2;
        } else {
          throw error;
        }
      }

      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3500);
    } catch (err: any) {
      console.error('Erreur inscription:', err);
      setErrorMessage(err.message || 'Erreur inconnue');
      setIsError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Brand & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Rejoignez l'Élite Africaine</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-tight">
                Lancez votre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Carrière Digitale</span>.
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg font-normal">
                Inscrivez-vous dès aujourd'hui pour accéder à nos programmes d'excellence et rejoindre une communauté de +500 étudiants ambitieux.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "Certifications Reconnues", desc: "Diplômes validés par les leaders de l'industrie." },
                { icon: Globe, title: "Accessibilité Totale", desc: "Apprenez partout au Sénégal, à votre propre rythme." },
                { icon: GraduationCap, title: "Mentorat d'Experts", desc: "Suivi personnalisé par des professionnels du secteur." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-600/10 group-hover:border-indigo-500/30 transition-all">
                    <item.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Registration Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#0c1222]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-600/10 transition-colors"></div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-3xl font-black uppercase tracking-tight">Inscription Étudiant</h2>
                        <div className="flex gap-1.5">
                           {[1, 2, 3].map(i => (
                             <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-indigo-500' : 'bg-white/10'}`} />
                           ))}
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {step === 1 && "Complétez vos informations pour démarrer votre parcours."}
                        {step === 2 && "Choisissez votre mode de paiement pour valider l'inscription."}
                        {step === 3 && "Veuillez effectuer le paiement et saisir votre ID de transaction."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Nom Complet</Label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input 
                                  required 
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all" 
                                  placeholder="Amadou Diallo" 
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Email Professionnel</Label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input 
                                  required 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all" 
                                  placeholder="amadou@email.sn" 
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Téléphone (WhatsApp)</Label>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input 
                                  required 
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all" 
                                  placeholder="+221 77 000 00 00" 
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Ville de Résidence</Label>
                              <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input 
                                  required 
                                  name="city"
                                  value={formData.city}
                                  onChange={handleChange}
                                  className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:border-indigo-500 transition-all" 
                                  placeholder="Dakar, Sénégal" 
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Niveau d'étude actuel</Label>
                              <select 
                                required 
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full h-14 bg-[#0c1222] border border-white/10 rounded-2xl px-6 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none cursor-pointer hover:bg-white/5 transition-all"
                              >
                                <option value="">Sélectionner</option>
                                <option value="BAC">BAC</option>
                                <option value="Licence 1">Licence 1</option>
                                <option value="Licence 2">Licence 2</option>
                                <option value="Licence 3">Licence 3</option>
                                <option value="Master 1">Master 1</option>
                                <option value="Master 2">Master 2</option>
                                <option value="Professionnel">Professionnel</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Spécialisation d'intérêt</Label>
                              <select 
                                required 
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full h-14 bg-[#0c1222] border border-white/10 rounded-2xl px-6 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none cursor-pointer hover:bg-white/5 transition-all"
                              >
                                <option value="">Sélectionner</option>
                                <option value="Développement Web">Développement Web</option>
                                <option value="Marketing Digital">Marketing Digital</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Entrepreneuriat">Entrepreneuriat</option>
                                <option value="Design Graphique">Design Graphic</option>
                                <option value="Agrobusiness">Agrobusiness</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="pt-6">
                            <Button
                              type="submit"
                              className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all group"
                            >
                              Continuer vers le Paiement
                              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <button 
                                type="button"
                                onClick={() => { setPaymentMethod('wave'); setStep(3); }}
                                className="p-8 bg-blue-600/10 border-2 border-blue-600/20 rounded-[2rem] hover:border-blue-500 transition-all group text-left relative overflow-hidden"
                              >
                                 <div className="relative z-10">
                                   <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                                      <Globe className="w-6 h-6 text-white" />
                                   </div>
                                   <p className="font-black text-white text-xl uppercase tracking-tighter">WAVE</p>
                                   <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-1">Paiement Mobile Rapide</p>
                                 </div>
                                 <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10" />
                              </button>

                              <button 
                                type="button"
                                onClick={() => { setPaymentMethod('om'); setStep(3); }}
                                className="p-8 bg-orange-600/10 border-2 border-orange-600/20 rounded-[2rem] hover:border-orange-500 transition-all group text-left relative overflow-hidden"
                              >
                                 <div className="relative z-10">
                                   <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                                      <Smartphone className="w-6 h-6 text-white" />
                                   </div>
                                   <p className="font-black text-white text-xl uppercase tracking-tighter">Orange Money</p>
                                   <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest mt-1">Paiement Sécurisé</p>
                                 </div>
                                 <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10" />
                              </button>
                           </div>

                           <button 
                             type="button"
                             onClick={() => setStep(1)}
                             className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest mx-auto"
                           >
                              <ChevronRight className="w-4 h-4 rotate-180" />
                              Retour aux informations
                           </button>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                           <div className={`p-8 rounded-[2rem] border-2 ${paymentMethod === 'wave' ? 'bg-blue-600/5 border-blue-500/20' : 'bg-orange-600/5 border-orange-500/20'}`}>
                              <h4 className="text-lg font-black uppercase tracking-tight text-white mb-4">Instructions de paiement</h4>
                              
                              <div className="space-y-4">
                                 <div className="flex items-center gap-4">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${paymentMethod === 'wave' ? 'bg-blue-500' : 'bg-orange-500'}`}>1</div>
                                   <p className="text-sm text-gray-100 italic">
                                     {paymentMethod === 'wave' 
                                       ? "Ouvrez votre application WAVE sur mobile." 
                                       : "Composez le #144# sur votre téléphone."}
                                   </p>
                                 </div>
                                 <div className="flex items-center gap-4">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${paymentMethod === 'wave' ? 'bg-blue-500' : 'bg-orange-500'}`}>2</div>
                                   <p className="text-sm text-gray-100">
                                      Payez le montant total de la formation au numéro : <br />
                                      <span className="font-black text-xl tracking-wider text-white">+221 77 862 70 67</span>
                                   </p>
                                 </div>
                                 <div className="flex items-center gap-4">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${paymentMethod === 'wave' ? 'bg-blue-500' : 'bg-orange-500'}`}>3</div>
                                   <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                                      Note : Les frais d'envoi sont à la charge de l'étudiant.
                                   </p>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">ID de Transaction (ID reçu par SMS)</Label>
                              <Input 
                                required 
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="h-14 bg-white/5 border-white/10 rounded-2xl focus:border-indigo-500 transition-all text-center font-black tracking-[0.2em]" 
                                placeholder="Ex: S-10293847" 
                              />
                              <p className="text-[9px] text-gray-500 italic text-center">Indiquez l'ID de transaction pour que l'admin puisse valider votre accès.</p>
                           </div>

                           <div className="flex flex-col gap-4">
                              <Button
                                type="submit"
                                disabled={!transactionId}
                                className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-50"
                              >
                                Finaliser mon Inscription
                              </Button>
                              <button 
                                type="button"
                                onClick={() => setStep(2)}
                                className="text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
                              >
                                Changer de mode de paiement
                              </button>
                           </div>
                        </motion.div>
                      )}

                      {isError && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>Erreur lors de l'inscription. Veuillez réessayer.</span>
                          </div>
                          {errorMessage && (
                            <span className="text-red-400/70 font-normal pl-8 break-all">{errorMessage}</span>
                          )}
                        </div>
                      )}

                      <p className="text-[10px] text-center text-gray-500 font-medium uppercase tracking-widest">
                        En vous inscrivant, vous acceptez nos <Link to="#" className="text-indigo-400 hover:underline">conditions d'utilisation</Link>.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mb-8">
                       <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Bienvenue sur Xalima !</h2>
                    <p className="text-gray-400 text-lg max-w-sm mb-10 leading-relaxed">
                      Votre inscription a été enregistrée avec succès. Vous allez être redirigé vers votre espace d'apprentissage.
                    </p>
                    <div className="flex items-center space-x-3 text-indigo-400 font-black uppercase tracking-widest text-xs">
                       <span>Redirection en cours</span>
                       <motion.div
                         animate={{ x: [0, 5, 0] }}
                         transition={{ repeat: Infinity, duration: 1 }}
                       >
                         <ChevronRight className="w-4 h-4" />
                       </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
