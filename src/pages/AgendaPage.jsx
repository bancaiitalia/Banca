// pages/AgendaPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AgendaPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Agenda",
      subtitle: "Agenda delle pubblicazioni, degli eventi e degli impegni della Banca",
      filterMonth: "Filtra per mese",
      filterType: "Filtra per tipo",
      statistics: "STATISTICHE",
      publications: "PUBBLICAZIONI",
      events: "EVENTI",
      allEvents: "Tutti gli eventi"
    }
  };

  const t = translations[language];

  const agendaItems = [
    {
      day: "9",
      month: "Gennaio",
      type: "STATISTICHE",
      title: "Gli aggregati di bilancio della Banca",
      color: "teal"
    },
    {
      day: "15",
      month: "Gennaio",
      type: "STATISTICHE",
      title: "Mercato finanziario, novembre-dicembre 2025",
      color: "teal"
    },
    {
      day: "15",
      month: "Gennaio",
      type: "STATISTICHE",
      title: "Conti finanziari terzo trimestre 2025",
      color: "teal"
    },
    {
      day: "15",
      month: "Gennaio",
      type: "EVENTI",
      title: "Seminario 'The Eurosystem's payment systems and market infrastructures: their role in Europe and in the global landscape'",
      color: "purple"
    },
    {
      day: "16",
      month: "Gennaio",
      type: "PUBBLICAZIONI",
      title: "Bollettino Economico n. 1 - 2026",
      color: "blue"
    },
    {
      day: "23",
      month: "Gennaio",
      type: "PUBBLICAZIONI",
      title: "5 nuovi numeri di 'Questioni di economia e finanza'",
      color: "blue"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      teal: "bg-teal-700",
      purple: "bg-purple-700",
      blue: "bg-blue-700"
    };
    return colors[color] || "bg-blue-700";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg mb-12">{t.subtitle}</p>
        
        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition">
            {t.filterMonth}
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
            {t.filterType}
          </button>
        </div>

        {/* Agenda Items */}
        <div className="space-y-6">
          {agendaItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition">
              <div className="flex items-start space-x-6">
                <div className="text-center min-w-[100px]">
                  <div className="text-6xl font-light text-gray-800">{item.day}</div>
                  <div className="text-xl text-gray-600">{item.month}</div>
                </div>
                <div className="flex-1">
                  <span className={`inline-block ${getColorClasses(item.color)} text-white px-4 py-1 rounded text-sm font-semibold mb-3`}>
                    {item.type}
                  </span>
                  <h3 className="text-xl font-bold text-blue-900 hover:underline cursor-pointer">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg hover:bg-blue-900 hover:text-white transition font-semibold">
            {t.allEvents}
          </button>
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default AgendaPage;