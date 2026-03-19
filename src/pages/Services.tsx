import { motion } from 'motion/react';
import { 
  TreePine, 
  Wind, 
  Mountain, 
  Droplets, 
  Leaf, 
  Map, 
  Car, 
  Zap,
  Activity
} from 'lucide-react';

const services = [
  {
    title: "Studi di impatto ambientale",
    description: "Valutazione preventiva degli effetti sull'ambiente di progetti e infrastrutture.",
    icon: Activity
  },
  {
    title: "Progettazione linee elettriche e stazioni AT/AAT",
    description: "Ingegneria per infrastrutture energetiche ad alta e altissima tensione.",
    icon: Zap
  },
  {
    title: "Rumore e Atmosfera - Qualità dell'aria",
    description: "Rilevamenti, analisi e valutazioni della qualità dell'aria e propagazione del rumore.",
    icon: Wind
  },
  {
    title: "Geologia, idrogeologia e geotecnica",
    description: "Studi del sottosuolo, delle acque sotterranee e delle caratteristiche meccaniche dei terreni.",
    icon: Mountain
  },
  {
    title: "Idrologia, idraulica e idrobiologia",
    description: "Valutazioni idrauliche, studio dei bacini idrografici e degli ecosistemi acquatici.",
    icon: Droplets
  },
  {
    title: "Ecosistemi",
    description: "Analisi e valutazioni degli ecosistemi naturali e della biodiversità.",
    icon: TreePine
  },
  {
    title: "Paesaggio",
    description: "Studi paesaggistici per valutare l'inserimento di opere nel contesto territoriale.",
    icon: Map
  },
  {
    title: "Progetti di inserimento paesaggistico e ambientale",
    description: "Sistemazioni a verde, barriere antirumore e opere di mitigazione ambientale.",
    icon: Leaf
  },
  {
    title: "Viabilità e traffico",
    description: "Progettazione stradale, analisi dei flussi di traffico e mobilità sostenibile.",
    icon: Car
  }
];

export default function Services() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            I Nostri Servizi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Competenze multidisciplinari per l'ingegneria e l'architettura ambientale.
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
