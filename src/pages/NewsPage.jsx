// pages/NewsPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Notizie",
      allNews: "Tutte le notizie",
      filterBy: "Filtra per",
      category: "Categoria",
      date: "Data",
      readMore: "Leggi di più"
    }
  };

  const t = translations[language];

  const newsItems = [
    {
      date: "23 gennaio 2026",
      title: "5 nuovi numeri di 'Questioni di economia e finanza' - 23 gennaio 2026",
      category: "Pubblicazioni"
    },
    {
      date: "19 gennaio 2026",
      title: "Il rischio cibernetico delle imprese non finanziarie",
      category: "Ricerca"
    },
    {
      date: "16 gennaio 2026",
      title: "Bollettino Economico n. 1 - 2026",
      category: "Pubblicazioni"
    },
    {
      date: "15 gennaio 2026",
      title: "Mercato finanziario, novembre-dicembre 2025",
      category: "Statistiche"
    },
    {
      date: "15 gennaio 2026",
      title: "Conti finanziari terzo trimestre 2025",
      category: "Statistiche"
    },
    {
      date: "15 gennaio 2026",
      title: "Finanza pubblica: fabbisogno e debito - novembre 2025",
      category: "Statistiche"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">{t.title}</h1>
        
        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4">
          <button className="px-6 py-2 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition">
            {t.filterBy}: {t.category}
          </button>
          <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
            {t.filterBy}: {t.date}
          </button>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Link to={`/news/${index}`} key={index} className="group">
              <div className="bg-gray-200 h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={`/images/news-${index + 1}.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-block text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded mb-2">
                {item.category}
              </span>
              <p className="text-sm text-gray-600 mb-2">{item.date}</p>
              <h3 className="text-blue-900 text-lg font-bold group-hover:underline mb-2">
                {item.title}
              </h3>
              <span className="text-blue-900 font-semibold hover:underline">
                {t.readMore} →
              </span>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default NewsPage;