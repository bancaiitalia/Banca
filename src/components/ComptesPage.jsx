// pages/AccountPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Shield, Eye, EyeOff, Edit2, Check, X, Lock, Clock, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import BottomNavigation from './BottomNavigation';

const AccountPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showClientNumber, setShowClientNumber] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setEditData(prevData => {
      if (prevData.email && !isEditing) {
        return prevData;
      }
      
      return {
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || ''
      };
    });
  }, [user, navigate, isEditing]);

  const handleLogout = () => {
    if (window.confirm('Sei sicuro di volerti disconnettere?')) {
      logout();
      navigate('/login');
    }
  };

  const handleCloseAccount = () => {
    if (window.confirm('Sei sicuro di voler chiudere il tuo account? Questa azione è irreversibile.')) {
      alert('Procedura di chiusura account avviata...');
    }
  };

  const handleSave = async () => {
    try {
      console.log('📝 Invio dati:', editData);
      await updateUser(editData);
      setIsEditing(false);
      alert('✅ Informazioni aggiornate con successo!');
    } catch (error) {
      console.error('❌ Errore:', error);
      alert('❌ Errore durante l\'aggiornamento: ' + error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Caricamento...</p>
      </div>
    );
  }

  const accountInfo = [
    { label: 'Nome completo', value: `${user.firstName} ${user.lastName}`, icon: <User size={20} /> },
    { label: 'Numero cliente', value: showClientNumber ? user.clientNumber : '•••••••', icon: <Shield size={20} />, canToggle: true },
    { label: 'Email', value: isEditing ? editData.email : (user.email || 'Non fornito'), icon: <Mail size={20} />, editable: true, field: 'email' },
    { label: 'Telefono', value: isEditing ? editData.phone : (user.phone || 'Non fornito'), icon: <Phone size={20} />, editable: true, field: 'phone' },
    { label: 'Indirizzo', value: isEditing ? editData.address : (user.address || 'Non fornito'), icon: <MapPin size={20} />, editable: true, field: 'address' },
    { label: 'Città', value: isEditing ? editData.city : (user.city || 'Non fornito'), icon: <MapPin size={20} />, editable: true, field: 'city' },
    { label: 'Codice Postale', value: isEditing ? editData.postalCode : (user.postalCode || 'Non fornito'), icon: <Mail size={20} />, editable: true, field: 'postalCode' },
    { label: 'Paese', value: user.country, icon: <MapPin size={20} /> },
    { label: 'Ultimo aggiornamento', value: user.lastUpdate, icon: <Calendar size={20} /> }
  ];

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

        {/* Intestazione profilo */}
        <div className="bg-blue-900 rounded-lg shadow-md p-6 text-white mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-2xl mr-4">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-blue-100 text-sm mt-1">Cliente dal {user.lastUpdate}</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setEditData({
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || '',
                    city: user.city || '',
                    postalCode: user.postalCode || ''
                  });
                  setIsEditing(true);
                }
              }}
              className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center"
            >
              {isEditing ? <Check size={18} className="mr-2" /> : <Edit2 size={18} className="mr-2" />}
              {isEditing ? 'Salva' : 'Modifica'}
            </button>
          </div>
        </div>

        {/* Informazioni personali */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Informazioni Personali</h2>
          
          <div className="space-y-4">
            {accountInfo.map((info, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center flex-1">
                  <div className="text-blue-900 mr-4">{info.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{info.label}</p>
                    {isEditing && info.editable ? (
                      <input
                        type="text"
                        value={editData[info.field]}
                        onChange={(e) => setEditData({
                          ...editData,
                          [info.field]: e.target.value
                        })}
                        className="mt-1 border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-semibold text-gray-800 mt-1">{info.value}</p>
                    )}
                  </div>
                </div>
                {info.canToggle && (
                  <button
                    onClick={() => setShowClientNumber(!showClientNumber)}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    {showClientNumber ? <EyeOff size={20} className="text-gray-600" /> : <Eye size={20} className="text-gray-600" />}
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  email: user.email || '',
                  phone: user.phone || '',
                  address: user.address || '',
                  city: user.city || '',
                  postalCode: user.postalCode || ''
                });
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition mt-4 flex items-center justify-center"
            >
              <X size={18} className="mr-2" />
              Annulla
            </button>
          )}
        </div>

        {/* I miei conti */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">I Miei Conti</h2>
          
          <div className="space-y-3">
            {user.accounts && user.accounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3`} style={{backgroundColor: 
                    account.color === 'blue' ? '#3b82f6' : 
                    account.color === 'red' ? '#ef4444' : 
                    account.color === 'green' ? '#10b981' : 
                    account.color === 'yellow' ? '#eab308' : '#6b7280'
                  }}></div>
                  <div>
                    <p className="font-semibold text-gray-800">{account.type}</p>
                    <p className="text-xs text-gray-500">Attivo</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">
                  {account.balance.toLocaleString('it-IT', {minimumFractionDigits: 2})} {account.currency}
                </p>
              </div>
            ))}
          </div>

          {user.blockedAmount > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Importo bloccato:</strong> {user.blockedAmount.toLocaleString('it-IT', {minimumFractionDigits: 2})} {user.accounts && user.accounts[0] ? user.accounts[0].currency : '€'}
              </p>
            </div>
          )}
        </div>

        {/* Sicurezza */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Sicurezza & Impostazioni</h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/cambia-codice')}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center"
            >
              <Lock className="text-blue-900 mr-3" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Modifica il mio codice segreto</p>
                <p className="text-sm text-gray-500 mt-1">Cambia il tuo codice di accesso</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/storico-transazioni')}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center"
            >
              <Clock className="text-blue-900 mr-3" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Storico transazioni</p>
                <p className="text-sm text-gray-500 mt-1">Visualizza le tue ultime transazioni</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/notifiche')}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center"
            >
              <Bell className="text-blue-900 mr-3" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Notifiche</p>
                <p className="text-sm text-gray-500 mt-1">Gestisci le tue preferenze di notifica</p>
              </div>
            </button>
          </div>
        </div>

        {/* Disconnessione */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Disconnetti
          </button>

          <button
            onClick={handleCloseAccount}
            className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Chiudi il mio account
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AccountPage;