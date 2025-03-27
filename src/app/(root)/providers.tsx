"use client";

import { UserInformation } from "@/types/user";
import { getUserClient } from "@/lib/auth/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: UserInformation | null;
  loading: boolean;
  error: Error | null;
  setUser: (user: UserInformation | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  error: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  initialUser: UserInformation | null;
}

export const AuthProvider = ({ children, initialUser }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInformation | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(!initialUser);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!initialUser) {
      const fetchUser = async () => {
        try {
          const userData = await getUserClient();
          setUser(userData);
          console.log("hello harimau malaya");
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [initialUser]);

  const contextValue = {
    user,
    loading,
    error,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
