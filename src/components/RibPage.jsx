import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RibPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dei dati...</p>
        </div>
      </div>
    );
  }

  const compteInfo = {
    titulaire: user.name || 'Nome Cognome',
    iban: user.iban || 'IT60X0542811101000000123456',
    bic: user.bic || 'BNLIITRR',
    agence: user.agence || 'Agenzia Roma Centro - Via del Corso 123, 00186 Roma'
  };

  const genererRIB = () => {
    // Créer le contenu du RIB en texte
    const ribContent = `
═══════════════════════════════════════════════════════
        RELEVÉ D'IDENTITÉ BANCAIRE (RIB)
═══════════════════════════════════════════════════════

TITULAIRE
${compteInfo.titulaire}

IBAN
${compteInfo.iban}

BIC
${compteInfo.bic}

AGENCE
${compteInfo.agence}

═══════════════════════════════════════════════════════
Document généré le ${new Date().toLocaleDateString('it-IT')}
`;

    // Créer un blob et télécharger
    const blob = new Blob([ribContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RIB_${compteInfo.titulaire.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Il Mio RIB</h1>
            <p className="text-sm text-gray-600">Rilevamento di Identità Bancaria</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Affichage du RIB */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="border-2 border-gray-300 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                RILEVAMENTO DI IDENTITÀ BANCARIA
              </h3>
              <p className="text-sm text-gray-500">RIB - Dati Bancari</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">TITOLARE</p>
                <p className="text-xl font-bold text-gray-900">{compteInfo.titulaire}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-700 mb-2">IBAN</p>
                <p className="text-lg font-mono font-bold text-blue-900 break-all">
                  {compteInfo.iban}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">BIC / SWIFT</p>
                <p className="text-lg font-mono font-bold text-gray-900">{compteInfo.bic}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">AGENZIA</p>
                <p className="text-base text-gray-900">{compteInfo.agence}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Documento generato il {new Date().toLocaleDateString('it-IT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-blue-900 mb-2">ℹ️ Informazioni</h4>
          <p className="text-sm text-blue-800">
            Questo documento contiene le tue coordinate bancarie (RIB). Puoi condividerlo con terzi 
            per ricevere bonifici o impostare addebiti diretti.
          </p>
        </div>

        {/* Bouton de téléchargement */}
        <div className="flex justify-center">
          <button 
            onClick={genererRIB}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            Scarica il mio RIB
          </button>
        </div>

        {/* Note de sécurité */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Sicurezza:</strong> Non condividere mai le tue credenziali di accesso o 
            codici di sicurezza. Il RIB può essere condiviso in sicurezza per ricevere pagamenti.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RibPage;