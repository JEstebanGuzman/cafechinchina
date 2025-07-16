
import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';
import { DecodedUser, User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (correo: string, contrasena: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedUser = jwtDecode(token);
         // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
            setUser({ Id: decoded.id, Nombre: decoded.nombre, Correo: '' }); // Correo not in token, but can be added
        } else {
            localStorage.removeItem('token');
        }
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (correo: string, contrasena: string) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { Correo: correo, Contrasena: contrasena });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
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