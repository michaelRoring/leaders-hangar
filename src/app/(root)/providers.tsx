// app/(root)/providers.tsx
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

// *** IMPORTANT: Add initialUser to this interface ***
interface AuthProviderProps {
  children: ReactNode;
  initialUser: UserInformation | null; // Add this line
}

export const AuthProvider = ({
  children,
  initialUser, // Destructure initialUser here
}: AuthProviderProps) => {
  // Initialize user state with initialUser
  const [user, setUser] = useState<UserInformation | null>(initialUser);
  const [loading, setLoading] = useState<boolean>(!initialUser); // Start loading only if no initialUser
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only fetch if initialUser is null (wasn't provided by SSR)
    if (!initialUser) {
      const fetchUser = async () => {
        try {
          const userData = await getUserClient();
          setUser(userData);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [initialUser]); // Add initialUser to the dependency array

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
