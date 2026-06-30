import { createContext, useState, useEffect, useContext } from 'react';
import { login as loginApi, register as registerApi, getProfile } from '../api/authApi';
import axiosInstance from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch profile", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    const { token: newToken, ...userData } = data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    return data;
  };

  const register = async (userDataToSubmit) => {
    const data = await registerApi(userDataToSubmit);
    const { token: newToken, ...userData } = data;
    
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
