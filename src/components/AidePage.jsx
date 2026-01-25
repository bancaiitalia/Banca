// pages/AiutoPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, HelpCircle, Phone, Mail, MessageCircle, FileText, Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const AiutoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      title: 'Bonifici & Trasferimenti',
      icon: <MessageCircle size={24} />,
      questions: [
        { q: 'Come effettuare un bonifico?', a: 'Vai nella sezione Bonifico, compila le informazioni del beneficiario e conferma.' },
        { q: 'Quali sono i tempi di bonifico?', a: 'I bonifici nazionali sono istantanei, i bonifici internazionali richiedono 1-3 giorni lavorativi.' },
        { q: 'Ci sono commissioni sui bonifici?', a: 'I bonifici nazionali sono gratuiti. Potrebbero applicarsi commissioni per i bonifici internazionali.' }
      ]
    },
    {
      id: 2,
      title: 'Carte Bancarie',
      icon: <FileText size={24} />,
      questions: [
        { q: 'Come bloccare la mia carta?', a: 'Vai in Le Mie Carte e clicca su "Blocca la carta".' },
        { q: 'Come ordinare una nuova carta?', a: 'Contatta la tua filiale o utilizza la sezione Carte per fare una richiesta.' },
        { q: 'Cosa fare in caso di smarrimento/furto?', a: 'Blocca immediatamente la tua carta tramite l\'app e contatta il numero +39 06 47921.' }
      ]
    },
    {
      id: 3,
      title: 'Account & Sicurezza',
      icon: <HelpCircle size={24} />,
      questions: [
        { q: 'Come modificare il mio codice?', a: 'Vai in Impostazioni > Sicurezza > Modifica codice segreto.' },
        { q: 'Come consultare il mio storico?', a: 'Accedi alla sezione Account e seleziona "Storico transazioni".' },
        { q: 'Il mio account è sicuro?', a: 'Sì, tutti i tuoi dati sono criptati e protetti secondo le normative bancarie internazionali.' }
      ]
    },
    {
      id: 4,
      title: 'Prelievi',
      icon: <Phone size={24} />,
      questions: [
        { q: 'Come prelevare senza carta?', a: 'Utilizza la funzione Prelievo senza carta per generare un codice temporaneo.' },
        { q: 'Qual è l\'importo massimo?', a: 'L\'importo massimo per prelievo è di 5.000 €.' },
        { q: 'Quanto tempo è valido il codice?', a: 'Il codice di prelievo è valido per 24 ore.' }
      ]
    }
  ];

  const contacts = [
    { type: 'Telefono', value: '+39 06 47921', icon: <Phone size={20} />, color: 'blue' },
    { type: 'Email', value: 'servizio.clienti@bancaditalia.it', icon: <Mail size={20} />, color: 'green' },
    { type: 'Chat', value: 'Chat in diretta', icon: <MessageCircle size={20} />, color: 'orange' }
  ];

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.questions.some(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="p-4 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Centro Assistenza</h1>
          <p className="text-gray-600 mb-4">Ciao {user.firstName}, come possiamo aiutarti?</p>

          {/* Barra di ricerca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cerca una domanda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contatti rapidi */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Contattaci</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contacts.map((contact, index) => (
              <button
                key={index}
                className={`border-2 border-${contact.color}-300 rounded-lg p-4 hover:bg-${contact.color}-50 transition text-left`}
              >
                <div className={`text-${contact.color}-600 mb-2`}>{contact.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{contact.type}</p>
                <p className="text-xs text-gray-600 mt-1">{contact.value}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Categorie di domande */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Domande Frequenti</h2>
          
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <div className="text-blue-900 mr-4">{category.icon}</div>
                  <span className="font-semibold text-gray-800">{category.title}</span>
                </div>
                <ChevronRight 
                  className={`text-gray-400 transition-transform ${selectedCategory === category.id ? 'rotate-90' : ''}`} 
                  size={20} 
                />
              </button>

              {selectedCategory === category.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {category.questions.map((item, index) => (
                    <div key={index} className="p-5 border-b border-gray-200 last:border-b-0">
                      <p className="font-semibold text-gray-800 mb-2">{item.q}</p>
                      <p className="text-gray-600 text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AiutoPage;