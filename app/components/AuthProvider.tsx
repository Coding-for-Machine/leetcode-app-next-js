// AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { encryptData, decryptData } from "@/lib/security"; // Importing encryption functions
import User from "@/types/user";

// 🔐 Auth configuration constants
const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User, redirectUrl?: string) => void;
  logout: () => void;
  loginRequiredRedirect: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  setUserData: (userData: User) => Promise<void>;
  getUserData: () => Promise<User | null>;
  deleteUserData: () => void;
}

// 💡 Create context (default value undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔧 Provider props type
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

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAuthData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthData) {
      try {
        const parsedData = JSON.parse(storedAuthData);
        setAuthState({
          isAuthenticated: true,
          user: parsedData.user,
        });
      } catch (error) {
        console.error("Failed to parse auth data from localStorage", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const login = (userData: User, redirectUrl?: string) => {
    const authData = {
      isAuthenticated: true,
      user: userData,
    };
    
    setAuthState(authData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));

    const nextUrl = redirectUrl || searchParams.get("next");
    const invalidNextUrls = ["/login", "/logout"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrls.includes(nextUrl);

    if (nextUrlValid) {
      router.replace(nextUrl);
    } else {
      router.replace(LOGIN_REDIRECT_URL);
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${window.location.pathname}`;
    if (window.location.pathname === LOGIN_REQUIRED_URL) {
      loginWithNextUrl = LOGIN_REQUIRED_URL;
    }
    router.replace(loginWithNextUrl);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (!authState.user) return;

    const newUser = {
      ...authState.user,
      ...updatedUser,
    };

    setAuthState({
      isAuthenticated: true,
      user: newUser,
    });

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        isAuthenticated: true,
        user: newUser,
      })
    );
  };

  const setUserData = async (userData: User): Promise<void> => {
    try {
      const encrypted = await encryptData(userData);
      localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
      return
    } catch (error) {
      console.error("Failed to encrypt user data:", error);
      throw new Error("User data encryption failed");
    }
  };

  const getUserData = async (): Promise<User | null> => {
    try {
      const encrypted = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!encrypted) return null;

      const decrypted = await decryptData(encrypted);
      return decrypted as User;
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
      return null;
    }
  };

  const deleteUserData = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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

// 🪝 Hook: useAuth
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
