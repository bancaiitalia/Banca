// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages principales
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AgendaPage from './pages/AgendaPage';
import PressReleasesPage from './pages/PressReleasesPage';
import InterviewsPage from './pages/InterviewsPage';
import MultimediaPage from './pages/MultimediaPage';
import IndicatorsPage from './pages/IndicatorsPage';
import AboutPage from './pages/AboutPage';

// Pages d'authentification
import LoginPage from './components/LoginPage';
import RegistrazionePage from './components/RegistrazionePage';

// Pages de l'application bancaire (en italien)
import DashboardPage from './components/DashboardPage';
import VirementPage from './components/VirementPage';
import RetraitPage from './components/RetraitPage';
import CartesPage from './components/CartesPage';
import AidePage from './components/AidePage';
import ComptesPage from './components/ComptesPage';
import GestionDocumentsPage from './components/GestionDocumentsPage';
import StoricoTransazioniPage from './components/StoricoTransazioniPage';
import NotificationsPage from './components/NotificationsPage';
import RibPage from './components/RibPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/press" element={<PressReleasesPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/multimedia" element={<MultimediaPage />} />
          <Route path="/indicators" element={<IndicatorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrazione" element={<RegistrazionePage />} />
          
          {/* Routes protégées - Application bancaire */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bonifico" element={<VirementPage />} />
          <Route path="/prelievo" element={<RetraitPage />} />
          <Route path="/carte" element={<CartesPage />} />
          <Route path="/rib" element={<RibPage />} />
          <Route path="/aiuto" element={<AidePage />} />
          <Route path="/conti" element={<ComptesPage />} />
          <Route path="/gestione-documenti" element={<GestionDocumentsPage />} />
          <Route path="/transazioni" element={<StoricoTransazioniPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;