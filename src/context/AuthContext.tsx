"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { AuthContext, UserProfile } from "@/types";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "@/lib/auth";

const AuthStateContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else setUserProfile(null);

      setLoading(false);
    });

    return () => listener();
  }, []);

  console.log("current user: ", user);

  return (
    <AuthStateContext.Provider
      value={{
        user: user,
        userProfile: userProfile,
        isLoading: loading,
        isLogged: user ? true : false,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error("Auth context is undefined!");
  return context;
}
