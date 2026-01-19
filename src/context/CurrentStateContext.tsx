"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { CurrentStates, SearchResult, Product } from "@/types";

const StateContext = createContext<CurrentStates | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  function addToCart(product: SearchResult) {
    if (product.key in products)
      setProducts(
        products.map((prod) => {
          if (prod.key === product.key) {
            return { ...prod, count: prod.count + 1 };
          } else return prod;
        }),
      );
    else {
      const newProduct: Product = { ...product, count: 1 };
      setProducts((prev) => [...prev, newProduct]);
    }
  }

  function removeFromCart(key: string) {
    setProducts(
      products
        .map((prod) => {
          if (prod.key === key) return { ...prod, count: prod.count - 1 };
          else return prod;
        })
        .filter((prod) => prod.count !== 0),
    );
  }

  function clearCart() {
    setProducts([]);
  }

  function toggleCart() {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsCartOpen((prev) => !prev);
  }

  function toggleMenu() {
    setIsCartOpen(false);
    setIsFilterOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
    setIsMenuOpen((prev) => !prev);
  }

  function toggleFilter() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
    setIsFilterOpen((prev) => !prev);
  }

  function toggleSearch() {
    setIsCartOpen(false);
    setIsLoginOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen((prev) => !prev);
  }

  function toggleLogin() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsLoginOpen((prev) => !prev);
  }

  function close() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
  }

  return (
    <StateContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        isMenuOpen,
        isFilterOpen,
        isSearchOpen,
        isLoginOpen,
        toggleCart,
        toggleMenu,
        toggleFilter,
        toggleSearch,
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
