import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, FileText, ArrowUpRight, LogOut } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState('accueil');

  // Mettre à jour l'item actif basé sur la route actuelle
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveItem('accueil');
    else if (path === '/conti') setActiveItem('conti');
    else if (path === '/bonifico') setActiveItem('bonifico');
    else if (path === '/gestione-documenti') setActiveItem('documenti');
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm('Vuoi davvero disconnetterti?')) {
      logout();
      navigate('/login');
    }
  };

  const navItems = [
    {
      id: 'accueil',
      label: 'Home',
      icon: Home,
      action: () => {
        setActiveItem('accueil');
        navigate('/dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'conti',
      label: 'Conti',
      icon: FileText,
      action: () => {
        setActiveItem('conti');
        navigate('/conti');
      }
    },
    {
      id: 'bonifico',
      label: 'Bonifico',
      icon: ArrowUpRight,
      action: () => {
        setActiveItem('bonifico');
        navigate('/bonifico');
      }
    },
    {
      id: 'documenti',
      label: 'Documenti',
      icon: FileText,
      action: () => {
        setActiveItem('documenti');
        navigate('/gestione-documenti');
      }
    },
    {
      id: 'deconnexion',
      label: 'Esci',
      icon: LogOut,
      action: handleLogout
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2 sm:py-3 px-1 sm:px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all min-w-[50px] sm:min-w-[64px] ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-[9px] sm:text-[10px] font-medium text-center leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;