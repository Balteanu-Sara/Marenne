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

export type CurrentStates = {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isLoginOpen: boolean;
  toggleCart: () => void;
  toggleMenu: () => void;
  toggleSearch: () => void;
  toggleLogin: () => void;
  close: () => void;
};
