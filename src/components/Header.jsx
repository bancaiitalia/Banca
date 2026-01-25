// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Globe, ChevronDown } from 'lucide-react';

const Header = ({ language, setLanguage }) => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const translations = {
    it: { 
      topics: "Temi di interesse",
      home: "Home",
      news: "Notizie",
      press: "Comunicati",
      interviews: "Interviste",
      multimedia: "Multimedia",
      indicators: "Indicatori",
      about: "Chi siamo",
      login: "Accedi",
      register: "Apri un conto"
    },
    en: {
      topics: "Topics of interest",
      home: "Home",
      news: "News",
      press: "Press releases",
      interviews: "Interviews",
      multimedia: "Multimedia",
      indicators: "Indicators",
      about: "About us",
      login: "Login",
      register: "Open an account"
    },
    de: {
      topics: "Interessenthemen",
      home: "Startseite",
      news: "Nachrichten",
      press: "Pressemitteilungen",
      interviews: "Interviews",
      multimedia: "Multimedia",
      indicators: "Indikatoren",
      about: "Über uns",
      login: "Anmelden",
      register: "Konto eröffnen"
    }
  };

  // ✅ CORRECTION : Valeur par défaut si language est undefined
  const t = translations[language] || translations['it'];

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Menu className="w-8 h-8 text-blue-900" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-1 flex justify-center">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/logo1.jpeg" 
                  alt="Banca d'Italia" 
                  className="h-16 w-auto"
                />
              </div>
            </Link>

            {/* Right Icons & Buttons */}
            <div className="flex items-center space-x-2">
              {/* Login & Register Buttons - Desktop */}
              <div className="hidden lg:flex items-center space-x-2 mr-4">
                <Link 
                  to="/login"
                  className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-full text-sm font-medium transition shadow-sm"
                >
                  {t.login}
                </Link>
                <Link 
                  to="/registrazione"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition shadow-sm"
                >
                  {t.register}
                </Link>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center space-x-2"
                >
                  <Globe className="w-6 h-6 text-blue-900" />
                  <span className="text-sm font-semibold text-blue-900 uppercase">{language || 'it'}</span>
                  <ChevronDown className="w-4 h-4 text-blue-900" />
                </button>

                {/* Language Dropdown */}
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3 ${
                          language === lang.code ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Search className="w-8 h-8 text-blue-900" />
              </button>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="lg:hidden pb-4 flex gap-2">
            <Link 
              to="/login"
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-full text-sm font-medium transition shadow-sm text-center"
            >
              {t.login}
            </Link>
            <Link 
              to="/registrazione"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-full text-sm font-medium transition shadow-sm text-center"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </header>

      {/* Topics Dropdown */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button className="flex items-center space-x-2 text-blue-900 font-semibold text-lg hover:text-blue-700 transition">
            <span>{t.topics}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Menu</h3>
            <nav className="space-y-4">
              <Link to="/" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.home}
              </Link>
              <Link to="/news" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.news}
              </Link>
              <Link to="/agenda" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                Agenda
              </Link>
              <Link to="/press" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.press}
              </Link>
              <Link to="/interviews" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.interviews}
              </Link>
              <Link to="/multimedia" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                Multimedia
              </Link>
              <Link to="/indicators" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.indicators}
              </Link>
              <Link to="/about" className="block text-lg text-gray-700 hover:text-blue-900 transition" onClick={() => setMobileMenuOpen(false)}>
                {t.about}
              </Link>
              <div className="border-t pt-4 mt-4">
                <Link to="/login" className="block text-lg text-blue-900 font-semibold hover:text-blue-700 transition mb-2" onClick={() => setMobileMenuOpen(false)}>
                  {t.login}
                </Link>
                <Link to="/registrazione" className="block text-lg text-blue-900 font-semibold hover:text-blue-700 transition" onClick={() => setMobileMenuOpen(false)}>
                  {t.register}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;