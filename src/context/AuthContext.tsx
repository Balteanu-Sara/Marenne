"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { AuthContext, UserProfile } from "@/types";
import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const AuthStateContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fireStoreListener: (() => void) | null = null;

    const listener = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const docRef = doc(db, "users", user.uid);

        fireStoreListener = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              console.log("Detected change in user's data: ", docSnap.data());
              setUserProfile(docSnap.data() as UserProfile);
            } else {
              setUserProfile(null);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Error at listenting to user profile: ", error);
            setUserProfile(null);
            setLoading(false);
          },
        );
      } else {
        setUserProfile(null);
        setLoading(false);

        if (fireStoreListener) {
          fireStoreListener();
          fireStoreListener = null;
        }
      }
    });

    return () => {
      listener();
      if (fireStoreListener) fireStoreListener();
    };
  }, []);

  console.log("current user: ", user);

  return (
    <AuthStateContext.Provider
      value={{
        user: user,
        userProfile: userProfile,
        isLoading: loading,
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
