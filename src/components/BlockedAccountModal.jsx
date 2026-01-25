// components/BlockedAccountModal.jsx

import React, { useState } from 'react';
import { AlertTriangle, X, Info } from 'lucide-react';

export default function BlockedAccountModal({ user, onClose, onUnlock }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = async () => {
    setIsProcessing(true);
    try {
      await onUnlock();
      onClose();
    } catch (error) {
      console.error('Errore durante lo sblocco:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ CORRECTION: Formater correctement en euros italiens
  const formatUnlockFee = () => {
    const fee = user.unlockFee || 567115.31; // Valeur par défaut
    return fee.toLocaleString('it-IT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  if (!user || !user.isBlocked) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        {/* Intestazione */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-yellow-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Conto bloccato</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Contenuto */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              Buongiorno <span className="font-semibold">{user.name}</span>,
            </p>
            <p className="text-gray-600 mb-2">
              Il tuo conto è attualmente bloccato.
            </p>
          </div>

          {/* Motivo del blocco */}
          {user.blockReason && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Info className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Motivo del blocco:</p>
                  <p className="text-sm text-blue-800">{user.blockReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Spese di sblocco */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Spese di sblocco:</span>
              <span className="text-2xl font-bold text-gray-800">
                {formatUnlockFee()} €
              </span>
            </div>
          </div>

          {/* Pulsante d'azione */}
          <button
            onClick={handleUnlock}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Elaborazione in corso...
              </>
            ) : (
              'Ho capito'
            )}
          </button>

          {/* Nota informativa */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Una volta sbloccato, potrai accedere a tutte le funzionalità del tuo conto.
          </p>
        </div>
      </div>
    </div>
  );
}