// pages/MultimediaPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MultimediaPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Multimedia",
      subtitle: "Video, infografiche e contenuti multimediali della Banca d'Italia",
      videos: "Video",
      infographics: "Infografiche",
      podcasts: "Podcast",
      filterType: "Filtra per tipo",
      filterYear: "Filtra per anno",
      watch: "Guarda",
      download: "Scarica",
      listen: "Ascolta",
      duration: "Durata"
    }
  };

  const t = translations[language];

  const multimediaItems = [
    {
      type: "video",
      date: "15 gennaio 2026",
      title: "Investire nel futuro: giovani, innovazione e capitale umano",
      description: "Intervento del Governatore Fabio Panetta",
      duration: "45 min"
    },
    {
      type: "infographic",
      date: "10 gennaio 2026",
      title: "L'economia italiana in cifre - 2025",
      description: "Dati e statistiche sull'andamento dell'economia italiana"
    },
    {
      type: "video",
      date: "20 dicembre 2025",
      title: "L'euro digitale: opportunità e sfide",
      description: "Approfondimento sul progetto dell'euro digitale",
      duration: "30 min"
    },
    {
      type: "podcast",
      date: "15 dicembre 2025",
      title: "Economia e Finanza - Episodio 12",
      description: "Approfondimenti su temi economici e finanziari",
      duration: "25 min"
    },
    {
      type: "infographic",
      date: "5 dicembre 2025",
      title: "Il sistema bancario italiano",
      description: "Struttura e caratteristiche del sistema bancario"
    },
    {
      type: "video",
      date: "1 dicembre 2025",
      title: "Cybersicurezza nel settore finanziario",
      description: "Le sfide della sicurezza informatica",
      duration: "20 min"
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'video':
        return (
          <svg className="w-12 h-12 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        );
      case 'infographic':
        return (
          <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'podcast':
        return (
          <svg className="w-12 h-12 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'video': return 'Video';
      case 'infographic': return 'Infografica';
      case 'podcast': return 'Podcast';
      default: return type;
    }
  };

  const getActionButton = (type) => {
    switch(type) {
      case 'video':
        return (
          <button className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>{t.watch}</span>
          </button>
        );
      case 'infographic':
        return (
          <button className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{t.download}</span>
          </button>
        );
      case 'podcast':
        return (
          <button className="flex items-center space-x-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>{t.listen}</span>
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg mb-12">{t.subtitle}</p>
        
        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex space-x-8">
            <button className="pb-4 border-b-4 border-blue-900 text-blue-900 font-semibold">
              Tutti
            </button>
            <button className="pb-4 text-gray-600 hover:text-blue-900 font-semibold">
              {t.videos}
            </button>
            <button className="pb-4 text-gray-600 hover:text-blue-900 font-semibold">
              {t.infographics}
            </button>
            <button className="pb-4 text-gray-600 hover:text-blue-900 font-semibold">
              {t.podcasts}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition">
            {t.filterType}
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
            {t.filterYear}
          </button>
        </div>

        {/* Multimedia Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {multimediaItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
              <div className="h-48">
                <img 
                  src={`/images/multimedia-${index + 1}.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded">
                    {getTypeLabel(item.type)}
                  </span>
                  {item.duration && (
                    <span className="text-sm text-gray-600">{item.duration}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                <h3 className="text-lg font-bold text-blue-900 mb-2 hover:underline cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                {getActionButton(item.type)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default MultimediaPage;