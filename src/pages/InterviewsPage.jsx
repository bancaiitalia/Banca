// pages/InterviewsPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const InterviewsPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Interviste e Interventi",
      subtitle: "Interviste, discorsi e interventi dei vertici della Banca d'Italia",
      filterYear: "Filtra per anno",
      filterPerson: "Filtra per persona",
      readFull: "Leggi l'intervento completo",
      watchVideo: "Guarda il video",
      governor: "Governatore",
      viceGovernor: "Vice Direttore Generale",
      directorGeneral: "Direttore Generale"
    }
  };

  const t = translations[language];

  const interviews = [
    {
      date: "15 gennaio 2026",
      title: "Investire nel futuro: giovani, innovazione e capitale umano",
      person: "Fabio Panetta",
      role: "Governatore",
      type: "Intervento",
      hasVideo: true
    },
    {
      date: "10 gennaio 2026",
      title: "Le sfide della transizione digitale per il sistema bancario italiano",
      person: "Luigi Federico Signorini",
      role: "Direttore Generale",
      type: "Intervista",
      hasVideo: false
    },
    {
      date: "20 dicembre 2025",
      title: "Politica monetaria e prospettive economiche per il 2026",
      person: "Fabio Panetta",
      role: "Governatore",
      type: "Discorso",
      hasVideo: true
    },
    {
      date: "15 dicembre 2025",
      title: "Stabilità finanziaria e vigilanza bancaria",
      person: "Alessandra Perrazzelli",
      role: "Vice Direttore Generale",
      type: "Intervento",
      hasVideo: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg mb-12">{t.subtitle}</p>
        
        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition">
            {t.filterYear}
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
            {t.filterPerson}
          </button>
        </div>

        {/* Interviews List */}
        <div className="space-y-8">
          {interviews.map((interview, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={`/images/interview-${index + 1}.jpg`}
                    alt={interview.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded">
                      {interview.type}
                    </span>
                    <span className="text-sm text-gray-600">{interview.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-3 hover:underline cursor-pointer">
                    {interview.title}
                  </h2>
                  <p className="text-gray-700 font-semibold mb-1">{interview.person}</p>
                  <p className="text-gray-600 text-sm mb-4">{interview.role}</p>
                  <div className="flex gap-4">
                    <button className="text-blue-900 font-semibold hover:underline">
                      {t.readFull} →
                    </button>
                    {interview.hasVideo && (
                      <button className="flex items-center space-x-2 text-blue-900 font-semibold hover:underline">
                        <span>▶</span>
                        <span>{t.watchVideo}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default InterviewsPage;