import { motion } from 'motion/react';
import { FileText, ArrowRight } from 'lucide-react';

export default function Works() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            I Nostri Lavori
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Un'esperienza trentennale al servizio dell'ambiente e dello sviluppo.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
              Oltre 30 anni di eccellenza.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Nel 2018 Ecoplan ha celebrato trenta anni di servizio. In questo lungo periodo abbiamo collaborato con Enti Pubblici e Aziende Private per la realizzazione di opere infrastrutturali complesse, garantendo sempre il massimo rispetto per l'ambiente e il territorio.
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              La nostra esperienza spazia dalle valutazioni di impatto ambientale per grandi infrastrutture lineari, alla progettazione di opere di mitigazione, fino a complessi studi ecosistemici e paesaggistici.
            </p>
            
            <a 
              href="https://www.ecoplansrl.com/Lavori/Ecoplan_Referenze_Luglio_2021.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all shadow-lg shadow-emerald-600/20"
            >
              <FileText className="w-5 h-5" />
              Scarica il Curriculum Completo
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2069&auto=format&fit=crop" 
                alt="Progetto Ecoplan" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-100 rounded-full -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-100 rounded-full -z-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
