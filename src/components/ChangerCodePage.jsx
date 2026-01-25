// pages/CambiaCodicePage.jsx
import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const CambiaCodicePage = () => {
  const navigate = useNavigate();
  const [showCurrentCode, setShowCurrentCode] = useState(false);
  const [showNewCode, setShowNewCode] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  
  const [codeData, setCodeData] = useState({
    currentCode: '',
    newCode: '',
    confirmCode: ''
  });
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState('');

  const handleChangeCode = (e) => {
    e.preventDefault();
    setCodeError('');
    setCodeSuccess('');

    // Validazione
    if (!codeData.currentCode || !codeData.newCode || !codeData.confirmCode) {
      setCodeError('Compila tutti i campi');
      return;
    }

    if (codeData.newCode.length < 6) {
      setCodeError('Il nuovo codice deve contenere almeno 6 caratteri');
      return;
    }

    if (codeData.newCode !== codeData.confirmCode) {
      setCodeError('I codici non corrispondono');
      return;
    }

    // Qui chiameresti la tua API per cambiare il codice
    setCodeSuccess('Codice segreto modificato con successo!');
    setCodeData({ currentCode: '', newCode: '', confirmCode: '' });
    
    setTimeout(() => {
      navigate('/account');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="p-4 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/account')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        {/* Intestazione */}
        <div className="bg-blue-900 rounded-lg shadow-md p-6 text-white mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Modifica Codice Segreto</h1>
              <p className="text-blue-100 text-sm mt-1">Cambia il tuo codice di accesso in sicurezza</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleChangeCode} className="space-y-6">
            {/* Codice attuale */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Codice attuale
              </label>
              <div className="relative">
                <input
                  type={showCurrentCode ? "text" : "password"}
                  value={codeData.currentCode}
                  onChange={(e) => setCodeData({ ...codeData, currentCode: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Inserisci il tuo codice attuale"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentCode(!showCurrentCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Nuovo codice */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nuovo codice
              </label>
              <div className="relative">
                <input
                  type={showNewCode ? "text" : "password"}
                  value={codeData.newCode}
                  onChange={(e) => setCodeData({ ...codeData, newCode: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Inserisci il tuo nuovo codice"
                />
                <button
                  type="button"
                  onClick={() => setShowNewCode(!showNewCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {codeData.newCode && (
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <div className={`h-1 flex-1 rounded ${codeData.newCode.length >= 2 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded ${codeData.newCode.length >= 4 ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded ${codeData.newCode.length >= 6 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                    <div className={`h-1 flex-1 rounded ${codeData.newCode.length >= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Forza del codice: {
                      codeData.newCode.length < 4 ? 'Debole' :
                      codeData.newCode.length < 6 ? 'Media' :
                      codeData.newCode.length < 8 ? 'Buona' : 'Eccellente'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Conferma codice */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Conferma nuovo codice
              </label>
              <div className="relative">
                <input
                  type={showConfirmCode ? "text" : "password"}
                  value={codeData.confirmCode}
                  onChange={(e) => setCodeData({ ...codeData, confirmCode: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Conferma il tuo nuovo codice"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmCode(!showConfirmCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Messaggi errore e successo */}
            {codeError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700 font-medium">❌ {codeError}</p>
              </div>
            )}

            {codeSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium">✅ {codeSuccess}</p>
              </div>
            )}

            {/* Pulsanti */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/account')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Cambia codice
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CambiaCodicePage;