// pages/IndicatorsPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndicatorsPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Indicatori e Statistiche",
      subtitle: "Dati economici e finanziari aggiornati",
      economicIndicators: "Indicatori Economici",
      financialIndicators: "Indicatori Finanziari",
      bankingData: "Dati Bancari",
      paymentSystems: "Sistemi di Pagamento",
      viewDetails: "Vedi dettagli",
      downloadData: "Scarica dati",
      lastUpdate: "Ultimo aggiornamento",
      frequency: "Frequenza",
      monthly: "Mensile",
      quarterly: "Trimestrale",
      annual: "Annuale"
    }
  };

  const t = translations[language];

  const indicators = [
    {
      category: "Indicatori Economici",
      items: [
        {
          title: "PIL e componenti",
          value: "+0.8%",
          trend: "up",
          lastUpdate: "15 gennaio 2026",
          frequency: "Trimestrale"
        },
        {
          title: "Inflazione (IPCA)",
          value: "2.1%",
          trend: "down",
          lastUpdate: "15 gennaio 2026",
          frequency: "Mensile"
        },
        {
          title: "Tasso di disoccupazione",
          value: "7.2%",
          trend: "down",
          lastUpdate: "15 gennaio 2026",
          frequency: "Mensile"
        }
      ]
    },
    {
      category: "Indicatori Finanziari",
      items: [
        {
          title: "Rendimento BTP 10 anni",
          value: "3.45%",
          trend: "up",
          lastUpdate: "24 gennaio 2026",
          frequency: "Giornaliero"
        },
        {
          title: "Spread BTP-Bund",
          value: "135 bps",
          trend: "down",
          lastUpdate: "24 gennaio 2026",
          frequency: "Giornaliero"
        },
        {
          title: "Indice FTSE MIB",
          value: "34,256",
          trend: "up",
          lastUpdate: "24 gennaio 2026",
          frequency: "Giornaliero"
        }
      ]
    },
    {
      category: "Dati Bancari",
      items: [
        {
          title: "Prestiti alle imprese",
          value: "€845 mld",
          trend: "up",
          lastUpdate: "15 gennaio 2026",
          frequency: "Mensile"
        },
        {
          title: "Prestiti alle famiglie",
          value: "€652 mld",
          trend: "up",
          lastUpdate: "15 gennaio 2026",
          frequency: "Mensile"
        },
        {
          title: "Depositi",
          value: "€1,823 mld",
          trend: "up",
          lastUpdate: "15 gennaio 2026",
          frequency: "Mensile"
        }
      ]
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{t.title}</h1>
        <p className="text-gray-600 text-lg mb-12">{t.subtitle}</p>
        
        {/* Indicators by Category */}
        <div className="space-y-12">
          {indicators.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-900 hover:shadow-lg transition">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      {getTrendIcon(item.trend)}
                    </div>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-900">{item.value}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t.lastUpdate}:</span>
                        <span className="text-gray-800 font-medium">{item.lastUpdate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{t.frequency}:</span>
                        <span className="text-gray-800 font-medium">{item.frequency}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 text-blue-900 border-2 border-blue-900 px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition text-sm font-semibold">
                        {t.viewDetails}
                      </button>
                      <button className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-900 hover:text-blue-900 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Grafici e Analisi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Andamento PIL</h3>
              <div className="bg-white h-64 rounded flex items-center justify-center">
                <span className="text-gray-500">[Grafico PIL]</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Inflazione</h3>
              <div className="bg-white h-64 rounded flex items-center justify-center">
                <span className="text-gray-500">[Grafico Inflazione]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer language={language} />
    </div>
  );
};

export default IndicatorsPage;