"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { CurrentStates, SearchResult, Product } from "@/types";

const StateContext = createContext<CurrentStates | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    console.log("Products: ", products);
  }, [products]);

  function addToCart(product: SearchResult) {
    const existingProduct = products.find((prod) => prod.key === product.key);

    if (existingProduct)
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

  function updateItem(key: string, operation: number) {
    setProducts(
      products.map((prod) => {
        if (prod.key === key) {
          if (operation > 0) return { ...prod, count: prod.count + 1 };
          else return { ...prod, count: prod.count - 1 };
        } else return prod;
      }),
    );
  }

  function removeFromCart(key: string) {
    setProducts(products.filter((prod) => prod.key !== key));
  }

  function clearCart() {
    setProducts([]);
  }

  function toggleCart() {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
    setIsCartOpen((prev) => !prev);
  }

  function toggleMenu() {
    setIsCartOpen(false);
    setIsFilterOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
    setIsMenuOpen((prev) => !prev);
  }

  function toggleFilter() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
    setIsFilterOpen((prev) => !prev);
  }

  function toggleSearch() {
    setIsCartOpen(false);
    setIsLoginOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
    setIsSearchOpen((prev) => !prev);
  }

  function toggleLogin() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
    setIsLoginOpen((prev) => !prev);
  }

  function toggleProfile() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsLoginOpen(false);
    setIsWishlistOpen(false);
    setIsProfileOpen((prev) => !prev);
  }

  function toggleWishlist() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsSearchOpen(false);
    setIsLoginOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen((prev) => !prev);
  }

  function close() {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    setIsFilterOpen(false);
    setIsLoginOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsWishlistOpen(false);
  }

  return (
    <StateContext.Provider
      value={{
        products,
        addToCart,
        updateItem,
        removeFromCart,
        clearCart,
        isCartOpen,
        isMenuOpen,
        isFilterOpen,
        isSearchOpen,
        isLoginOpen,
        isProfileOpen,
        isWishlistOpen,
        toggleCart,
        toggleMenu,
        toggleFilter,
        toggleSearch,
        toggleLogin,
        toggleProfile,
        toggleWishlist,
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
