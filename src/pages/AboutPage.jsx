// pages/AboutPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const [language, setLanguage] = useState('it');
  
  const translations = {
    it: {
      title: "Cosa fa la Banca d'Italia",
      intro: "La Banca d'Italia è la banca centrale della Repubblica italiana; è un istituto di diritto pubblico, regolato da norme nazionali ed europee.",
      eurosystem: "È parte integrante dell'Eurosistema, composto dalle banche centrali nazionali dell'area dell'euro e dalla Banca centrale europea",
      ourMission: "La nostra missione",
      mission1: "Mantenere la stabilità dei prezzi",
      mission1Desc: "Attraverso la definizione della politica monetaria nell'ambito dell'Eurosistema",
      mission2: "Garantire la stabilità finanziaria",
      mission2Desc: "Vigilando sulle banche e sugli intermediari finanziari",
      mission3: "Gestire i servizi di pagamento",
      mission3Desc: "Assicurando l'efficienza e la sicurezza dei sistemi di pagamento",
      mission4: "Emettere banconote in euro",
      mission4Desc: "Come parte della funzione di emissione dell'Eurosistema",
      history: "Storia",
      historyText: "La Banca d'Italia è stata costituita nel 1893 con sede a Firenze e successivamente trasferita a Roma nel 1895. Nel corso della sua lunga storia, ha attraversato momenti cruciali dell'economia italiana, svolgendo un ruolo centrale nello sviluppo economico del Paese.",
      governance: "Governance",
      governanceText: "La Banca è governata da organi collegiali e da organi monocratici. Il Direttorio, composto dal Governatore e da altri membri, delibera sulle questioni di maggiore rilevanza.",
      organization: "Organizzazione",
      organizationText: "La Banca d'Italia è organizzata in dipartimenti e servizi, ciascuno con specifiche competenze. Ha una rete di filiali sul territorio nazionale.",
      independence: "Indipendenza",
      independenceText: "L'indipendenza della Banca è sancita dai Trattati europei ed è funzionale all'efficace perseguimento degli obiettivi istituzionali, in particolare il mantenimento della stabilità dei prezzi.",
      transparency: "Trasparenza",
      transparencyText: "La Banca pubblica regolarmente informazioni sulla propria attività, sui risultati conseguiti e sull'utilizzo delle risorse, nel rispetto dei principi di trasparenza e accountability.",
      digitalEuro: "Euro digitale",
      digitalEuroDesc: "Una moneta digitale emessa dalla Banca Centrale, disponibile per i pagamenti elettronici, nei negozi e tra persona e persona",
      learnMore: "Scopri di più",
      cybersecurity: "Cybersicurezza",
      cybersecurityDesc: "La Banca d'Italia è impegnata a garantire la disponibilità dei servizi e ad assicurarne il corretto e sicuro funzionamento",
      sustainability: "Sostenibilità",
      sustainabilityDesc: "La Banca d'Italia da tempo è impegnata a valutare le implicazioni per il sistema economico e finanziario di tali rischi e a considerare gli obiettivi di sviluppo sostenibile nell'esercizio delle funzioni istituzionali"
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section className="relative bg-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">{t.title}</h1>
          <p className="text-white/90 text-xl mb-4 max-w-4xl">{t.intro}</p>
          <p className="text-white/90 text-xl max-w-4xl">{t.eurosystem}</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">{t.ourMission}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t.mission1}</h3>
              <p className="text-gray-700">{t.mission1Desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t.mission2}</h3>
              <p className="text-gray-700">{t.mission2Desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t.mission3}</h3>
              <p className="text-gray-700">{t.mission3Desc}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{t.mission4}</h3>
              <p className="text-gray-700">{t.mission4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History & Governance */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">{t.history}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{t.historyText}</p>
              <button className="text-blue-900 font-semibold hover:underline">
                {t.learnMore} →
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">{t.governance}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{t.governanceText}</p>
              <button className="text-blue-900 font-semibold hover:underline">
                {t.learnMore} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Topics Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Digital Euro Card */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="h-64">
                <img 
                  src="/images/euro-digitale.jpg"
                  alt="Euro digitale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-blue-700 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.digitalEuro}</h3>
                <p className="mb-6">{t.digitalEuroDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition">
                  {t.learnMore}
                </button>
              </div>
            </div>

            {/* Cybersecurity Card */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="h-64">
                <img 
                  src="/images/cybersicurezza.jpg"
                  alt="Cybersicurezza"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.cybersecurity}</h3>
                <p className="mb-6">{t.cybersecurityDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">
                  {t.learnMore}
                </button>
              </div>
            </div>

            {/* Sustainability Card */}
            <div className="relative overflow-hidden rounded-lg">
              <div className="h-64">
                <img 
                  src="/images/sostenibilita.jpg"
                  alt="Sostenibilità"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-green-700 text-white p-8">
                <h3 className="text-2xl font-bold mb-4">{t.sustainability}</h3>
                <p className="mb-6">{t.sustainabilityDesc}</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-green-700 transition">
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

export default AboutPage;