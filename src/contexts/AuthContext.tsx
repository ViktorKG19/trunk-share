import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, age: number, city: string) => boolean;
  logout: () => void;
  updateProfile: (data: { name: string; age: number; city: string; bio: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = 'trunkshare_users';
const SESSION_KEY = 'trunkshare_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  });

  const getUsers = (): StoredUser[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, age: number, city: string): boolean => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return false;
    const newUser: StoredUser = { id: crypto.randomUUID(), name, email, password, age, city, bio: '' };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    return true;
  };

  const updateProfile = (data: { name: string; age: number; city: string; bio: string }) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
