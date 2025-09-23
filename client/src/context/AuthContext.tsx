// client/src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

// --- Types ---
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// --- Context setup ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore auth state from localStorage on load
  useEffect(() => {
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  // --- Methods ---
  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", { email, password });
    const { access_token, user } = response.data;

    setToken(access_token);
    setUser(user);

    localStorage.setItem("authToken", access_token);
    localStorage.setItem("authUser", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/register", { name, email, password });
    const { access_token, user } = response.data;

    setToken(access_token);
    setUser(user);

    localStorage.setItem("authToken", access_token);
    localStorage.setItem("authUser", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
