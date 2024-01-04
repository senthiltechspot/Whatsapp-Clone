"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the type for authentication context
interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  TriggerCheckLogin: () => void;
}

// Create a context for managing authentication
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Define a provider to wrap the app and manage authentication state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const login = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  const TriggerCheckLogin = () => {
    setCheckLogin(!checkLogin);
  };

  useEffect(() => {
    const logged = sessionStorage.getItem("isLoggedIn") === "true";
    if (logged) {
      setIsLoggedIn(true);
    }
  }, [checkLogin]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, TriggerCheckLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
