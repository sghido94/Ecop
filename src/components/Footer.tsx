import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">ECOPLAN</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Società di Ingegneria & Architettura Ambientale. Dal 1987 offriamo servizi di progettazione e consulenza ambientale.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Link Rapidi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Presentazione</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Servizi</Link></li>
              <li><Link to="/works" className="hover:text-emerald-400 transition-colors">Lavori</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contatti</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Sede Legale e Operativa</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Via S. Botticelli, 57<br />10154 - Torino</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>011-657010 / 011-6689123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:segreteria@ecoplansrl.com" className="hover:text-emerald-400 transition-colors">segreteria@ecoplansrl.com</a>
                  <a href="mailto:ecoplan@ecoplansrl.com" className="hover:text-emerald-400 transition-colors">ecoplan@ecoplansrl.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Ecoplan S.r.l. Tutti i diritti riservati.</p>
          <p className="mt-2 md:mt-0">Certificata ISO 9001:2015</p>
        </div>
      </div>
    </footer>
  );
}
