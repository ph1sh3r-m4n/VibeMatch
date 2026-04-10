import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  userId: string | null;
  login: (token: string, username: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

  const login = (t: string, u: string, id: string) => {
    localStorage.setItem('token', t);
    localStorage.setItem('username', u);
    localStorage.setItem('userId', id);
    setToken(t);
    setUsername(u);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setToken(null);
    setUsername(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
