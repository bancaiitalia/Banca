// components/RegistrazionePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegistrazionePage() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    city: ''
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!formData.username || !formData.password || !formData.name || !formData.email || !formData.country || !formData.city) {
      setFormError('Compila tutti i campi obbligatori');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Le password non corrispondono');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('La password deve contenere almeno 6 cifre');
      return;
    }

    // Validation identifiant (11 chiffres)
    if (!/^\d{11}$/.test(formData.username)) {
      setFormError('L\'identificativo deve contenere esattamente 11 cifre');
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Email non valida');
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8 shadow-lg my-8">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-gray-600 text-sm mb-4 flex items-center gap-2"
        >
          ← Torna alla home
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16   flex items-center justify-center mx-auto mb-4">
            <img src="/images/logo2.jpeg" alt="Banca d'Italia" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Apri un conto</h2>
          <p className="text-gray-600 mt-2">Crea il tuo conto in pochi istanti</p>
        </div>

        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{formError || error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Identificativo (11 cifre) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                maxLength="11"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefono
              </label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paese <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Città <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Codice segreto (min 6 cifre) <span className="text-red-500">*</span>
              </label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conferma codice segreto <span className="text-red-500">*</span>
              </label>
              <input 
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600">
              Creando un conto, accetti i nostri termini di utilizzo e la nostra politica sulla privacy.
            </p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition disabled:bg-blue-400 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creazione del conto...
              </>
            ) : (
              'Crea il mio conto'
            )}
          </button>

          <div className="text-center border-t pt-4 mt-4">
            <p className="text-sm text-gray-600 mb-3">
              Hai già un conto?
            </p>
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-900 hover:underline font-medium"
            >
              Accedi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}