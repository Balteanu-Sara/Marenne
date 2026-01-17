"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { searchBooks, clearResultOverview } from "@/lib/openLibrary";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchResult } from "@/types";

export default function Search() {
  const { isSearchOpen, toggleSearch } = useStateContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "";
      setQuery("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 4) return;

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const booksJson = await searchBooks(query);
        const books = await clearResultOverview(booksJson);
        setResults(books.slice(0, 9));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleSearch} />
      )}
      <div
        className={`bg-green p-[15px] flex flex-col fixed left-[15px] w-[calc(100vw-30px)] top-[130px] h-[calc(100vh-200px)] transition duration-300 
        ${
          isSearchOpen
            ? "z-9 opacity-100 pointer-events-auto"
            : "-z-1 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="font-garamond text-black outline-none w-[100%] text-center"
          />
          <hr />
        </div>
        <div className="pt-[30px] overflow-y-auto overflow-x-hidden scrollbar-none">
          {loading && (
            <div className="font-courier uppercase text-sm">Loading...</div>
          )}
          {!loading && query && results && (
            <>
              <div className="font-courier uppercase text-sm">
                <p>Results</p>
                <div className="flex flex-wrap justify-center">
                  {results
                    .filter((result, index) => index < 9)
                    .map((result) => {
                      return (
                        <Link
                          href={`/books/${result.key.replace("/works/", "")}`}
                          key={result.key}
                          className="flex flex-col items-center m-3 w-[180px]"
                        >
                          <Image
                            src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
                            width={180}
                            height={275}
                            alt={`Cover book for ${result.title}`}
                            className="w-[180px] h-[275px]"
                          />
                          <div className="font-courier text-center">
                            <p className="text-clip">{result.title}</p>
                            <p>$20.50</p>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
              <div className="text-center pt-[20px]">
                <Link
                  href={`/search/${encodeURIComponent(query.toLowerCase())}`}
                  className="border-b-1"
                  onClick={toggleSearch}
                >
                  Show results for {query}
                </Link>
              </div>
            </>
          )}
          {!loading && query && query.length < 4 && (
            <div>Type in at least 4 characters!</div>
          )}
          {!loading && query.length > 4 && !results && (
            <div>No results found for &quot;{query}&quot;</div>
          )}
        </div>
      </div>
    </>
  );
}
