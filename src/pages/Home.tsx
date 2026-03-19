import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Leaf, Activity, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
            alt="Nature and Engineering"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-sm border border-emerald-500/30 text-sm font-semibold tracking-wider uppercase mb-6">
              Dal 1987
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Ingegneria e Architettura <br className="hidden md:block" />
              <span className="text-emerald-400">Ambientale</span>
            </h1>
            <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
              Progettazione, consulenza e valutazione per uno sviluppo sostenibile. 
              Uniamo competenza tecnica e rispetto per l'ecosistema.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2"
              >
                Scopri i Servizi
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-full font-medium transition-all flex items-center justify-center"
              >
                Contattaci
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features/Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Qualità Certificata</h3>
              <p className="text-slate-600 leading-relaxed">
                Sistema Qualità certificato dal 1998, attualmente conforme alla norma UNI EN ISO 9001:2015.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Approccio Multidisciplinare</h3>
              <p className="text-slate-600 leading-relaxed">
                Team di esperti in geologia, idraulica, acustica, ecosistemi e progettazione infrastrutturale.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Ricerca e Sviluppo</h3>
              <p className="text-slate-600 leading-relaxed">
                Iscritti all'Anagrafe Nazionale delle Ricerche del MURST (cod. 10181179).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-3">Chi Siamo</h2>
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                Oltre 30 anni di esperienza al servizio dell'ambiente.
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                I servizi offerti sono rivolti a Enti e Aziende impegnati nella progettazione e costruzione di opere la cui realizzazione richiede di affrontare problematiche connesse ad interferenze con le risorse ambientali.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Abbiamo svolto attività di analisi e valutazione in particolare nel campo delle infrastrutture lineari (strade, autostrade, linee ferroviarie ad alta capacità, elettrodotti), a cui si associano altre attività riguardanti centrali termoelettriche, dighe, cave, discariche.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                Leggi la nostra storia <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                  alt="Ufficio Ecoplan" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1987</div>
                    <div className="text-sm text-slate-500 font-medium">Anno di fondazione</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
