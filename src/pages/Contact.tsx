import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Bot, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Maps AI state
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsResponse, setMapsResponse] = useState('');
  const [isMapsLoading, setIsMapsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        status: 'unread',
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', body: '' });
    } catch (err: any) {
      console.error('Error submitting message:', err);
      setError("Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapsQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsQuery.trim() || isMapsLoading) return;

    setIsMapsLoading(true);
    setMapsResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `L'utente sta chiedendo informazioni sui dintorni della sede di ECOPLAN S.r.l. (Via S. Botticelli, 57, 10154 Torino TO). Domanda: ${mapsQuery}`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: 45.087265,
                longitude: 7.702737
              }
            }
          }
        }
      });

      let groundingLinks = '';
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && chunks.length > 0) {
        groundingLinks = '\\n\\n**Luoghi trovati:**\\n';
        chunks.forEach((chunk: any) => {
          if (chunk.maps?.uri) {
            groundingLinks += `- [${chunk.maps.title || 'Vedi su Maps'}](${chunk.maps.uri})\\n`;
          }
        });
      }

      setMapsResponse(response.text + groundingLinks);
    } catch (err) {
      console.error('Error with Maps AI:', err);
      setMapsResponse('Si è verificato un errore durante la ricerca sulla mappa.');
    } finally {
      setIsMapsLoading(false);
    }
  };

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
            Contatti
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Siamo a tua disposizione per informazioni e preventivi.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                I nostri recapiti
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Sede Legale e Operativa</h3>
                    <p className="text-slate-600">Via S. Botticelli, 57<br />10154 - Torino</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Telefono</h3>
                    <p className="text-slate-600">011-657010<br />011-6689123</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 flex flex-col">
                      <a href="mailto:segreteria@ecoplansrl.com" className="hover:text-emerald-600 transition-colors">segreteria@ecoplansrl.com</a>
                      <a href="mailto:ecoplan@ecoplansrl.com" className="hover:text-emerald-600 transition-colors">ecoplan@ecoplansrl.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-slate-200 rounded-3xl overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.920875224376!2d7.702737615544747!3d45.08726597909831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d9c6f2a2d45%3A0x8e8a3a2a3b3b3b3b!2sVia%20Sandro%20Botticelli%2C%2057%2C%2010154%20Torino%20TO!5e0!3m2!1sen!2sit!4v1620000000000!5m2!1sen!2sit" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Mappa Sede Ecoplan"
              ></iframe>
            </div>

            {/* Maps AI Assistant */}
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Chiedi all'AI</h3>
              </div>
              <p className="text-slate-600 mb-6 text-sm">
                Hai bisogno di indicazioni o vuoi sapere cosa c'è nei dintorni della nostra sede? Chiedi al nostro assistente basato su Google Maps.
              </p>
              <form onSubmit={handleMapsQuery} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  placeholder="Es. Dove posso parcheggiare vicino?"
                  disabled={isMapsLoading}
                  className="flex-grow px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={!mapsQuery.trim() || isMapsLoading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-medium transition-all flex items-center justify-center"
                >
                  {isMapsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>
              
              {mapsResponse && (
                <div className="bg-white p-4 rounded-xl border border-emerald-100 text-sm text-slate-700 markdown-body prose prose-sm prose-emerald max-w-none">
                  <Markdown>{mapsResponse}</Markdown>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
          >
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">
              Inviaci un messaggio
            </h2>

            {isSuccess ? (
              <div className="bg-emerald-50 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Messaggio Inviato!</h3>
                <p className="text-slate-600 mb-6">
                  Grazie per averci contattato. Ti risponderemo il prima possibile.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="mario@esempio.it"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">Oggetto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Richiesta informazioni"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="body" className="text-sm font-medium text-slate-700">Messaggio</label>
                  <textarea
                    id="body"
                    name="body"
                    required
                    rows={5}
                    value={formData.body}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    placeholder="Scrivi qui il tuo messaggio..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Invio in corso...' : (
                    <>
                      Invia Messaggio
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
