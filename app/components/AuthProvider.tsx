"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { encryptData, decryptData } from "@/lib/security";
import User from "@/types/user";

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, redirectUrl?: string) => Promise<void>;
  logout: () => void;
  loginRequiredRedirect: () => void;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
  setUserData: (userData: User) => Promise<void>;
  getUserData: () => Promise<User | null>;
  deleteUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // ⏳ Init from encrypted localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedEncrypted = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedEncrypted) return;

      try {
        const decrypted = await decryptData(storedEncrypted);
        if (decrypted && decrypted.user) {
          setAuthState({
            isAuthenticated: true,
            user: decrypted.user,
          });
        }
      } catch (err) {
        console.error("❌ Decryption failed on init:", err);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData: User, redirectUrl?: string) => {
    const authData = {
      isAuthenticated: true,
      user: userData,
    };

    try {
      const encrypted = await encryptData(authData);
      localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
      setAuthState(authData);
    } catch (err) {
      console.error("❌ Login encryption failed:", err);
      return;
    }
    
    const nextUrl = redirectUrl || searchParams.get("next");
    const invalidNextUrls = ["/login", "/logout"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrls.includes(nextUrl);

    router.replace(nextUrlValid ? nextUrl : LOGIN_REDIRECT_URL);
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const path = window.location.pathname;
    const next = path === LOGIN_REQUIRED_URL ? LOGIN_REQUIRED_URL : `${LOGIN_REQUIRED_URL}?next=${path}`;
    router.replace(next);
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!authState.user) return;

    const newUser = { ...authState.user, ...updatedUser };
    const authData = {
      isAuthenticated: true,
      user: newUser,
    };

    try {
      const encrypted = await encryptData(authData);
      localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
      setAuthState(authData);
    } catch (err) {
      console.error("❌ updateUser encryption failed:", err);
    }
  };

  const setUserData = async (userData: User): Promise<void> => {
    try {
      const encrypted = await encryptData({ isAuthenticated: true, user: userData });
      localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
      setAuthState({ isAuthenticated: true, user: userData });
    } catch (err) {
      console.error("❌ setUserData error:", err);
    }
  };

  const getUserData = async (): Promise<User | null> => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return null;

    try {
      const decrypted = await decryptData(stored);
      return decrypted.user || null;
    } catch (err) {
      console.error("❌ getUserData decrypt error:", err);
      return null;
    }
  };

  const deleteUserData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        loginRequiredRedirect,
        updateUser,
        setUserData,
        getUserData,
        deleteUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
