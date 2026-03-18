// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AgendaPage from './pages/AgendaPage';
import PressReleasesPage from './pages/PressReleasesPage';
import InterviewsPage from './pages/InterviewsPage';
import MultimediaPage from './pages/MultimediaPage';
import IndicatorsPage from './pages/IndicatorsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './components/LoginPage';
import RegistrazionePage from './components/RegistrazionePage';
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

// ✅ PrivateRoute DOIT être dans un composant séparé appelé APRÈS AuthProvider
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

// ✅ Toutes les routes dans un composant enfant d'AuthProvider
const AppRoutes = () => {
  return (
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

      {/* Routes protégées */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/bonifico" element={<PrivateRoute><VirementPage /></PrivateRoute>} />
      <Route path="/prelievo" element={<PrivateRoute><RetraitPage /></PrivateRoute>} />
      <Route path="/carte" element={<PrivateRoute><CartesPage /></PrivateRoute>} />
      <Route path="/rib" element={<PrivateRoute><RibPage /></PrivateRoute>} />
      <Route path="/aiuto" element={<PrivateRoute><AidePage /></PrivateRoute>} />
      <Route path="/conti" element={<PrivateRoute><ComptesPage /></PrivateRoute>} />
      <Route path="/gestione-documenti" element={<PrivateRoute><GestionDocumentsPage /></PrivateRoute>} />
      <Route path="/transazioni" element={<PrivateRoute><StoricoTransazioniPage /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;