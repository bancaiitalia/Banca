// src/components/DashboardHeader.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, X, LogOut, User, CreditCard, FileText, HelpCircle, Download, Shield, Home } from 'lucide-react';

const DashboardHeader = ({ notificationCount = 0 }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Vuoi davvero disconnetterti?')) {
      console.log('🚪 Disconnessione dal Dashboard');
      logout();
      navigate('/');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10  flex items-center justify-center">
                <img src="images/logo2.jpeg" alt="" />
             
            </div>
            <div>
              <div className="text-sm font-bold text-blue-800">Banca</div>
              <div className="text-sm text-blue-800 font-bold">D'italia</div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-2"
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {notificationCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2"
            >
              {showMenu ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Sidebar */}
      {showMenu && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40" 
            onClick={() => setShowMenu(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform animate-slide-in">
            <div className="flex flex-col h-full">
              {/* En-tête du menu */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button onClick={() => setShowMenu(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-base truncate">
                      {user?.name || `${user?.firstName} ${user?.lastName}`}
                    </p>
                    <p className="text-xs opacity-90">N° {user?.clientNumber}</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {/* Dashboard */}
                  <button 
                    onClick={() => { 
                      navigate('/dashboard'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Home className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Dashboard</span>
                  </button>

                  {/* Profilo */}
                  <button 
                    onClick={() => { 
                      navigate('/compte'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Il mio profilo</span>
                  </button>

                  {/* I miei conti */}
                  <button 
                    onClick={() => { 
                      navigate('/conti'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">I miei conti</span>
                  </button>

                  {/* Transazioni */}
                  <button 
                    onClick={() => { 
                      navigate('/transazioni'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Transazioni</span>
                  </button>

                  {/* Le mie carte */}
                  <button 
                    onClick={() => { 
                      navigate('/carte'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Le mie carte</span>
                  </button>

                  {/* Documenti */}
                  <button 
                    onClick={() => { 
                      navigate('/gestione-documenti'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Documenti</span>
                  </button>

                  <div className="border-t border-gray-200 my-3"></div>

                  {/* Cambia PIN */}
                  <button 
                    onClick={() => { 
                      navigate('/cambia-codice'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Cambia PIN</span>
                  </button>

                  {/* Aiuto */}
                  <button 
                    onClick={() => { 
                      navigate('/aiuto'); 
                      setShowMenu(false); 
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition"
                  >
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">Aiuto & Supporto</span>
                  </button>
                </div>
              </div>

              {/* Déconnexion */}
              <div className="p-3 border-t border-gray-200">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Disconnetti</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardHeader;