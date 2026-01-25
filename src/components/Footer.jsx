// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin } from 'lucide-react';

const Footer = ({ language }) => {
  const translations = {
    it: {
      address: "via Nazionale 91",
      city: "00184 Roma",
      tel: "Tel",
      pec: "PEC",
      email: "E-mail",
      contacts: "Contatti",
      siteMap: "Mappa del sito",
      onlineServices: "Servizi online con accesso SPID",
      branches: "Filiali",
      workAtBank: "Lavorare in Banca d'Italia",
      globalRates: "Tassi effettivi globali medi (TEGM)",
      glossary: "Glossario",
      faq: "FAQ",
      legalInfo: "ALTRE INFORMAZIONI LEGALI",
      transparency: "Trasparenza",
      dataProtection: "Protezione dei dati",
      certificationService: "Servizio di certificazione delle chiavi pubbliche",
      notificationActs: "Atti di notifica",
      followUs: "SEGUICI SU",
      youtube: "YouTube",
      xBank: "X - Banca d'Italia",
      xPress: "X - Ufficio Stampa",
      linkedin: "Linkedin",
      rss: "RSS",
      emailAlert: "E-mail Alert",
      copyright: "© Banca d'Italia",
      vatNumber: "IVA 00950501007",
      fiscalCode: "Codice Fiscale 00997670583"
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-8">
            {/* Remplacez par votre logo blanc/clair pour le footer */}
            <img 
              src="/images/logo1.jpeg" 
              alt="Banca d'Italia" 
              className="h-20 w-auto"
            />
            {/* OU si vous utilisez import: */}
            {/* import { logoWhite } from '../assets/images'; */}
            {/* <img src={logoWhite} alt="Banca d'Italia" className="h-20 w-auto" /> */}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <p className="text-white text-lg mb-2">{t.address}</p>
          <p className="text-white text-lg mb-4">{t.city}</p>
          <p className="text-white text-lg mb-2">{t.tel} +39 06 47921</p>
          <p className="text-white text-lg mb-2">{t.pec} bancaditalia@pec.bancaditalia.it</p>
          <p className="text-white text-lg mb-4">{t.email} email@bancaditalia.it</p>
          <Link to="/contacts" className="text-white text-lg hover:underline">{t.contacts}</Link>
        </div>

        <div className="border-t border-blue-700 mb-8"></div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-3">
            <Link to="/sitemap" className="block text-white hover:underline">{t.siteMap}</Link>
            <Link to="/spid" className="block text-white hover:underline">{t.onlineServices}</Link>
            <Link to="/branches" className="block text-white hover:underline">{t.branches}</Link>
            <Link to="/careers" className="block text-white hover:underline">{t.workAtBank}</Link>
            <Link to="/tegm" className="block text-white hover:underline">{t.globalRates}</Link>
            <Link to="/glossary" className="block text-white hover:underline">{t.glossary}</Link>
            <Link to="/faq" className="block text-white hover:underline">{t.faq}</Link>
          </div>
        </div>

        <div className="border-t border-blue-700 mb-8"></div>

        {/* Legal Information */}
        <div className="mb-8">
          <h3 className="text-white font-bold text-lg mb-4">{t.legalInfo}</h3>
          <div className="space-y-3">
            <Link to="/transparency" className="block text-white hover:underline">{t.transparency}</Link>
            <Link to="/privacy" className="block text-white hover:underline">{t.dataProtection}</Link>
            <Link to="/certification" className="block text-white hover:underline">{t.certificationService}</Link>
            <Link to="/notifications" className="block text-white hover:underline">{t.notificationActs}</Link>
          </div>
        </div>

        <div className="border-t border-blue-700 mb-8"></div>

        {/* Social Media */}
        <div className="mb-12">
          <h3 className="text-white font-bold text-lg mb-4">{t.followUs}</h3>
          <div className="space-y-3">
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <Youtube className="w-5 h-5" />
              <span>{t.youtube}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <span className="text-xl">𝕏</span>
              <span>{t.xBank}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <span className="text-xl">𝕏</span>
              <span>{t.xPress}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <Linkedin className="w-5 h-5" />
              <span>{t.linkedin}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <span className="text-xl">RSS</span>
              <span>{t.rss}</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white hover:underline">
              <span className="text-xl">✉</span>
              <span>{t.emailAlert}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8"></div>

        {/* Copyright */}
        <div className="text-center text-white/90 text-sm">
          <p className="mb-2">
            {t.copyright} | {t.vatNumber} | {t.fiscalCode}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;