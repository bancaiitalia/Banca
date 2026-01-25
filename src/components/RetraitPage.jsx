// pages/PrelievoPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowDown, AlertCircle, Check, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const PrelievoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    importo: '',
    tipoConto: 'LIQUIDITÀ',
    filiale: 'Roma - Centro'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [codicePrelievo, setCodicePrelievo] = useState('');

  const filiali = [
    'Roma - Centro',
    'Milano - Duomo',
    'Napoli - Piazza Garibaldi',
    'Firenze - Santa Maria Novella',
    'Torino - Porta Nuova'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validazione
    if (!formData.importo || parseFloat(formData.importo) <= 0) {
      setError('Inserisci un importo valido');
      setLoading(false);
      return;
    }

    const account = user.accounts.find(acc => acc.type === formData.tipoConto);
    if (parseFloat(formData.importo) > account.balance) {
      setError('Saldo insufficiente su questo conto');
      setLoading(false);
      return;
    }

    if (parseFloat(formData.importo) > 5000) {
      setError('L\'importo massimo per prelievo è di 5.000 €');
      setLoading(false);
      return;
    }

    // Simulazione del prelievo
    setTimeout(() => {
      setCodicePrelievo(generateCode());
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="text-white" size={50} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Prelievo autorizzato!</h2>
          
          <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Codice di prelievo:</p>
            <p className="text-4xl font-bold text-blue-900 tracking-widest mb-2">{codicePrelievo}</p>
            <p className="text-xs text-gray-500">Valido 24h</p>
          </div>

          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Importo: <span className="font-bold">{formData.importo} €</span></p>
            <p className="text-sm text-gray-600 mt-2">Filiale: <span className="font-bold">{formData.filiale}</span></p>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Presenta questo codice e il tuo documento d'identità alla filiale selezionata per effettuare il prelievo.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Torna alla dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="p-4 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ArrowDown className="text-blue-900" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Prelievo senza carta</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Conto sorgente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conto da addebitare *
              </label>
              <select
                name="tipoConto"
                value={formData.tipoConto}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {user.accounts.map((account) => (
                  <option key={account.type} value={account.type}>
                    {account.type} - {account.balance.toLocaleString('it-IT')} {account.currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Importo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Importo del prelievo *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="importo"
                  value={formData.importo}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="10"
                  min="10"
                  max="5000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  €
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Importo massimo: 5.000 € per prelievo</p>
            </div>

            {/* Importi rapidi */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Importi rapidi</p>
              <div className="grid grid-cols-4 gap-2">
                {[20, 50, 100, 200].map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData({ ...formData, importo: amount.toString() })}
                    className="border-2 border-gray-300 rounded-lg py-2 text-sm font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-900 transition"
                  >
                    {amount}€
                  </button>
                ))}
              </div>
            </div>

            {/* Filiale */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin size={16} className="mr-2" />
                Filiale di prelievo *
              </label>
              <select
                name="filiale"
                value={formData.filiale}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filiali.map((filiale) => (
                  <option key={filiale} value={filiale}>
                    {filiale}
                  </option>
                ))}
              </select>
            </div>

            {/* Informazione */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Informazione:</strong> Riceverai un codice di prelievo valido 24h. 
                Presentati alla filiale con questo codice e il tuo documento d'identità.
              </p>
            </div>

            {/* Pulsante invio */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Elaborazione in corso...
                </>
              ) : (
                <>
                  <ArrowDown size={20} className="mr-2" />
                  Genera il codice di prelievo
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PrelievoPage;