export interface Book {
  id: string;
  title: string;
  author?: string;
  cover: number;
  description?: string;
  publisher: string;
  publish_date: string;
  pages: number;
  isbn: string;
  subjects?: string[];
}

export interface SearchResult {
  author_name?: string[];
  cover_i: number;
  key: string;
  title: string;
}

export interface SearchBooksResults {
  numFound: number;
  start: number;
  docs: SearchResult[];
}

export interface SearchBySubjectResult {
  authors: { key: string; name: string }[];
  cover_id: number;
  key: string;
  title: string;
}

export interface SearchBooksBySubjectResults {
  works: SearchBySubjectResult[];
}

export type CurrentStates = {
  products: Product[];
  addToCart: (product: SearchResult) => void;
  updateItem: (key: string, operation: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isFilterOpen: boolean;
  isSearchOpen: boolean;
  isLoginOpen: boolean;
  toggleCart: () => void;
  toggleMenu: () => void;
  toggleFilter: () => void;
  toggleSearch: () => void;
  toggleLogin: () => void;
  close: () => void;
};

export interface Product extends SearchResult {
  count: number;
}
