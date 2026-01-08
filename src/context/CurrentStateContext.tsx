"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { CurrentStates } from "@/types";

const StateContext = createContext<CurrentStates | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  function toggleCart() {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setIsCartOpen((prev) => !prev);
  }

  function toggleMenu() {
    setIsCartOpen(false);
    setIsLoginOpen(false);
    setIsMenuOpen((prev) => !prev);
  }

  function toggleLogin() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsLoginOpen((prev) => !prev);
  }

  function close() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsLoginOpen(false);
  }

  return (
    <StateContext.Provider
      value={{
        isCartOpen,
        isMenuOpen,
        isLoginOpen,
        toggleCart,
        toggleMenu,
        toggleLogin,
        close,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (!context) throw new Error("Context is undefined");
  return context;
}
