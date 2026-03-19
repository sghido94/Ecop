import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, Mail, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const markAsRead = async (id: string, currentStatus: string, createdAt: any) => {
    if (currentStatus === 'read') return;
    try {
      await updateDoc(doc(db, 'messages', id), { 
        status: 'read',
        createdAt // Keep immutable field unchanged
      });
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, 'messages', deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Area Riservata</h1>
          <p className="text-slate-600 mb-8">Accedi per visualizzare i messaggi ricevuti dal sito.</p>
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Accedi con Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">Gestione Messaggi</h1>
            <p className="text-slate-600 mt-1">Benvenuto, {user.displayName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Esci
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              Nessun messaggio ricevuto.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {messages.map((msg) => (
                <li 
                  key={msg.id} 
                  className={`p-6 transition-colors ${msg.status === 'unread' ? 'bg-emerald-50/50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{msg.subject}</h3>
                        {msg.status === 'unread' && (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md uppercase tracking-wider">
                            Nuovo
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="font-medium text-slate-700">{msg.name}</span>
                        <span>&bull;</span>
                        <a href={`mailto:${msg.email}`} className="hover:text-emerald-600">{msg.email}</a>
                        <span>&bull;</span>
                        <span>{msg.createdAt?.toDate?.()?.toLocaleString('it-IT') || 'Data non disponibile'}</span>
                      </div>
                      <p className="text-slate-700 whitespace-pre-wrap">{msg.body}</p>
                    </div>
                    
                    <div className="flex md:flex-col gap-3 shrink-0 justify-end md:justify-start">
                      {msg.status === 'unread' && (
                        <button
                          onClick={() => markAsRead(msg.id, msg.status, msg.createdAt)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Segna come letto"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(msg.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Elimina Messaggio</h3>
              <p className="text-center text-slate-600 mb-8">
                Sei sicuro di voler eliminare questo messaggio? Questa azione non può essere annullata.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Elimina
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
