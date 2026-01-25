import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowDownLeft, CreditCard, FileText, HelpCircle, X } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  useEffect(() => {
    console.log('📊 DashboardPage montato');
    
    if (refreshUser) {
      const freshUser = refreshUser();
      console.log('🔄 Utente aggiornato:', freshUser?.name, 'Saldo:', freshUser?.balance);
    }
  }, []);

  useEffect(() => {
    console.log('👤 User nel Dashboard:', user?.name, 'Saldo:', user?.balance);
    
    if (!user) {
      console.warn('⚠️ Nessun utente nel Dashboard, reindirizzamento...');
      navigate('/login');
    }

    if (user?.isBlocked) {
      setShowBlockedModal(true);
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento del tuo account...</p>
        </div>
      </div>
    );
  }

  const balance = user?.balance || 0;
  const currentDate = new Date().toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // ✅ FORMATER LES FRAIS DE DÉBLOCAGE EN EUROS
  const formatUnlockFee = () => {
    const fee = user?.unlockFee || 567115.31;
    return fee.toLocaleString('it-IT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  const accounts = [
    { 
      id: 1, 
      name: 'LIQUIDITÀ', 
      balance: balance, 
      color: 'bg-blue-500',
      progress: 100 
    },
    { 
      id: 2, 
      name: 'ASSICURAZIONE', 
      balance: 2700.00, 
      color: 'bg-red-500',
      progress: 45 
    },
    { 
      id: 3, 
      name: 'ECONOMIA', 
      balance: 15000.00, 
      color: 'bg-green-500',
      progress: 75 
    },
    { 
      id: 4, 
      name: 'RISPARMIO', 
      balance: 2100.00, 
      color: 'bg-yellow-500',
      progress: 30 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader notificationCount={notificationCount} />

      {/* Modal Account Bloccato */}
      {showBlockedModal && user?.isBlocked && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Bloccato</h3>
              <p className="text-gray-600">
                Il tuo account è attualmente bloccato. Alcune funzionalità come i bonifici sono disabilitate.
              </p>
            </div>
            
            {/* ✅ AFFICHAGE DES FRAIS EN EUROS */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Spese di sblocco:</strong> {formatUnlockFee()} €
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Contatta il servizio clienti per maggiori informazioni.
              </p>
            </div>
            
            <button 
              onClick={() => setShowBlockedModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Ho capito
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {/* User Info */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-1">{user?.location || 'ITALIA'}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{user?.name}</h1>
          <p className="text-gray-600 text-sm">IL TUO SALDO DEL {currentDate}</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="text-5xl font-bold text-gray-800 mb-4">
            {balance.toLocaleString('it-IT', { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            })} €
          </div>
          <div className="text-sm text-gray-600">
            {user?.isBlocked ? (
              <span className="text-red-600 font-semibold">
                {/* ✅ AFFICHAGE EN EUROS */}
                CONTO BLOCCATO / SPESE DI SBLOCCO: {formatUnlockFee()} €
              </span>
            ) : (
              <span>
                CONTO CORRENTE / IBAN: {user?.iban || 'IT60X0542811101000000123456'}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons - ✅ RIB REMPLACE BONIFICO (VIREMENT) */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button 
            onClick={() => navigate('/prelievo')}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <ArrowDownLeft className="w-8 h-8 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Prelievo</span>
          </button>

          {/* ✅ RIB REMPLACE BONIFICO ICI */}
          <button 
            onClick={() => navigate('/rib')}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">RIB</span>
          </button>

          <button 
            onClick={() => navigate('/carte')}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <CreditCard className="w-8 h-8 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Carte</span>
          </button>

          <button 
            onClick={() => navigate('/aiuto')}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Aiuto</span>
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-2 gap-4">
          {accounts.map((account) => (
            <div 
              key={account.id}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${account.color}`}></div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{account.name}</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {account.balance.toLocaleString('it-IT', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })} €
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${account.color}`}
                  style={{ width: `${account.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}