// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false); // ✅ Toujours libérer le loading
    }
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, _timestamp: Date.now() });
      }
    };
    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  const login = async (username, password) => {
    const userData = await UserService.authenticate(username, password);
    const token = btoa(JSON.stringify({ userId: userData.id, timestamp: Date.now() }));
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (userData) => {
    const newUser = await UserService.createUser(userData);
    const token = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', token);
    return { success: true, user: newUser };
  };

  const updateUser = (updatedUserData) => {
    setUser({ ...updatedUserData, _timestamp: Date.now() });
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    return { success: true, user: updatedUserData };
  };

  // ✅ Pendant le loading, on ne rend rien — évite la déconnexion au refresh
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Caricamento...</p>
        </div>
      </div>
    );
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};