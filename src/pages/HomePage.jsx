// pages/HomePage.jsx - PAGE UNIQUE COMPLÈTE
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  const [language, setLanguage] = useState('it');

  const translations = {
    it: {
      mainTitle: "Investire nel futuro: giovani, innovazione e capitale umano. Intervento del Governatore Fabio Panetta",
      watchVideo: "Guarda il video",
      latestNews: "Ultime notizie",
      viewAll: "Vedi tutte",
      news1: "5 nuovi numeri di 'Questioni di economia e finanza' - 23 gennaio 2026",
      news2: "Il rischio cibernetico delle imprese non finanziarie",
      news3: "Bollettino Economico n. 1 - 2026",
      whatBankDoes: "Cosa fa la Banca d'Italia",
      bankDesc1: "La Banca d'Italia è la banca centrale della Repubblica italiana; è un istituto di diritto pubblico, regolato da norme nazionali ed europee.",
      bankDesc2: "È parte integrante dell'Eurosistema, composto dalle banche centrali nazionali dell'area dell'euro e dalla Banca centrale europea",
      learnMore: "Scopri di più",
      goToSite: "Vai al sito",
      digitalEuro: "Euro digitale",
      digitalEuroDesc: "Una moneta digitale emessa dalla Banca Centrale, disponibile per i pagamenti elettronici, nei negozi e tra persona e persona",
      cybersecurity: "Cybersicurezza",
      cybersecurityDesc: "La Banca d'Italia è impegnata a garantire la disponibilità dei servizi e ad assicurarne il corretto e sicuro funzionamento",
      sustainability: "Sostenibilità",
      sustainabilityDesc: "La Banca d'Italia da tempo è impegnata a valutare le implicazioni per il sistema economico e finanziario di tali rischi e a considerare gli obiettivi di sviluppo sostenibile nell'esercizio delle funzioni istituzionali"
    }
  };

  const t = translations[language];

  const newsItems = [
    {
      date: "23 gennaio 2026",
      title: "5 nuovi numeri di 'Questioni di economia e finanza' - 23 gennaio 2026",
      image: "/images/p2.jpeg"
    },
    {
      date: "19 gennaio 2026",
      title: "Il rischio cibernetico delle imprese non finanziarie",
      image: "/images/p3.jpeg"
    },
    {
      date: "16 gennaio 2026",
      title: "Bollettino Economico n. 1 - 2026",
      image: "/images/p4.jpeg"
    }
  ];

  const latestNewsList = [
    { date: "15 gennaio 2026", title: "Mercato finanziario, novembre-dicembre 2025" },
    { date: "15 gennaio 2026", title: "Conti finanziari terzo trimestre 2025" },
    { date: "15 gennaio 2026", title: "Finanza pubblica: fabbisogno e debito - novembre 2025" },
    { date: "15 gennaio 2026", title: "Seminario 'The Eurosystem's payment systems and market infrastructures: their role in Europe and in the global landscape'" },
    { date: "14 gennaio 2026", title: "Statistiche sul turismo internazionale dell'Italia - ottobre 2025" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section - Intervento del Governatore */}
      <section className="relative h-600px bg-black">
        <div className="absolute inset-0">
          <img 
            src="/images/p5.jpeg" 
            alt="Governatore Fabio Panetta" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-white/90 text-sm mb-4">15 gennaio 2026</p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 max-w-4xl leading-tight">
              {t.mainTitle}
            </h1>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition flex items-center space-x-3 font-semibold">
              <span>▶</span>
              <span>{t.watchVideo}</span>
            </button>
          </div>
        </div>
      </section>

      {/* News Cards - 3 actualités principales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gray-200 h-56 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.date}</p>
              <h3 className="text-blue-900 text-lg font-bold group-hover:underline">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News List - Liste complète */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900">{t.latestNews}</h2>
            <button className="text-blue-900 font-semibold hover:underline">
              {t.viewAll} →
            </button>
          </div>
          <div className="space-y-6">
            {latestNewsList.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
                <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                <h3 className="text-blue-900 text-lg font-semibold hover:underline">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Bank Does Section avec image de fond */}
      <section className="relative h-[500px] bg-blue-900">
        <div className="absolute inset-0">
          <img 
            src="/images/palazzo-koch.jpg" 
            alt="Palazzo Koch" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-blue-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.whatBankDoes}</h2>
            <p className="text-white/95 text-lg lg:text-xl mb-4 max-w-3xl leading-relaxed">{t.bankDesc1}</p>
            <p className="text-white/95 text-lg lg:text-xl mb-8 max-w-3xl leading-relaxed">{t.bankDesc2}</p>
            
            <div className="flex gap-4">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
                {t.learnMore}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Topics - 3 cartes thématiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Euro digitale */}
            <div className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/p6.jpeg"
                  alt="Euro digitale"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-purple-600 to-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.digitalEuro}</h3>
                <p className="mb-6 leading-relaxed">{t.digitalEuroDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition font-semibold">
                  {t.learnMore}
                </button>
              </div>
            </div>

            {/* Cybersicurezza */}
            <div className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/p7.jpeg"
                  alt="Cybersicurezza"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-blue-700 to-blue-500 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.cybersecurity}</h3>
                <p className="mb-6 leading-relaxed">{t.cybersecurityDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition font-semibold">
                  {t.learnMore}
                </button>
              </div>
            </div>

            {/* Sostenibilità */}
            <div className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/images/p8.jpeg"
                  alt="Sostenibilità"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-green-700 to-green-500 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.sustainability}</h3>
                <p className="mb-6 leading-relaxed">{t.sustainabilityDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-green-700 transition font-semibold">
                  {t.learnMore}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
};

export default HomePage;