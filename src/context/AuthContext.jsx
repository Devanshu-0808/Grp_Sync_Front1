import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials);
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Fetch dashboard failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, fetchDashboard }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
