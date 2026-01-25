// pages/CartePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CreditCard, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';

const CartePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState({});

  // ✅ PROTECTION: Vérifier que user et accounts existent
  if (!user || !user.accounts || user.accounts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Caricamento dati carta...</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-900 hover:text-blue-700"
          >
            Torna alla dashboard
          </button>
        </div>
      </div>
    );
  }

  const toggleDetails = (cardId) => {
    setShowDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Utilizza il numero di carta dell'utente
  const generateCardNumber = () => {
    if (user.cardNumber) {
      return user.cardNumber;
    }
    const clientNum = user.clientNumber || '0000';
    return `4532 ${clientNum.slice(-4).padStart(4, '0')} 0000 0000`;
  };

  // Data di scadenza fittizia (2 anni nel futuro)
  const getExpirationDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${year}`;
  };

  // ✅ PROTECTION: Vérification avant d'accéder aux comptes
  const firstAccount = user.accounts[0];

  // Carta principale collegata al conto principale
  const mainCard = {
    id: 1,
    holder: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'Titolare',
    linkedAccount: firstAccount.type || 'LIQUIDITÀ',
    balance: firstAccount.balance || 0,
    currency: firstAccount.currency || '€',
    cardNumber: generateCardNumber(),
    expiration: getExpirationDate(),
    status: 'active'
  };

  const getCardColor = (type) => {
    if (type === 'LIQUIDITÀ') return 'from-blue-600 to-blue-800';
    if (type === 'ASSICURAZIONE') return 'from-red-600 to-red-800';
    if (type === 'ECONOMIA') return 'from-green-600 to-green-800';
    if (type === 'RISPARMIO') return 'from-yellow-600 to-yellow-800';
    return 'from-gray-600 to-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Le Mie Carte Bancarie</h1>
        </div>

        <div className="space-y-6">
          {/* Carta principale */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
            {/* Carta visuale */}
            <div className={`bg-gradient-to-br ${getCardColor(mainCard.linkedAccount)} p-4 sm:p-5 md:p-6 text-white relative`}>
              {/* Chip carta */}
              <div className="w-10 h-8 sm:w-12 sm:h-10 mb-4 sm:mb-6 opacity-90">
                <img src="images/logo2.jpeg" alt="" className="w-full h-full object-contain" />
              </div>
              
              {/* Numero carta */}
              <div className="mb-3 sm:mb-4">
                <p className="text-sm sm:text-base md:text-lg font-mono tracking-wider sm:tracking-widest">
                  {showDetails[mainCard.id] 
                    ? mainCard.cardNumber 
                    : `**** **** **** ${mainCard.cardNumber.slice(-4)}`
                  }
                </p>
              </div>

              {/* Saldo */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {mainCard.balance.toLocaleString('it-IT', {minimumFractionDigits: 2})} {mainCard.currency}
                </p>
              </div>

              {/* Titolare e Scadenza */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70 mb-1">Titolare</p>
                  <p className="font-semibold text-xs sm:text-sm uppercase">{mainCard.holder}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1 text-right">Scad.</p>
                  <p className="font-semibold text-xs sm:text-sm">{mainCard.expiration}</p>
                </div>
              </div>
            </div>

            {/* Dettagli e azioni */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Azioni rapide */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button 
                  onClick={() => toggleDetails(mainCard.id)}
                  className="flex items-center justify-center border-2 border-gray-300 rounded-lg py-2 sm:py-3 hover:border-blue-500 hover:text-blue-900 transition text-sm sm:text-base"
                >
                  {showDetails[mainCard.id] ? <EyeOff size={18} className="mr-1 sm:mr-2" /> : <Eye size={18} className="mr-1 sm:mr-2" />}
                  <span className="hidden sm:inline">{showDetails[mainCard.id] ? 'Nascondi' : 'Mostra numero'}</span>
                  <span className="sm:hidden">{showDetails[mainCard.id] ? 'Nascondi' : 'Mostra'}</span>
                </button>
                
                <button className="flex items-center justify-center bg-red-50 border-2 border-red-300 text-red-600 rounded-lg py-2 sm:py-3 hover:bg-red-100 transition text-sm sm:text-base">
                  <Lock size={18} className="mr-1 sm:mr-2" />
                  Blocca
                </button>
              </div>

              {/* Informazioni dettagliate */}
              {showDetails[mainCard.id] && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Numero completo</span>
                    <span className="font-mono font-semibold text-xs sm:text-sm">{mainCard.cardNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">CVV</span>
                    <span className="font-mono font-semibold text-xs sm:text-sm">***</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Cliente N°</span>
                    <span className="font-semibold text-xs sm:text-sm">{user.clientNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Conto collegato</span>
                    <span className="font-semibold text-xs sm:text-sm">{mainCard.linkedAccount}</span>
                  </div>
                </div>
              )}

              {/* Informazione */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-800">
                  <strong>Info:</strong> Questa carta è collegata al tuo conto {mainCard.linkedAccount}. 
                  Le transazioni saranno addebitate su questo conto.
                </p>
              </div>
            </div>
          </div>

          {/* Altri conti - Possibilità di ordinare carte */}
          {user.accounts.length > 1 && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Altri conti disponibili</h2>
              <div className="space-y-3 sm:space-y-4">
                {user.accounts.slice(1).map((account, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4`}
                             style={{
                               backgroundColor: 
                                 account.color === 'red' ? '#fee2e2' :
                                 account.color === 'green' ? '#dcfce7' :
                                 account.color === 'yellow' ? '#fef9c3' : '#e5e7eb'
                             }}>
                          <CreditCard 
                            style={{
                              color: 
                                account.color === 'red' ? '#dc2626' :
                                account.color === 'green' ? '#16a34a' :
                                account.color === 'yellow' ? '#ca8a04' : '#6b7280'
                            }}
                            size={20} 
                            className="sm:w-6 sm:h-6"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-gray-800">{account.type}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {(account.balance || 0).toLocaleString('it-IT', {minimumFractionDigits: 2})} {account.currency || '€'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 sm:p-3 text-xs text-gray-600">
                      <p className="mt-1">💳 Carta Visa collegata al conto {account.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default CartePage;