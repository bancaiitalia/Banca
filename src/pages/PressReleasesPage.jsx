// pages/PressReleasesPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PressReleasesPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Comunicati Stampa",
      bankPress: "Comunicati Banca d'Italia",
      bcePress: "Comunicati BCE",
      filterYear: "Filtra per anno",
      filterCategory: "Filtra per categoria",
      readFull: "Leggi il comunicato completo"
    }
  };

  const t = translations[language];

  const pressReleases = [
    {
      date: "23 gennaio 2026",
      title: "Pubblicati 5 nuovi numeri di 'Questioni di economia e finanza'",
      excerpt: "La Banca d'Italia ha pubblicato 5 nuovi numeri della collana 'Questioni di economia e finanza', che approfondiscono temi di ricerca economica e finanziaria.",
      category: "Pubblicazioni"
    },
    {
      date: "19 gennaio 2026",
      title: "Studio sul rischio cibernetico delle imprese non finanziarie",
      excerpt: "Pubblicato uno studio che analizza il livello di esposizione al rischio cibernetico delle imprese italiane non finanziarie.",
      category: "Ricerca"
    },
    {
      date: "16 gennaio 2026",
      title: "Bollettino Economico n. 1 - 2026",
      excerpt: "Disponibile il primo numero del Bollettino Economico del 2026 con le analisi sulla congiuntura economica italiana e internazionale.",
      category: "Bollettino"
    },
    {
      date: "15 gennaio 2026",
      title: "Pubblicati i dati sul mercato finanziario",
      excerpt: "Disponibili i dati sul mercato finanziario italiano per i mesi di novembre e dicembre 2025.",
      category: "Statistiche"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-12">{t.title}</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex space-x-8">
            <button className="pb-4 border-b-4 border-blue-900 text-blue-900 font-semibold">
              {t.bankPress}
            </button>
            <button className="pb-4 text-gray-600 hover:text-blue-900 font-semibold">
              {t.bcePress}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition">
            {t.filterYear}
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
            {t.filterCategory}
          </button>
        </div>

        {/* Press Releases List */}
        <div className="space-y-8">
          {pressReleases.map((release, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <div className="flex items-start justify-between mb-2">
                <span className="inline-block text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded">
                  {release.category}
                </span>
                <span className="text-sm text-gray-600">{release.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-3 hover:underline cursor-pointer">
                {release.title}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {release.excerpt}
              </p>
              <button className="text-blue-900 font-semibold hover:underline">
                {t.readFull} →
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">→</button>
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default PressReleasesPage;