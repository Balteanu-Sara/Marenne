export type Book = {
  id: string;
  title: string;
  author?: string;
  cover: string;
  description?: string;
  publisher: string;
  publish_date: string;
  pages: number;
  isbn: number;
  subjects?: string[];
};

export type SearchResult = {
  author_name?: string[];
  cover_i: number;
  key: string;
  title: string;
};

export type SearchBooksResults = {
  numFound: number;
  start: number;
  docs: SearchResult[];
};
