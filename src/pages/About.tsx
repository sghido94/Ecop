import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Presentazione
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Società di ingegneria e architettura ambientale dal 1987.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-emerald text-slate-600"
          >
            <p className="lead text-2xl text-slate-900 font-serif mb-8">
              Ecoplan nasce nel dicembre 1987 come società di ingegneria e architettura ambientale.
            </p>
            <p>
              I servizi offerti sono rivolti a Enti e Aziende impegnati nella progettazione e costruzione di opere la cui realizzazione richiede di affrontare problematiche connesse ad interferenze con le risorse ambientali.
            </p>
            <p>
              Ecoplan ha svolto attività di analisi e valutazione in particolare nel campo delle infrastrutture lineari (strade, autostrade, linee ferroviarie ad alta capacità, elettrodotti), a cui si associano altre attività riguardanti centrali termoelettriche, dighe, cave, discariche.
            </p>
            <p>
              L'articolazione della struttura tecnica di Ecoplan è multidisciplinare, volta ad offrire alla Committenza la gamma fondamentale delle competenze necessarie. Al fine di soddisfare esigenze di analisi, valutazione e progettazione che richiedono l'apporto di competenze complementari, Ecoplan opera all'interno di associazioni di imprese, intrattenendo costanti rapporti di collaborazione con Dipartimenti Universitari e Istituti di Ricerca.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Certifications */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Certificazioni e Riconoscimenti</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <span className="text-slate-700">
                    Certificata dal Sistema Qualità dal 1998, attualmente conforme alla norma <strong>UNI EN ISO 9001:2015</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <span className="text-slate-700">
                    Iscritta all'Anagrafe Nazionale delle Ricerche del "Ministero dell'Università, Ricerca Scientifica e Tecnologica" (cod. 10181179).
                  </span>
                </li>
              </ul>
            </div>

            {/* Core Activities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Settore Operativo</h3>
              <p className="text-slate-600 mb-6">
                L'attività principale di Ecoplan riguarda l'elaborazione di progetti stradali e di linee elettriche AT e AAT, nonché di stazioni elettriche, Studi di Impatto Ambientale, e la previsione dei mutamenti indotti da interventi sul territorio.
              </p>
              <p className="text-slate-600">
                Utilizziamo procedure di analisi cartografica in automatico per la gestione integrata di informazioni territoriali su aree di grande estensione, valutando la compatibilità delle opere, ricercando i siti più idonei e confrontando alternative progettuali.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
